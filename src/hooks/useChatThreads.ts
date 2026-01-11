import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ChatThread {
  id: string;
  user_id: string;
  title: string;
  last_message_at: string | null;
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
  const [archivedThreads, setArchivedThreads] = useState<ChatThread[]>([]);
  const [currentThread, setCurrentThread] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const userIdRef = useRef<string | null>(null);

  const fetchThreads = useCallback(async (includeArchived = false) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }
    userIdRef.current = user.id;

    // Fetch active threads
    const { data: activeData } = await supabase
      .from('chat_threads')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_archived', false)
      .order('updated_at', { ascending: false });

    if (activeData) {
      setThreads(activeData as ChatThread[]);
    }

    // Fetch archived threads if requested
    if (includeArchived) {
      const { data: archivedData } = await supabase
        .from('chat_threads')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_archived', true)
        .order('updated_at', { ascending: false });

      if (archivedData) {
        setArchivedThreads(archivedData as ChatThread[]);
      }
    }

    setLoading(false);
  }, []);

  const fetchMessages = useCallback(async (threadId: string) => {
    setMessagesLoading(true);
    const { data } = await supabase
      .from('nova_chat_messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data as ChatMessage[]);
    }
    setMessagesLoading(false);
  }, []);

  // Real-time subscription for threads
  useEffect(() => {
    fetchThreads();

    const threadsChannel = supabase
      .channel('chat-threads-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_threads',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newThread = payload.new as ChatThread;
            if (newThread.user_id === userIdRef.current) {
              if (newThread.is_archived) {
                setArchivedThreads(prev => [newThread, ...prev]);
              } else {
                setThreads(prev => [newThread, ...prev]);
              }
            }
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as ChatThread;
            if (updated.user_id === userIdRef.current) {
              if (updated.is_archived) {
                // Move from active to archived
                setThreads(prev => prev.filter(t => t.id !== updated.id));
                setArchivedThreads(prev => {
                  const exists = prev.some(t => t.id === updated.id);
                  if (exists) {
                    return prev.map(t => t.id === updated.id ? updated : t);
                  }
                  return [updated, ...prev];
                });
              } else {
                // Update in active threads
                setThreads(prev => {
                  const exists = prev.some(t => t.id === updated.id);
                  if (exists) {
                    return prev.map(t => t.id === updated.id ? updated : t)
                      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
                  }
                  // Might be unarchived, add to active
                  setArchivedThreads(p => p.filter(t => t.id !== updated.id));
                  return [updated, ...prev];
                });
              }
              // Update current thread if it's the one being updated
              setCurrentThread(prev => prev?.id === updated.id ? updated : prev);
            }
          } else if (payload.eventType === 'DELETE') {
            const deleted = payload.old as ChatThread;
            setThreads(prev => prev.filter(t => t.id !== deleted.id));
            setArchivedThreads(prev => prev.filter(t => t.id !== deleted.id));
            setCurrentThread(prev => prev?.id === deleted.id ? null : prev);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(threadsChannel);
    };
  }, [fetchThreads]);

  // Real-time subscription for messages in current thread
  useEffect(() => {
    if (!currentThread) {
      setMessages([]);
      return;
    }

    fetchMessages(currentThread.id);

    const messagesChannel = supabase
      .channel(`chat-messages-${currentThread.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'nova_chat_messages',
          filter: `thread_id=eq.${currentThread.id}`,
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(m => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'nova_chat_messages',
          filter: `thread_id=eq.${currentThread.id}`,
        },
        (payload) => {
          const deleted = payload.old as ChatMessage;
          setMessages(prev => prev.filter(m => m.id !== deleted.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
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
      // Real-time will add to threads, but we set current immediately
      setCurrentThread(thread);
      setMessages([]);
      return thread;
    }
    return null;
  }, []);

  const updateThreadTitle = useCallback(async (threadId: string, title: string) => {
    const { error } = await supabase
      .from('chat_threads')
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', threadId);

    if (error) {
      console.error('Failed to update thread title:', error);
    }
    // Real-time subscription handles state update
  }, []);

  const archiveThread = useCallback(async (threadId: string) => {
    const { error } = await supabase
      .from('chat_threads')
      .update({ is_archived: true, updated_at: new Date().toISOString() })
      .eq('id', threadId);

    if (!error && currentThread?.id === threadId) {
      setCurrentThread(null);
      setMessages([]);
    }
    // Real-time subscription handles state update
  }, [currentThread]);

  const unarchiveThread = useCallback(async (threadId: string) => {
    const { error } = await supabase
      .from('chat_threads')
      .update({ is_archived: false, updated_at: new Date().toISOString() })
      .eq('id', threadId);

    if (error) {
      console.error('Failed to unarchive thread:', error);
    }
    // Real-time subscription handles state update
  }, []);

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

    if (!error && currentThread?.id === threadId) {
      setCurrentThread(null);
      setMessages([]);
    }
    // Real-time subscription handles state update
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

      // Update thread's last_message_at and message_count
      if (targetThreadId) {
        const currentCount = threads.find(t => t.id === targetThreadId)?.message_count || 0;
        await supabase
          .from('chat_threads')
          .update({ 
            last_message_at: new Date().toISOString(),
            message_count: currentCount + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', targetThreadId);
      }

      return message;
    }
    return null;
  }, [currentThread, threads]);

  const clearThreadMessages = useCallback(async (threadId: string) => {
    await supabase
      .from('nova_chat_messages')
      .delete()
      .eq('thread_id', threadId);

    await supabase
      .from('chat_threads')
      .update({ 
        message_count: 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', threadId);

    if (currentThread?.id === threadId) {
      setMessages([]);
    }
  }, [currentThread]);

  const selectThread = useCallback((thread: ChatThread | null) => {
    setCurrentThread(thread);
  }, []);

  const fetchArchivedThreads = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('chat_threads')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_archived', true)
      .order('updated_at', { ascending: false });

    if (data) {
      setArchivedThreads(data as ChatThread[]);
    }
  }, []);

  return {
    threads,
    archivedThreads,
    currentThread,
    messages,
    loading,
    messagesLoading,
    createThread,
    updateThreadTitle,
    archiveThread,
    unarchiveThread,
    deleteThread,
    addMessage,
    clearThreadMessages,
    selectThread,
    setMessages,
    refetch: fetchThreads,
    fetchArchivedThreads,
  };
}
