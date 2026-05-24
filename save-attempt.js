// Saves Xohopathi mock-test attempts to Firestore when a student is logged in.
// Tests remain open to everyone; login is only needed for saving/viewing results.

import { auth, db, onAuthStateChanged, collection, addDoc, serverTimestamp } from "./firebase-config.js";

let currentUser = null;
let authResolved = false;
let resolveAuthReady;
const authReady = new Promise((resolve) => {
  resolveAuthReady = resolve;
});

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  authResolved = true;
  resolveAuthReady(user);
});

window.saveXohopathiAttempt = async function saveXohopathiAttempt({
  className = "10",
  subject = "English",
  topic = "Grammar",
  testId = "",
  testTitle = "",
  score = 0,
  totalQuestions = 0,
  answers = [],
  correctAnswers = [],
  extra = {}
}) {
  const user = authResolved ? currentUser : await authReady;
  if (!user) {
    return { saved: false, reason: "not-logged-in" };
  }

  const attempt = {
    uid: user.uid,
    studentName: user.displayName || "",
    email: (user.email || "").toLowerCase(),
    className,
    subject,
    topic,
    testId,
    testTitle,
    score,
    totalQuestions,
    answers,
    correctAnswers,
    extra,
    submittedAt: serverTimestamp(),
    userAgent: navigator.userAgent
  };

  const docRef = await addDoc(collection(db, "testAttempts"), attempt);
  return { saved: true, id: docRef.id };
};
