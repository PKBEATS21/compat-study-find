-- Drop the overly permissive SELECT policy on subjects
DROP POLICY IF EXISTS "Users can view all subjects" ON public.subjects;

-- Create secure SELECT policy - users can only see their own subjects
CREATE POLICY "Users can view their own subjects" 
ON public.subjects 
FOR SELECT 
USING (auth.uid() = user_id);