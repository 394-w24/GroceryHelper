// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  doc,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  arrayUnion,
  query,
  deleteDoc,
  where,
  deleteField,
} from "firebase/firestore";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = async (user, navigate) => {
  const { displayName, photoURL, uid } = user;
  localStorage.setItem("isSignedIn", true);
  localStorage.setItem("name", displayName);
  localStorage.setItem("photoUrl", photoURL);
  localStorage.setItem("uid", uid);
  navigate(0);
};

const checkIfSignedUp = async (uid) => {
  const authDocRef = doc(db, "users", uid);
  const snapshot = await getDoc(authDocRef);

  return snapshot.exists();
};

const signUpWithGoogle = async (navigate) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const isSignedUp = await checkIfSignedUp(user.uid);
      if (isSignedUp) {
        signInWithGoogle(user, navigate);
      } else {
        const userDocRef = doc(db, "users", user.uid);
        const userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        await setDoc(userDocRef, userData, { merge: true });
        signInWithGoogle(user, navigate);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const checkIfLoggedIn = () => {
  const isSignedIn = localStorage.getItem("isSignedIn");
  return isSignedIn;
};
const getUserData = async () => {
  const uid = localStorage.getItem("uid");
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data;
  }

  return null;
};

export { db, auth, storage, signUpWithGoogle, checkIfLoggedIn, getUserData };
