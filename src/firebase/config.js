import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuxXb98avzC2CR3TTcMSsPVtB9FMBsME8",
  authDomain: "react-mini-blog-dcce8.firebaseapp.com",
  projectId: "react-mini-blog-dcce8",
  storageBucket: "react-mini-blog-dcce8.firebasestorage.app",
  messagingSenderId: "448300307464",
  appId: "1:448300307464:web:1cde88b518a5011f67edbd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
