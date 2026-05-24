// Xohopathi Firebase configuration and shared Firebase exports.
// Uses Firebase CDN modules so the static website can run without a build step.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYp6u2VYlaFwCGGpbZ05PxNwFuAwIF-Xg",
  authDomain: "xohopathi.firebaseapp.com",
  projectId: "xohopathi",
  storageBucket: "xohopathi.firebasestorage.app",
  messagingSenderId: "194640996200",
  appId: "1:194640996200:web:71c6ec023414a41e2b98dd",
  measurementId: "G-5VQC8RR8LC"
};

export const ADMIN_EMAIL = "mamunabdullah262@gmail.com";

export const app = initializeApp(firebaseConfig);

let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Firebase Analytics not initialized in this environment:", error);
}
export { analytics };

export const auth = getAuth(app);
auth.useDeviceLanguage();

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp
};
