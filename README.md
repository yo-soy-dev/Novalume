# **Novalume – AI-Powered Resume Builder (MERN Stack)**

Novalume is a modern, intelligent, and beautifully crafted **AI-powered Resume Builder Web App** built using the MERN stack. It helps users create professional resumes, optimize their content using Google Gemini AI, and share them online with a clean, live-preview interface.

---

## 🚀 **Features**

### 🔐 **User Authentication**

* Secure Sign In / Sign Up
* JWT-based authentication
* Protected user dashboard

### 📝 **Resume Creation & Management**

* Create new resumes from scratch
* Add, edit, and delete resumes
* Manage multiple resumes seamlessly

### ⚡ **Live Resume Preview**

* Real-time preview while editing
* Generate a unique online resume link
* Share your resume with anyone instantly

### 🤖 **AI Resume Optimization**

* Upload your existing resume (PDF/Text)
* Improve, rewrite, and optimize using **Google Gemini AI**
* Grammar correction, tone enhancement, role-specific optimization

### 🖼️ **Smart Image Processing**

* Upload profile photos
* Remove background using AI
* Images stored via **ImageKit** for fast & secure delivery

### 🎨 **Multiple Templates**

* Professionally designed resume templates
* Tailwind CSS-based elegant styles
* Switch templates without losing data

---

## 🛠️ **Tech Stack**

### **Frontend**

* React.js
* Tailwind CSS

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)

### **Integrations**

* Google Gemini AI Model → Resume optimization
* ImageKit → Image upload & background removal

---

## 📂 **Project Structure (Suggested)**

```
novalume/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ **Setup Instructions**

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/novalume.git
cd novalume
```

### 2️⃣ Install dependencies

**Client:**

```bash
cd client
npm install
```

**Server:**

```bash
cd server
npm install
```

### 3️⃣ Add environment variables

Create a `.env` file in the server directory:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_secret
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
```

### 4️⃣ Start the development servers

**Client:**

```bash
npm run dev
```

**Server:**

```bash
npm run start
```

---

## 🔮 **Future Enhancements**

* AI-driven automatic job description matching
* One-click export to PDF
* Resume analytics (views, clicks)
* Drag-and-drop resume builder

---

## 🧑‍💻 **Author**

**Novalume** — Crafted for creators, students, and professionals who want to stand out.

If you like this project, consider ⭐ starring the repository!

---

## 📜 **License**

This project is licensed under the MIT License.
