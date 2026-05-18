# ☀️ Sunvision Skill Development Society 🎓

> **Empowering Rural Youth through Govt. Certified Free Skill Training & 100% Placement Support!** 🚀

---

## 🔗 Live Deployments

| Resource | URL | Status |
| :--- | :--- | :--- |
| **🌐 Live Frontend Portal** | [sunvision-skill-devlopment.vercel.app](https://sunvision-skill-devlopment.vercel.app/) | ![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-green?style=flat&logo=vercel) |
| **⚙️ Live Backend API** | [sunvision-backend.onrender.com](https://sunvision-backend.onrender.com) | ![Render Deployment](https://img.shields.io/badge/Render-Active-brightgreen?style=flat&logo=render) |
| **🗄️ Database** | MongoDB Atlas (AWS Mumbai) | ![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb) |

---

## 🛠️ Built With (Modern Tech Stack)

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Dynamic-purple?style=for-the-badge&logo=framer)

### Backend & Database
![Node.js](https://img.shields.io/badge/Node.js-v24-green?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-v4-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-ORM-red?style=for-the-badge&logo=mongoose)

---

## 🌟 Interactive Walkthrough & Core Features

<details>
<summary><b>📖 1. Dynamic Course Catalog & Learning Management</b> (Click to Expand)</summary>

*   **Diverse Course Categories:** In-depth computer, electronics, telecom, and financial accounting modules (e.g. AutoCAD, Tally ERP9, Full-Stack Web Development, and Hardware Networking).
*   **Knowledge-Check Quizzes:** Dynamic and interactive multiple-choice quiz engines inside every course page, with instantaneous grading and animations.
*   **Curriculum Syllabus:** Beautiful expandable accordion drawers listing each module's core curriculum details.
</details>

<details>
<summary><b>💼 2. Placement Partners Section</b> (Click to Expand)</summary>

*   **Typographic Marquee:** An infinite scrolling ticker highlighting premier placement companies (DMart, Airtel, MedPlus, Apollo Hospitals, Reliance, HDFC, ICICI).
*   **Dynamic Theme Matching:** The marquee uses high-precision typography that matches the original brand aesthetic of each partner corporate style!
</details>

<details>
<summary><b>🔒 3. Hardened Admin Dashboard & Content Management</b> (Click to Expand)</summary>

*   **Robust Management:** Easily add, edit, or delete courses, upload testimonials, toggle achievement pictures, update statistics, and tweak central website details from a protected dashboard.
*   **Modern Security:** Fully implemented JSON Web Tokens (JWT) inside HTTP-only cookies, password encryption, and emergency admin recovery endpoints.
*   **Flawless Responsive UX:** Auto-collapsing slide-out sidebars, responsive grid containers, and mobile header optimization.
</details>

---

## 🗄️ Database Architecture & Data Models

Our application links a lightweight **Node/Express** server directly to a scalable **MongoDB Atlas** cloud cluster. Below are the key data models utilized to drive content dynamically:

### 1. Course Schema (`models/Course.js`)
| Field Name | Data Type | Purpose |
| :--- | :--- | :--- |
| `title` | String | Name of the training program |
| `slug` | String (Unique) | URL parameter friendly identifier |
| `description`| String | Long format description of training parameters |
| `image` | String | Unsplash / Asset URL representing the course |
| `duration` | String | Typical duration (e.g., "3 Months") |
| `highlights` | Array [String] | Syllabus topics displayed in accordion layout |
| `outcomes` | Array [String] | Career benefits & skills achieved |
| `quiz` | Array [QuestionSchema]| Integrated knowledge assessment questions |

### 2. Partner Schema (`models/Partner.js`)
| Field Name | Data Type | Purpose |
| :--- | :--- | :--- |
| `name` | String | Name of the placement partner company |
| `image` | String | Logo image URL (with fallback to custom themed typography) |

### 3. Additional Schemas
*   **`Testimonial`**: Handles student feedback, names, ratings, and course categories.
*   **`Stat`**: Powers the animated visual counter block on the homepage (e.g. "5000+ Students Placed").
*   **`Setting`**: Centralized key-value configurations for the "About Us" and "Footer" texts.

---

## 📂 Project Directory Structure

```bash
Sunvision Skill Devlopment/
├── frontend/               # Next.js 15 Client Interface
│   ├── public/             # Static Assets (favicon, icons)
│   ├── src/
│   │   ├── app/            # App Router Pages (Courses, Admin, About)
│   │   ├── components/     # UI Core Elements (Navbar, CourseCard, Quiz)
│   │   ├── lib/            # Configurations & Axios Instances
│   │   └── styles/         # Global Layout CSS Variables
│   └── tsconfig.json       # TypeScript Configuration
│
└── backend/                # Node.js/Express REST API
    ├── models/             # Mongoose Database Schemas
    ├── routes/             # Authentication & Data CRUD Endpoints
    ├── seed/               # Default Database Seeding Scripts
    ├── .env                # MongoDB Cloud URI & Port (Protected)
    └── server.js           # Express Application Entry point


🛡️ License & Credit
Built with ❤️ by Jaswanth Ampabathuni to support the digital transformation of Sunvision Skill Development Society's administrative portals.

This project isGovt. Certified under DDU-GKY parameters. 🌟

***
This markdown is ready-made, styled perfectly, and fully complete with beautiful formatting, structured information tables, code snippets, directory trees, and interactive toggle menus. You can copy it directly and save it to your main GitHub README to show off your fantastic web application!
