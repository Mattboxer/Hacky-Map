// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCnW-49ljxVS9Xtx9rwbxd5D2UAK4k6gDw",
  authDomain: "hackyspot-a6a9c.firebaseapp.com",
  projectId: "hackyspot-a6a9c",
  storageBucket: "hackyspot-a6a9c.appspot.com",
  messagingSenderId: "123889612478",
  appId: "1:123889612478:web:82fd392498006f8b14d0ef",
  measurementId: "G-9DB1LJLEVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firestore & Storage
export { db, storage };
