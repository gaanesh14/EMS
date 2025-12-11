import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVjXjWqtjVNUPJAlJrWiC5OWsyLtErDKw",
  authDomain: "emsc-4f28a.firebaseapp.com",
  projectId: "emsc-4f28a",
  storageBucket: "emsc-4f28a.firebasestorage.app",
  messagingSenderId: "242663830612",
  appId: "1:242663830612:web:c86b9f17d60e239c87a9c1",
  measurementId: "G-LZ1MLEWJ0W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
//const analytics = getAnalytics(app);
