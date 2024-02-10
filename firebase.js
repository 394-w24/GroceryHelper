// Import the functions you need from the SDKs you need
import { initializeApp, getFirestore, getAuth } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgvfRM8_g9dPdMiEooaU-q4lBUDHqz3TA",
  authDomain: "groceryhelper-fdb2d.firebaseapp.com",
  projectId: "groceryhelper-fdb2d",
  storageBucket: "groceryhelper-fdb2d.appspot.com",
  messagingSenderId: "4854415838",
  appId: "1:4854415838:web:6295f2bab2abdb0c78dd4f",
  measurementId: "G-TXR6SHT9B4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
