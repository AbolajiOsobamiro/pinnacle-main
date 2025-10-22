// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuc8YVWx1SMU8RbZGeTz_HWivwKqSLmuU",
  authDomain: "pinnacle-ab2f6.firebaseapp.com",
  projectId: "pinnacle-ab2f6",
  storageBucket: "pinnacle-ab2f6.firebasestorage.app",
  messagingSenderId: "501077782689",
  appId: "1:501077782689:web:941d6a183fc73016ed80e0",
  measurementId: "G-1QC216SPSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app);

export { app, auth,db };