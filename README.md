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
I used to track all my applications in Google Sheets, but it quickly got messy and didn’t feel personal. I wanted something cleaner—something built around the way *I* search for jobs.

This project allowed me to create a tool that I actually enjoy using while also gaining real experience with:

- Authentication  
- Cloud-hosted databases  
- Frontend architecture  
- Deployment workflows  

---

## 🕘 From Version 1 → Version 2  
This project originally started as a full Java Spring Boot + MySQL application. It worked, but required maintaining multiple services (API server, DB host, deployment platform, etc.).

After learning from that build, I rebuilt the app using **Supabase**, which lets me handle:

- Auth  
- Database  
- RLS policies  

…all in one place, without maintaining a backend server.

If you're curious, the archived Java version is still available:

📦 **Original Spring Boot Repo:**  
https://github.com/04hunterdunn/job-application-tracker-backend

---

## ✨ Features  
- Account creation and login  
- Add and track applications (company, role, notes, status)  
- Update job progress (Applied → Interviewing → Offer → Rejected)  
- Delete entries  
- Dashboard sorted from newest to oldest  
- Full per-user data isolation using RLS  

---

## 🛠️ Tech Stack

### **Frontend**
- React  
- Supabase JS client  
- Deployed on Vercel  
- Custom CSS for styling  

### **Backend**
- Supabase Postgres  
- Supabase Auth  
- Row Level Security policies  
- Auto-generated REST API  

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
Supabase **Row Level Security** ensures:

- Each user only sees their own applications  
- No cross-user data leaks  
- Policies enforce user_id = auth.uid()

---

## 📸 Screenshots  
**Login / Sign Up**  
<img width="1911" height="903" alt="Screenshot 2025-12-04 144320" src="https://github.com/user-attachments/assets/ba0ef3c1-eed6-4e80-8144-4e5eec785ced" />

**Dashboard**  
<img width="1900" height="892" alt="Screenshot 2025-12-04 144552" src="https://github.com/user-attachments/assets/407d133d-be61-4761-a3f0-6f285762898c" />

**Add Job Page**  
<img width="1885" height="891" alt="Screenshot 2025-12-04 144648" src="https://github.com/user-attachments/assets/bdfb25d4-ae71-4fa4-92b7-638d1d905dbf" />

---

## 🧭 Future Improvements
- Visualization/analytics  
- Job detail pages  
- Framer Motion animations
- Resume/Cover Letter Uploads

---

## 🧑‍💻 Author  
**Hunter Dunn**  
Computer Science & Data Science — University of St. Thomas  
GitHub: https://github.com/04hunterdunn
