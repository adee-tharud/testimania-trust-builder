
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgJDtSU8q2LfvtlhUdrjKt-Vr_YOa8Sdc",
  authDomain: "testimonialweb-ecc42.firebaseapp.com",
  projectId: "testimonialweb-ecc42",
  storageBucket: "testimonialweb-ecc42.firebasestorage.app",
  messagingSenderId: "234670125015",
  appId: "1:234670125015:web:1b1c5774b95cd0c1f4e592"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
