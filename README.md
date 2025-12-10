# 📚 StudyBuddy Match  
**Find your perfect study partner in minutes.**  
Live App: https://studddybuddymatch.de  

---

## 🚀 About the Project  
StudyBuddy Match helps students find compatible learning partners based on subjects, exam dates, learning style, and availability.

The goal:  
Enable students to *study smarter*, stay motivated, and learn more effectively by connecting them with people who truly match their needs.

---

## 🎯 Problem  
Studying alone is often inefficient and demotivating.  
Existing student platforms do NOT consider:

- different learning styles  
- varying schedules  
- subject compatibility  
- exam deadlines  
- learning preferences (online/in-person)

➡️ Students struggle to find the *right* learning partner — even though it boosts performance dramatically.

---

## 💡 Our Solution  
StudyBuddy Match analyzes each student’s:

✔ Subjects & exam dates  
✔ Learning style  
✔ Weekly availability  
✔ Online/in-person preference  
✔ City (for in-person studying)

Then it uses a secure, weighted matching algorithm to generate **highly compatible study partner suggestions**.

---

## 🔍 Matching Algorithm (Simplified)  
Our backend uses a secure **Supabase RPC function**:

Matches are ranked based on:

| Criterion | Weight |
|----------|---------|
| Shared subjects | 30 pts each |
| Availability overlap | 10 pts each |
| Same learning style | 20 pts |
| Same city (in-person) | 15 pts |

Security ensured by:  
- Full RLS (Row Level Security)  
- Profiles, preferences, subjects only readable by the owner  
- A secure `SECURITY DEFINER` RPC exposes only match results  

---

## 🧩 Features

### ✅ MVP Features  
- User registration & login  
- Onboarding (profile + learning preferences)  
- Manage subjects and exam dates  
- Full matching system with compatibility scores  
- Mobile-first responsive UI  
- Profile view  
- Footer with legal pages  
- Custom domain deployment  

### 📌 Additional Features  
- Support page with contact form  
- Clean, modern UI with Tailwind + shadcn components  
- Fully responsive mobile layout  

---

