// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  connectAuthEmulator,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_API_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

if (!globalThis.EMULATION && import.meta.env.MODE === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);

  signInWithCredential(
    auth,
    GoogleAuthProvider.credential(
      '{"sub": "H8fSW7M5bNI9sLT5Ol5pyaDJP6Ma", "email": "test@gmail.com", "displayName":"test", "email_verified": true}'
    )
  );

  // set flag to avoid connecting twice, e.g., because of an editor hot-reload
  globalThis.EMULATION = true;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = async (user, navigate) => {
  const { displayName, photoURL, uid } = user;
  localStorage.setItem("lastSignIn", new Date().toISOString());
  localStorage.setItem("name", displayName);
  localStorage.setItem("photoUrl", photoURL);
  localStorage.setItem("uid", uid);

  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  const settings = snapshot.data()?.settings;
  console.log(
    "settings",
    settings?.sendEmail,
    settings?.sendBefore,
    settings?.sendTime
  );
  localStorage.setItem("sendEmail", settings?.sendEmail);
  localStorage.setItem("sendBefore", settings?.sendBefore);
  localStorage.setItem("sendTime", settings?.sendTime);
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

const handleLogOut = () => {
  signOut(auth);
  localStorage.removeItem("isSignedIn");
  localStorage.removeItem("name");
  localStorage.removeItem("photoUrl");
  localStorage.removeItem("uid");
  localStorage.clear();
  window.location.reload();
};

const checkIfLoggedIn = () => {
  const lastSignIn = localStorage.getItem("lastSignIn");
  if (lastSignIn) {
    const lastSignInTime = new Date(lastSignIn).getTime();
    const currentTime = new Date().getTime();
    // Check if the last sign-in was within the last 24 hours
    return currentTime - lastSignInTime <= 86400000; // 86400000 ms = 24 hours
  }
  return false;
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

const updateUserSettings = async (uid, settings) => {
  console.log("updating settings", settings);
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, settings);
};

const deleteUserFirestore = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  await deleteDoc(userDocRef);
};

export {
  db,
  auth,
  storage,
  signUpWithGoogle,
  checkIfLoggedIn,
  getUserData,
  handleLogOut,
  updateUserSettings,
};
