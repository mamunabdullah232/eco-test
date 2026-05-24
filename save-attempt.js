// Saves protected Xohopathi mock-test attempts to Firestore.
// Currently protects Class 10 English Grammar tests loaded through mock-test.html.

import { auth, db, onAuthStateChanged, collection, addDoc, serverTimestamp } from "./firebase-config.js";

let currentUser = null;
let authResolved = false;
let resolveAuthReady;
const authReady = new Promise((resolve) => {
  resolveAuthReady = resolve;
});

function isProtectedGrammarTest() {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file") || "";
  return file.includes("mock-tests/class-10/english/grammar/");
}

function redirectToLogin() {
  const redirect = encodeURIComponent(window.location.pathname + window.location.search);
  window.location.href = `/login.html?redirect=${redirect}`;
}

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  authResolved = true;
  resolveAuthReady(user);
  if (!user && isProtectedGrammarTest()) {
    redirectToLogin();
  }
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
    redirectToLogin();
    throw new Error("User is not logged in.");
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
  return docRef.id;
};