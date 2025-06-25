import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiwcB6wB98LDnN_0zC0cqtUa_ppgRtxxQ",
  authDomain: "projeto-41d27.firebaseapp.com",
  projectId: "projeto-41d27",
  storageBucket: "projeto-41d27.firebasestorage.app",
  messagingSenderId: "194442384",
  appId: "1:194442384:web:395606716bf3eb21591415"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);