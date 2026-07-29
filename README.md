<div align="center">

# 🛕 Divine Trails | Sacred Temple Tours Platform

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase_v10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel_Live-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://divine-trails.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](LICENSE)
[![Code Quality](https://img.shields.io/badge/ESLint-Passed-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](#-code-quality--standards)

**A modern, high-performance web platform for sacred temple tours & yatra bookings built with Vite, Firebase v10+ Modular SDK, and real-time Firestore synchronization.**

[🌐 Explore Live Website](https://divine-trails.vercel.app) • [🔑 Auth Portal](https://divine-trails.vercel.app/auth) • [⚙️ Admin Dashboard](https://divine-trails.vercel.app/admin)

</div>

---

## 🌟 Key Features

* **⚡ Lightning-Fast Performance:** Built with **Vite** multi-page routing for instant page loads, optimal asset bundling, and code splitting.
* **🔥 Firebase v10+ Modular SDK:** Integrated tree-shakeable Firebase Auth and Firestore with real-time `onSnapshot` listeners for seamless package and booking updates.
* **📱 Responsive & Elegant UI:** Tailored glassmorphism aesthetics, saffron/teal temple-inspired color palette, smooth scroll animations, and dark/light mode toggle.
* **🛡️ Secure Role-Based Authorization:** Client & server-side authorization patterns with Firestore Security Rules (`firestore.rules`) guarding admin collections.
* **📊 Comprehensive Admin Dashboard:** Metrics overview (active packages, total bookings, estimated revenue), live package CRUD operations, and pilgrim booking management.
* **🔍 Search & Filter Engine:** Real-time package search by location or title, sorting by price/rating, and category filtering.

---

## 🏗️ System Architecture

```text
                               ┌──────────────────────────┐
                               │     Client Frontend      │
                               │  (Vite + Modular ES6)    │
                               └────────────┬─────────────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    ▼                       ▼                       ▼
           ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
           │   Main Site     │     │   Auth Portal   │     │ Admin Dashboard │
           │  (index.html)   │     │   (auth.html)   │     │  (admin.html)   │
           └────────┬────────┘     └────────┬────────┘     └────────┬────────┘
                    │                       │                       │
                    └───────────────────────┼───────────────────────┘
                                            │
                                            ▼
                               ┌──────────────────────────┐
                               │   Firebase v10 Services  │
                               │  - Auth (Email/Pass)     │
                               │  - Firestore Realtime    │
                               └──────────────────────────┘
```

---

## 📁 Repository Directory Structure

```text
divine-trails/
├── .env.example              # Template for environment variables
├── .eslintrc.json            # ESLint code hygiene rules
├── .gitignore                # Protects credentials and build artifacts
├── admin.html                # Admin Dashboard entrypoint
├── auth.html                 # Authentication Portal entrypoint
├── firestore.rules           # Security rules for Firestore collections
├── index.html                # Main User Site entrypoint
├── package.json              # NPM scripts and dependency definitions
├── README.md                 # Technical documentation
├── vercel.json               # Vercel static rewrite configuration
├── vite.config.js            # Multi-page Vite build configuration
└── src/
    ├── config/
    │   └── firebase.js       # Modular Firebase initialization
    ├── services/
    │   ├── authService.js    # Authentication & User State management
    │   └── dataService.js    # Real-time Firestore sync & query logic
    ├── pages/
    │   ├── admin.js          # Admin dashboard controller
    │   └── auth.js           # Auth page handler
    ├── styles/
    │   └── style.css         # Core CSS design system & tokens
    └── main.js               # Main website application script
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher

### Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AvishkarRanjane/divine-trails.git
   cd divine-trails
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=divine-trails-4f2f4.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=divine-trails-4f2f4
   VITE_FIREBASE_STORAGE_BUCKET=divine-trails-4f2f4.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=302335969490
   VITE_FIREBASE_APP_ID=1:302335969490:web:e0955f5edc86afa591850b
   VITE_ADMIN_EMAIL=mr.avishkarranjane07@gmail.com
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🧪 Code Quality & Standards

Run code linting:
```bash
npm run lint
```

Run production build validation:
```bash
npm run build
```

---

## 🛡️ Security

- All API keys are loaded via environment variables (`import.meta.env`).
- Firestore Security Rules (`firestore.rules`) restrict edit permissions on settings/packages to verified admin accounts.

---

## 👨‍💻 Author

**Avishkar Ranjane**
- GitHub: [@AvishkarRanjane](https://github.com/AvishkarRanjane)
- Live Deployment: [divine-trails.vercel.app](https://divine-trails.vercel.app)
