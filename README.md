# 📌 Job Application Tracker  
![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase&logoColor=white)
![Java Spring Boot](https://img.shields.io/badge/Original_Backend-Spring_Boot-6DB33F?logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-005C84?logo=mysql)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Original_Deploy-Render-46E3B7?logo=render)
![Railway](https://img.shields.io/badge/Original_DB-Railway-0B0D0E?logo=railway)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Stars](https://img.shields.io/github/stars/04hunterdunn/job-application-tracker-frontend?style=social)
A clean, modern job-tracking application built with **React**, **Supabase Auth**, and **Supabase Postgres**, deployed on **Vercel**.  
The app helps users organize and manage job applications in a simple, personalized dashboard.

👉 **Live App:**  
https://job-application-tracker-frontend-pi.vercel.app/login

---

## ⭐ Why I Built This  
I originally used Google Sheets to track my job applications, but it never felt personalized or structured enough.  
I wanted something cleaner—something built around the way *I* search for jobs.

At the same time, I wanted hands-on experience building and deploying a full-stack application.  
This project gave me both:

- A job tracker that I actually enjoy using  
- Real experience with frontend, backend, authentication, databases, and cloud deployment  

---

## 🕘 Project Evolution

### **🔵 Version 1 (Archived: Java Spring Boot + MySQL)**  
The first full version of this app was built using a traditional backend stack:

- **Backend:** Java Spring Boot (deployed on Render)  
- **Database:** MySQL on Railway  
- **Frontend:** React on Vercel  
- Full REST API (CRUD, status updates, authentication)  

That version is fully preserved here (archived for reference):  
📦 **Original Backend Repo:** https://github.com/04hunterdunn/job-application-tracker-backend

It was an important learning experience in API design, SQL schema structure, and multi-service cloud deployment.

---

### **🟢 Current Version (Supabase + React)**  
After learning from the original version, I rebuilt the app using a simpler, faster, serverless architecture:

- **Supabase Auth** for Sign Up / Login / Logout  
- **Supabase Postgres** for cloud-hosted data  
- **Row Level Security (RLS)** so every user only sees their own jobs  
- **React frontend** deployed on Vercel  
- No backend server to maintain  

This version is cleaner, more maintainable, and matches what I originally wanted:  
a personalized job tracker with a modern UI and secure, cloud-based storage.

---

## ✨ Features  
- Create an account and log in  
- Add job applications with company, role, notes, and status  
- Update job status (Applied → Interviewing → Offer → Rejected)  
- Delete entries  
- Dashboard automatically sorted by newest → oldest  
- Full per-user data isolation via Supabase RLS  

---

## 🛠️ Tech Stack (Current Version)

### **Frontend**
- React  
- Supabase JavaScript Client  
- Deployed on Vercel  
- Pure CSS for styling  

### **Backend**
- Supabase Postgres  
- Supabase Auth  
- Supabase Row Level Security  
- Auto-generated REST/RPC APIs (no custom server needed)  

---

## 📂 Application Structure
```
src/
├── Components/
├── pages/
├── supabaseClient.js
├── App.js
└── App.css
├── Index.js
└── Index.css
```
---

## 🔧 Environment Variables  
Create a `.env` file in the project root:
- REACT_APP_SUPABASE_URL=your_supabase_project_url
- REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
  
Restart the dev server after adding env variables.

---

## ▶️ **Running Locally**
- npm install
- npm start

Your app will open at:

http://localhost:3000

---

## 🔒 Security  
This project uses Supabase **Row Level Security** to ensure:

- Users only access their own jobs  
- No cross-user data leaks  
- Policies enforce user_id = auth.uid()

---

## 📸 Screenshots
-Login/SignUp: <img width="1911" height="903" alt="Screenshot 2025-12-04 144320" src="https://github.com/user-attachments/assets/ba0ef3c1-eed6-4e80-8144-4e5eec785ced" />

-Job Dashboard: <img width="1900" height="892" alt="Screenshot 2025-12-04 144552" src="https://github.com/user-attachments/assets/407d133d-be61-4761-a3f0-6f285762898c" />

-Add Job Page: <img width="1885" height="891" alt="Screenshot 2025-12-04 144648" src="https://github.com/user-attachments/assets/bdfb25d4-ae71-4fa4-92b7-638d1d905dbf" />

---

## 🧭 Future Improvements  
- Sorting & filtering options  
- Analytics/visual stats for job search progress  
- Job detail pages  
- Framer Motion animations  
- Notes history or timeline view

---

## 🧑‍💻 Author  
**Hunter Dunn**  
Computer Science & Data Science  
University of St. Thomas  
GitHub: https://github.com/04hunterdunn
