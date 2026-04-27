import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "apiKey: import.meta.env.VITE_API_KEY,",
  authDomain: "fireguard-57574.firebaseapp.com",
  projectId: "fireguard-57574",
  storageBucket: "fireguard-57574.firebasestorage.app",
  messagingSenderId: "292693547961",
  appId: "1:292693547961:web:b58504713d8f5588def468",
  measurementId: "G-GMDZ13SP4B"
};


const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app);
 export const db=getFirestore(app);
export default app;