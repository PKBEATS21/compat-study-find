// Demo data for presentation mode
// All data is read-only and stored client-side

export const demoProfile = {
  name: "Alex Demo",
  university: "TU Berlin",
  city: "Berlin",
  study_program: "Computer Science",
  semester: 4,
  contact_link: "https://linkedin.com/in/demo",
};

export const demoPreferences = {
  learning_style: "discussion",
  availability: ["Weekday Mornings", "Weekday Evenings", "Weekends"],
  prefers_online: true,
  prefers_in_person: true,
};

export const demoSubjects = [
  {
    id: "demo-1",
    subject_name: "Linear Algebra II",
    exam_date: "2025-02-15",
    difficulty: 4,
  },
  {
    id: "demo-2",
    subject_name: "Data Structures & Algorithms",
    exam_date: "2025-02-20",
    difficulty: 3,
  },
  {
    id: "demo-3",
    subject_name: "Database Systems",
    exam_date: "2025-03-01",
    difficulty: 2,
  },
  {
    id: "demo-4",
    subject_name: "Machine Learning Fundamentals",
    exam_date: "2025-03-10",
    difficulty: 5,
  },
];

export const demoMatches = [
  {
    id: "match-1",
    user_id: "user-1",
    name: "Marie Schmidt",
    university: "TU Berlin",
    city: "Berlin",
    study_program: "Data Science",
    semester: 3,
    contact_link: "https://linkedin.com/in/marie",
    learning_style: "discussion",
    availability: ["Weekday Evenings", "Weekends"],
    prefers_online: true,
    prefers_in_person: true,
    shared_subjects: ["Linear Algebra II", "Machine Learning Fundamentals"],
    match_score: 95,
  },
  {
    id: "match-2",
    user_id: "user-2",
    name: "Jonas Weber",
    university: "FU Berlin",
    city: "Berlin",
    study_program: "Computer Science",
    semester: 5,
    contact_link: "https://wa.me/491234567890",
    learning_style: "calm",
    availability: ["Weekday Mornings", "Weekday Evenings"],
    prefers_online: true,
    prefers_in_person: false,
    shared_subjects: ["Data Structures & Algorithms", "Database Systems"],
    match_score: 88,
  },
  {
    id: "match-3",
    user_id: "user-3",
    name: "Lena Hoffmann",
    university: "HU Berlin",
    city: "Berlin",
    study_program: "Mathematics",
    semester: 4,
    contact_link: null,
    learning_style: "intense",
    availability: ["Weekends"],
    prefers_online: false,
    prefers_in_person: true,
    shared_subjects: ["Linear Algebra II"],
    match_score: 72,
  },
];
