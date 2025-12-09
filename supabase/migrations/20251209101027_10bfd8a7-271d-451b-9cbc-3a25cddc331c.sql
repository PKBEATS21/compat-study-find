-- Drop the overly permissive SELECT policies
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all preferences" ON public.preferences;

-- Create secure SELECT policies - users can only see their own data
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own preferences" 
ON public.preferences 
FOR SELECT 
USING (auth.uid() = user_id);

-- Add DELETE policy for profiles (was missing)
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add DELETE policy for preferences (was missing)
CREATE POLICY "Users can delete their own preferences" 
ON public.preferences 
FOR DELETE 
USING (auth.uid() = user_id);