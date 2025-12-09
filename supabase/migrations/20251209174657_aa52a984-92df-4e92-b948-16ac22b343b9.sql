-- Allow users to delete their own chat messages (for clearing history)
CREATE POLICY "Users can delete their own chat messages"
ON public.nova_chat_messages
FOR DELETE
USING (auth.uid() = user_id);