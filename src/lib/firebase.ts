
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgJDtSU8q2LfvtlhUdrjKt-Vr_YOa8Sdc",
  authDomain: "testimonialweb-ecc42.firebaseapp.com",
  projectId: "testimonialweb-ecc42",
  storageBucket: "testimonialweb-ecc42.firebasestorage.app",
  messagingSenderId: "234670125015",
  appId: "1:234670125015:web:1b1c5774b95cd0c1f4e592"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable network for Firestore
import { enableNetwork } from "firebase/firestore";
enableNetwork(db).catch((error) => {
  console.error("Failed to enable Firestore network:", error);
});

export default app;
