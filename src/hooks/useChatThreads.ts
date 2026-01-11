import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ChatThread {
  id: string;
  user_id: string;
  title: string;
  last_message_at: string;
  message_count: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  thread_id: string | null;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export function useChatThreads() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [currentThread, setCurrentThread] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchThreads = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('chat_threads')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_archived', false)
      .order('updated_at', { ascending: false });

    if (data) {
      setThreads(data as ChatThread[]);
    }
    setLoading(false);
  }, []);

  const fetchMessages = useCallback(async (threadId: string) => {
    const { data } = await supabase
      .from('nova_chat_messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data as ChatMessage[]);
    }
  }, []);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  useEffect(() => {
    if (currentThread) {
      fetchMessages(currentThread.id);
    } else {
      setMessages([]);
    }
  }, [currentThread, fetchMessages]);

  const createThread = useCallback(async (title?: string): Promise<ChatThread | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('chat_threads')
      .insert({
        user_id: user.id,
        title: title || 'New Conversation'
      })
      .select()
      .single();

    if (data && !error) {
      const thread = data as ChatThread;
      setThreads(prev => [thread, ...prev]);
      setCurrentThread(thread);
      return thread;
    }
    return null;
  }, []);

  const updateThreadTitle = useCallback(async (threadId: string, title: string) => {
    const { error } = await supabase
      .from('chat_threads')
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', threadId);

    if (!error) {
      setThreads(prev => 
        prev.map(t => t.id === threadId ? { ...t, title } : t)
      );
      if (currentThread?.id === threadId) {
        setCurrentThread(prev => prev ? { ...prev, title } : null);
      }
    }
  }, [currentThread]);

  const archiveThread = useCallback(async (threadId: string) => {
    const { error } = await supabase
      .from('chat_threads')
      .update({ is_archived: true })
      .eq('id', threadId);

    if (!error) {
      setThreads(prev => prev.filter(t => t.id !== threadId));
      if (currentThread?.id === threadId) {
        setCurrentThread(null);
        setMessages([]);
      }
    }
  }, [currentThread]);

  const deleteThread = useCallback(async (threadId: string) => {
    // Delete all messages first
    await supabase
      .from('nova_chat_messages')
      .delete()
      .eq('thread_id', threadId);

    // Then delete thread
    const { error } = await supabase
      .from('chat_threads')
      .delete()
      .eq('id', threadId);

    if (!error) {
      setThreads(prev => prev.filter(t => t.id !== threadId));
      if (currentThread?.id === threadId) {
        setCurrentThread(null);
        setMessages([]);
      }
    }
  }, [currentThread]);

  const addMessage = useCallback(async (
    role: 'user' | 'assistant',
    content: string,
    threadId?: string
  ): Promise<ChatMessage | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const targetThreadId = threadId || currentThread?.id;

    const { data, error } = await supabase
      .from('nova_chat_messages')
      .insert({
        user_id: user.id,
        thread_id: targetThreadId,
        role,
        content
      })
      .select()
      .single();

    if (data && !error) {
      const message = data as ChatMessage;
      setMessages(prev => [...prev, message]);

      // Update thread's last_message_at and message_count
      if (targetThreadId) {
        await supabase
          .from('chat_threads')
          .update({ 
            last_message_at: new Date().toISOString(),
            message_count: (currentThread?.message_count || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', targetThreadId);
      }

      return message;
    }
    return null;
  }, [currentThread]);

  const selectThread = useCallback((thread: ChatThread | null) => {
    setCurrentThread(thread);
  }, []);

  return {
    threads,
    currentThread,
    messages,
    loading,
    createThread,
    updateThreadTitle,
    archiveThread,
    deleteThread,
    addMessage,
    selectThread,
    setMessages,
    refetch: fetchThreads,
  };
}
