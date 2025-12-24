# 🚀 RareMinds Task Manager

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

A powerful, real-time **Task Management Dashboard** built with the **MERN Stack**. Designed to help teams collaborate efficiently with role-based access, drag-and-drop organization, and a stunning "True Black" dark mode.

---

## 🛠️ Tech Stack & Libraries

This project uses modern technologies for optimal performance and user experience.

| **Category** | **Technologies Used** |
| :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socketdotio&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) |
| **Key Libraries** | `@hello-pangea/dnd` (Kanban), `lucide-react` (Icons), `react-hot-toast` (Notifications), `axios` (API), `jsonwebtoken` (Auth) |

---

## ✨ Features Implemented

### 🔹 Core & Enhanced Features
| Feature | Description | Status |
| :--- | :--- | :---: |
| **🔐 Secure Authentication** | [cite_start]JWT-based Signup/Login with session management. | ✅ |
| **👮 Role-Based Access (RBAC)** | **Managers** create/assign tasks; [cite_start]**Users** view/update status. | ✅ |
| **📊 Smart Dashboard** | [cite_start]Specific views for Tasks Assigned to Me vs. Tasks Created by Me. | ✅ |
| **📝 Task Management** | [cite_start]Full CRUD capabilities: Create, Edit, Delete, and Mark Completed. | ✅ |
| **🌑 OLED Dark Mode** | [cite_start]Global dark theme toggle for low-light environments. | ✅ |
| **🎨 Glassmorphism UI** | Modern, responsive UI with blur effects and smooth animations (Extra). | ✅ |
| **🔍 Search & Filter** | Instant client-side filtering by task title and priority (Extra). | ✅ |

### 🏆 Bonus Challenges (Optional Features)
| Challenge | Description | Status |
| :--- | :--- | :---: |
| **⚡ Real-Time Updates** | [cite_start]Instant task syncing across devices using **Socket.io**. | ✅ **Done** |
| **🖱️ Drag-and-Drop** | [cite_start]Kanban-style board to change task status (Pending → Completed). | ✅ **Done** |
| **📄 API Pagination** | [cite_start]Optimized performance for large task lists. | ✅ **Done** |

## 🛠️ Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment
Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Project
Development
```bash
npm run dev
```

Production
```bash
npm start
```

App runs on:
```
http://localhost:5000
```

---

## 🔐 Sample Login Credentials
Use these if authentication is implemented:
```
email: rareminds@gmail.com
password: rareminds
```

---

## 🌍 Deployment
If deployed, mention:
- Backend: Render
- Frontend: Netlify

<div align="center">

  ### Built with ❤️ by [Ashish Dubey](https://ashhdubey.netlify.app/)

  <p>
    <a href="https://ashhdubey.netlify.app/" target="_blank">
      <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white" alt="Portfolio" />
    </a>
    <a href="https://www.linkedin.com/in/ashhdubey/" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
    <a href="https://github.com/AshhDubey" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
    </a>
  </p>

</div>
