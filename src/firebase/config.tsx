import firebase from "firebase/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  connectAuthEmulator,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJmczXk1YuzGJLGqELX5ptUBS8z017rmI",
  authDomain: "nextjs-trello-d8fb3.firebaseapp.com",
  projectId: "nextjs-trello-d8fb3",
  storageBucket: "nextjs-trello-d8fb3.appspot.com",
  messagingSenderId: "149115831274",
  appId: "1:149115831274:web:338b273208713c90ae6893",
  measurementId: "G-L2QM1NCB75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);
// if (process.env.NODE_ENV === "development") {
//   // Kết nối với Firestore emulator
//   connectFirestoreEmulator(db, "localhost", 8080);
//   connectAuthEmulator(auth, "http://localhost:9099");
// }

export { db, auth };
