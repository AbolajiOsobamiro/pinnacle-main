-- Add UPDATE policy for withdrawals table to ensure users can only modify their own records
CREATE POLICY "Users can update their own withdrawals" 
ON public.withdrawals 
FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);