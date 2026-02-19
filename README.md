<!--
 ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ ██╗     ██╗   ██╗███╗   ███╗███████╗
 ████╗  ██║██╔═══██╗██║   ██║██╔══██╗██║     ██║   ██║████╗ ████║██╔════╝
 ██╔██╗ ██║██║   ██║██║   ██║███████║██║     ██║   ██║██╔████╔██║█████╗
 ██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║██║     ██║   ██║██║╚██╔╝██║██╔══╝
 ██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║███████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
-->

<div align="center">

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ✦  N O V A L U M E                                            ║
║      ════════════════════════════════════════                    ║
║      Your resume. Reimagined by AI.                             ║
║      Write less. Impress more. Get hired.                       ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

[![React](https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=node.js&logoColor=339933)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=mongodb&logoColor=47A248)](https://mongodb.com)
[![Gemini](https://img.shields.io/badge/Gemini_AI-000000?style=for-the-badge&logo=google&logoColor=4285F4)](https://aistudio.google.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-000000?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com)
![MIT](https://img.shields.io/badge/License_MIT-000000?style=for-the-badge)

**[What It Does](#-what-it-does) · [Features](#-features) · [Stack](#-stack) · [Spin It Up](#-spin-it-up) · [Env Vars](#-environment-variables) · [Roadmap](#-roadmap)**

</div>

---

## ❯ What It Does

Novalume is an **AI-powered Resume Builder** built on the MERN stack. Users create, edit, and share polished resumes — then hand them to Google Gemini AI for deep optimization: rewritten bullets, improved tone, role-specific language. A live preview link makes sharing instant.

```
╔══════════════════════════════════════════════════════════════════╗
║  User creates a resume                                          ║
║     → Real-time live preview updates as they type               ║
║     → Upload existing resume → Gemini AI optimizes it           ║
║     → Upload profile photo → background removed automatically   ║
║     → Pick a template → generate a shareable link               ║
║     → Anyone with the link sees a clean, live resume page       ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## ◈ Features

```
NOVALUME
│
├── 🔐  AUTH
│   ├── Secure sign up / sign in
│   ├── JWT-based session management
│   └── Protected user dashboard
│
├── 📝  RESUME MANAGEMENT
│   ├── Create from scratch
│   ├── Edit + delete resumes
│   └── Manage multiple resumes from one dashboard
│
├── ⚡  LIVE PREVIEW
│   ├── Real-time editor → preview sync
│   ├── Unique shareable resume link per resume
│   └── Anyone with the link can view instantly
│
├── 🤖  AI OPTIMIZATION  (Google Gemini)
│   ├── Upload existing PDF or text resume
│   ├── Rewrite + improve content automatically
│   ├── Grammar correction + tone enhancement
│   └── Role-specific optimization on demand
│
├── 🖼️  SMART IMAGE PROCESSING  (ImageKit)
│   ├── Upload profile photo
│   ├── AI background removal
│   └── Fast, secure delivery via ImageKit CDN
│
└── 🎨  TEMPLATES
    ├── Multiple professionally designed layouts
    ├── Tailwind CSS-powered elegant styles
    └── Switch templates without losing any data
```

---

## ◈ Stack

### System Map

```
              ╔══════════════════════════╗
              ║        Browser           ║
              ║   React.js + Tailwind    ║
              ║   Live Preview Engine    ║
              ╚═══════════╤══════════════╝
                          │  REST API
              ╔═══════════▼══════════════╗
              ║      Express Server      ║
              ║      Node.js             ║
              ║      JWT Middleware      ║
              ╚══╤══════════╤════════╤═══╝
                 │          │        │
        ┌────────┘    ┌─────┘   ┌────┘
        ▼             ▼         ▼
 ╔════════════╗ ╔═══════════╗ ╔══════════════╗
 ║  MongoDB   ║ ║  Gemini   ║ ║  ImageKit    ║
 ║  Mongoose  ║ ║  AI API   ║ ║  Upload +    ║
 ║            ║ ║  Resume   ║ ║  BG Removal  ║
 ║  Users     ║ ║  Optimize ║ ║  CDN Deliver ║
 ║  Resumes   ║ ╚═══════════╝ ╚══════════════╝
 ╚════════════╝
```

### At a Glance

| Layer | Technology | Role |
|-------|-----------|------|
| **Frontend** | React.js + Tailwind CSS | UI, live editor, template renderer |
| **Backend** | Node.js + Express.js | REST API, auth, business logic |
| **Database** | MongoDB + Mongoose | Users, resumes, sessions |
| **AI** | Google Gemini | Resume rewriting + optimization |
| **Image** | ImageKit | Profile photo upload, BG removal, CDN |
| **Auth** | JWT | Secure session management |

---

## ◈ Spin It Up

### Prerequisites

Node.js v18+ and accounts for:
[MongoDB Atlas](https://cloud.mongodb.com) · [Google AI Studio](https://aistudio.google.com) · [ImageKit](https://imagekit.io)

### Steps

**1 — Clone**
```bash
git clone https://github.com/yourusername/novalume.git
cd novalume
```

**2 — Install**
```bash
# Frontend
cd client && npm install && cd ..

# Backend
cd server && npm install && cd ..
```

**3 — Environment**
```bash
cp server/.env.example server/.env
# Fill in your keys — see Environment Variables below
```

**4 — Run**
```bash
# Terminal 1 — Backend
cd server && npm run start      # → http://localhost:5000

# Terminal 2 — Frontend
cd client && npm run dev        # → http://localhost:5173
```

---

## ◈ Environment Variables

```env
# ── Database ──────────────────────────────────────────────────────
MONGO_URI=your_mongo_connection_string

# ── Auth ──────────────────────────────────────────────────────────
JWT_SECRET=your_jwt_secret                          # server-only

# ── Google Gemini AI ──────────────────────────────────────────────
GEMINI_API_KEY=your_gemini_api_key                  # server-only

# ── ImageKit (Image Upload + BG Removal) ──────────────────────────
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key      # server-only
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

> ⚠️ Never commit `.env`. Keep all secret keys server-side — never expose them to the client bundle.

---

## ◈ Project Structure

```
novalume/
│
├── client/                        React frontend
│   ├── public/                    Static assets
│   └── src/
│       ├── app/                   App-level setup
│       ├── assets/                Images, icons, fonts
│       ├── components/            Reusable UI components
│       ├── configs/               Frontend config files
│       ├── pages/                 Route-level views
│       ├── App.jsx                Root component + routing
│       ├── main.jsx               React entry point
│       └── index.css              Global styles
│
├── server/                        Express backend
    ├── configs/                   DB + service config
    ├── controllers/               Route handler logic
    ├── middlewares/               Auth + error handling
    ├── models/                    Mongoose schemas (User, Resume)
    ├── routes/                    API endpoint definitions
    └── server.js                  Entry point

```

---

## ◈ API Overview

```
AUTH
  POST  /api/auth/register       Create account
  POST  /api/auth/login          Sign in → returns JWT

RESUMES
  GET   /api/resumes             List all user resumes
  POST  /api/resumes             Create new resume
  PUT   /api/resumes/:id         Update resume
  DELETE /api/resumes/:id        Delete resume
  GET   /api/resumes/:id/share   Get public shareable link

AI
  POST  /api/ai/optimize         Gemini AI resume optimization

IMAGE
  POST  /api/image/upload        Upload + remove background via ImageKit
```

---

## ◈ Deployment

```
1.  Push to GitHub
       ↓
2.  Deploy backend → Railway / Render
       ↓
3.  Deploy frontend → Vercel
       ↓
4.  Set env vars in each platform's dashboard
       ↓
5.  Update CORS origin in Express to match frontend URL
       ↓
6.  Live — share your resume with the world
```

---

## ◈ Roadmap

```diff
+ AI-driven job description matching (paste JD → auto-tailor resume)
+ One-click PDF export
+ Resume analytics (views, unique visitors, link clicks)
+ Drag-and-drop resume section builder
+ Cover letter generator (Gemini AI)
+ ATS score checker before applying
```

---

## ◈ Contributing

```bash
# 1. Fork → clone
# 2. Branch off main
git checkout -b feat/your-feature

# 3. Code + test your changes
# 4. Open a PR with a clear description of what + why
```

Please open an issue first for large changes or new feature proposals.

---

## ◈ License

```
MIT License

Copyright (c) 2025 Novalume

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

```
╔══════════════════════════════════════════════════════════════════╗
║   ✦  novalume  ·  your resume. reimagined by AI.               ║
╚══════════════════════════════════════════════════════════════════╝
```

[Report a Bug](https://github.com/yo-soy-dev/Novalume/issues) · [Request a Feature](https://github.com/yo-soy-dev/Novalume/issues)

> Crafted for creators, students, and professionals who want to stand out.
> If this helped you — consider ⭐ starring the repo!

</div>
