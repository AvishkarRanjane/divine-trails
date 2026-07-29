import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBHljSoReEWsTd5fiyuxTXadlYE4kTkbKQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "divine-trails-4f2f4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "divine-trails-4f2f4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "divine-trails-4f2f4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "302335969490",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:302335969490:web:e0955f5edc86afa591850b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YXQZ64W1TT",
};

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "mr.avishkarranjane07@gmail.com";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
