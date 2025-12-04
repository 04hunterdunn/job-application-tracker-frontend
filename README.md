# 📌 Job Application Tracker  
A full-stack, SaaS-style job tracking app built with **React**, **Supabase Auth**, **Supabase Postgres**, and deployed on **Vercel**.

👉 **Live Demo:**  
https://job-application-tracker-frontend-pi.vercel.app/login

---

## 🚀 Overview  
This app helps users track their job applications in a clean, modern dashboard.  
Users can:

- Create an account & log in with **Supabase Auth**
- Add job applications with notes & status
- View all their applications in a clean dashboard
- Update status (Applied / Interviewing / Offer / Rejected)
- Delete applications
- Enjoy automatic **per-user data isolation** with Supabase RLS rules

This is a production-ready CRUD application with authentication, authorization, and a connected cloud database.

---

## ✨ Features

### 🔐 Authentication + Authorization  
- Full **Sign Up**, **Login**, **Logout**  
- Auth powered by **Supabase**  
- User metadata stores name for personalized experience  
- Supabase **Row Level Security (RLS)** ensures each user only sees their own jobs

### 🗃️ CRUD Over Cloud Database  
- Add jobs (company, position, status, notes)
- Update job status with one click  
- Delete jobs  
- Automatically sorted newest → oldest  
- Data stored in **Supabase Postgres**

### 🖥️ UI/UX  
- Modern, minimal dashboard  
- Floating “+” Add button  
- Clean Add Job form  
- User-friendly status badges  
- Responsive layout  
- Styled components in pure CSS (App.css)

### ☁️ Deployment  
- Frontend deployed on **Vercel**  
- Backend = **Supabase** (Auth + Database + RLS)

---

## 🛠️ Tech Stack

### **Frontend**
- React (Create React App)
- CSS Modules / App.css
- Supabase JavaScript Client
- Vercel

### **Backend**
- Supabase Postgres  
- Supabase Auth  
- Supabase Row Level Security  
- Supabase Policies

---

## 📂 Application Structure
```
src/
├── Components/
│ ├── JobList.js
│ ├── JobForm.js
│ ├── FloatingAddButton.js
│ └── Welcome.js
├── pages/
│ ├── JobsPage.jsx
│ ├── NewJobPage.jsx
│ ├── SignIn.jsx
│ └── SignUp.jsx
├── supabaseClient.js
├── App.js
└── App.css
├── Index.js
└── Index.css
```

---

### 🔧 Environment Variables  
Create a `.env` file in the project root:
- REACT_APP_SUPABASE_URL=your_supabase_project_url
- REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
  
Restart the dev server after adding env variables.

---

### ▶️ **Running Locally**
- npm install
- npm start

Your app will open at:

http://localhost:3000

---

## 🌐 **Deployment**

### **Frontend**
Deployed to Vercel:  
Automatic deploys on every commit to `main`.

### **Backend**
Supabase handles:
- Auth  
- Database  
- RLS  
- API endpoints  

No backend server required.

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

## 🧑‍💻 Author  
**Hunter Dunn**  
Computer Science & Data Science  
University of St. Thomas  
GitHub: https://github.com/04hunterdunn
