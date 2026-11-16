<div align="center">

# 🚀 Sehel Tech

### AI Programming Mentor for the Next Generation of Developers

A student-first learning platform with bilingual AI mentors (English & Roman Urdu), curated video courses, and a privacy-focused personal notebook.

[![Live Demo](https://img.shields.io/badge/Live_Demo-sehel--tech.lovable.app-00E5FF?style=for-the-badge&logo=vercel&logoColor=black)](https://sehel-tech.lovable.app)
![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-v1-000000?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)

[Live Site](https://sehel-tech.lovable.app) · [Preview](https://id-preview--d8c8470a-dc11-4edb-9ba2-ecd9da32cbd0.lovable.app) · [Report a Bug](https://github.com/sehelrana786/sehel-tech/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Privacy & Data Handling](#-privacy--data-handling)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 📖 Overview

Sehel Tech helps aspiring developers learn programming, data structures, algorithms, and computing fundamentals in the language they think in. Students can chat with an AI mentor in **English, Urdu, or Roman Urdu**, follow structured video courses, and keep their notes and study streaks in one place.

**Who it's for:** beginners and students, especially in regions where most programming resources are English-only.

---

## ✨ Features

### 🤖 AI Programming Mentor
- Dedicated tracks for **Python, C++, Java, HTML/CSS, Data Structures & Algorithms, and ICT / Office Suite**
- Natural conversation in **Roman Urdu, Urdu, and English**
- Clear explanations of loops, recursion, OOP, and memory pointers with real-world examples
- Practice challenges and instant bug-fixing help
- Streaming responses for a fast, chat-like experience

### 📺 Curated Video Lectures
- Hand-picked, structured video courses for each core track
- Ordered from absolute basics to advanced problem solving

### 📓 Student Notebook & Habit Tracker
- Personal notebook for notes, solved problems, and code snippets
- Daily streak counter and study-hours tracking to build consistent habits

### 🔒 PIN-Protected Local Profile
- Profile secured with a locally hashed (SHA-256) PIN
- No account or sign-up required

---

## 🔐 Privacy & Data Handling

| Data | Where it lives |
|---|---|
| Notes, study streaks, profile details, chat history | Your browser's `localStorage` only |
| PIN | Stored as a SHA-256 hash on your device |
| Mentor messages | Sent through a server-side endpoint (`/api/chat`) to the AI gateway to generate a reply |

Sehel Tech has no user accounts and no cloud database for student data. Avoid typing sensitive personal information into the mentor chat.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, TanStack Start v1 |
| Build tool | Vite 7 |
| Routing | TanStack Router (type-safe, file-based) |
| Styling | Tailwind CSS v4 with custom light/dark design tokens |
| AI | AI SDK with streaming via the Lovable AI Gateway |
| Persistence | Browser `localStorage` with SHA-256 PIN hashing |

---

## 📂 Project Structure

```text
sehel-tech/
├── src/
│   ├── components/        # Reusable UI components and navigation header
│   ├── lib/               # Local storage state, PIN hashing, utilities
│   ├── routes/            # File-based routes
│   │   ├── api/chat.ts    # Server-side streaming endpoint for the AI mentor
│   │   ├── index.tsx      # Homepage and curriculum overview
│   │   ├── mentor.tsx     # AI mentor chat interface
│   │   ├── notebook.tsx   # Notebook and daily streak tracker
│   │   ├── profile.tsx    # Local profile and PIN authentication
│   │   └── videos.tsx     # Video lecture library
│   ├── router.tsx         # Router configuration
│   └── styles.css         # Tailwind v4 theme tokens and typography
├── public/                # Static assets and favicon
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/sehelrana786/sehel-tech.git
cd sehel-tech

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at the local URL shown in your terminal.

### Environment Variables

Create a `.env` file in the project root if you are running the AI mentor locally:

```env
# Add your AI gateway key here (never commit this file)
AI_GATEWAY_API_KEY=your_key_here
```

> Check `src/routes/api/chat.ts` for the exact variable name your setup uses.

### Build for Production

```bash
npm run build
```

---

## 🗺 Roadmap

- [x] AI mentor with English and Roman Urdu support
- [x] Video lecture hub
- [x] Notebook with daily streak tracker
- [x] PIN-protected local profile
- [ ] More courses and practice challenges
- [ ] Export notes as PDF
- [ ] Progress analytics dashboard
- [ ] Mobile app / PWA support

---

## 👤 Author

**Mohammad Sehel** — Founder & Lead Developer, Sehel Tech

[![GitHub](https://img.shields.io/badge/GitHub-sehelrana786-181717?style=flat-square&logo=github)](https://github.com/sehelrana786)
[![Email](https://img.shields.io/badge/Email-sehelrana78600@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:sehelrana78600@gmail.com)

---

<div align="center">

If you find this project useful, please consider giving it a ⭐

</div>
