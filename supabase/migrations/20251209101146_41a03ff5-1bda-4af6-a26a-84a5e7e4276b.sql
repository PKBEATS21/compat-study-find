-- Create a secure matching function that runs with elevated privileges
-- This allows users to find matches without exposing all profile/preference data
CREATE OR REPLACE FUNCTION public.find_study_matches(requesting_user_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  name text,
  university text,
  city text,
  study_program text,
  semester integer,
  contact_link text,
  learning_style text,
  availability jsonb,
  prefers_online boolean,
  prefers_in_person boolean,
  shared_subjects text[],
  match_score integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  my_profile RECORD;
  my_prefs RECORD;
  my_subjects text[];
  my_exam_dates jsonb;
BEGIN
  -- Get the requesting user's profile
  SELECT * INTO my_profile FROM profiles WHERE profiles.user_id = requesting_user_id;
  
  -- Get the requesting user's preferences
  SELECT * INTO my_prefs FROM preferences WHERE preferences.user_id = requesting_user_id;
  
  -- Get the requesting user's subjects as an array
  SELECT array_agg(lower(subject_name)) INTO my_subjects 
  FROM subjects WHERE subjects.user_id = requesting_user_id;
  
  -- Get exam dates for scoring
  SELECT jsonb_object_agg(lower(subject_name), exam_date) INTO my_exam_dates
  FROM subjects WHERE subjects.user_id = requesting_user_id AND exam_date IS NOT NULL;
  
  -- If user has no subjects, return empty
  IF my_subjects IS NULL OR array_length(my_subjects, 1) IS NULL THEN
    RETURN;
  END IF;
  
  RETURN QUERY
  WITH other_users AS (
    SELECT 
      p.id,
      p.user_id,
      p.name,
      p.university,
      p.city,
      p.study_program,
      p.semester,
      p.contact_link,
      pref.learning_style,
      pref.availability,
      pref.prefers_online,
      pref.prefers_in_person
    FROM profiles p
    JOIN preferences pref ON pref.user_id = p.user_id
    WHERE p.user_id != requesting_user_id
  ),
  other_subjects AS (
    SELECT 
      s.user_id,
      array_agg(s.subject_name) AS subject_names,
      array_agg(lower(s.subject_name)) AS subject_names_lower,
      jsonb_object_agg(lower(s.subject_name), s.exam_date) FILTER (WHERE s.exam_date IS NOT NULL) AS exam_dates
    FROM subjects s
    WHERE s.user_id != requesting_user_id
    GROUP BY s.user_id
  ),
  matched_users AS (
    SELECT 
      ou.id,
      ou.user_id,
      ou.name,
      ou.university,
      ou.city,
      ou.study_program,
      ou.semester,
      ou.contact_link,
      ou.learning_style,
      ou.availability,
      ou.prefers_online,
      ou.prefers_in_person,
      os.subject_names,
      os.subject_names_lower,
      os.exam_dates,
      -- Find shared subjects
      (SELECT array_agg(DISTINCT sn) 
       FROM unnest(os.subject_names) AS sn, unnest(os.subject_names_lower) AS snl
       WHERE snl = ANY(my_subjects) OR EXISTS (
         SELECT 1 FROM unnest(my_subjects) ms WHERE snl LIKE '%' || ms || '%' OR ms LIKE '%' || snl || '%'
       )
      ) AS shared_subs
    FROM other_users ou
    JOIN other_subjects os ON os.user_id = ou.user_id
    WHERE 
      -- Mode compatibility
      (
        (my_prefs.prefers_online AND ou.prefers_online) OR
        (my_prefs.prefers_in_person AND ou.prefers_in_person)
      )
      -- City check for in-person only matches
      AND (
        NOT (my_prefs.prefers_in_person AND ou.prefers_in_person AND NOT my_prefs.prefers_online)
        OR lower(my_profile.city) = lower(ou.city)
      )
      -- Availability overlap
      AND (
        SELECT COUNT(*) FROM jsonb_array_elements_text(ou.availability) a 
        WHERE a IN (SELECT jsonb_array_elements_text(my_prefs.availability))
      ) > 0
  )
  SELECT 
    mu.id,
    mu.user_id,
    mu.name,
    mu.university,
    mu.city,
    mu.study_program,
    mu.semester,
    mu.contact_link,
    mu.learning_style,
    mu.availability,
    mu.prefers_online,
    mu.prefers_in_person,
    mu.shared_subs AS shared_subjects,
    -- Calculate score
    (
      COALESCE(array_length(mu.shared_subs, 1), 0) * 30 +
      (SELECT COUNT(*) FROM jsonb_array_elements_text(mu.availability) a 
       WHERE a IN (SELECT jsonb_array_elements_text(my_prefs.availability)))::integer * 10 +
      CASE WHEN mu.learning_style = my_prefs.learning_style THEN 20 ELSE 0 END +
      CASE WHEN lower(mu.city) = lower(my_profile.city) THEN 15 ELSE 0 END
    )::integer AS match_score
  FROM matched_users mu
  WHERE mu.shared_subs IS NOT NULL AND array_length(mu.shared_subs, 1) > 0
  ORDER BY match_score DESC;
END;
$$;