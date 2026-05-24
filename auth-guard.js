// Add this file to protected pages with:
// <script type="module" src="/auth-guard.js"></script>

import { auth, db, onAuthStateChanged, doc, setDoc, serverTimestamp, ADMIN_EMAIL } from "./firebase-config.js";

function currentPathWithQuery() {
  return window.location.pathname + window.location.search;
}

async function saveUserProfile(user) {
  const email = (user.email || "").toLowerCase();
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: user.displayName || "",
    email,
    photoURL: user.photoURL || "",
    role: email === ADMIN_EMAIL.toLowerCase() ? "admin" : "student",
    provider: "google",
    lastSeenAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    const redirect = encodeURIComponent(currentPathWithQuery());
    window.location.href = `/login.html?redirect=${redirect}`;
    return;
  }
  try {
    await saveUserProfile(user);
    document.body.classList.add("user-logged-in");
    window.xohopathiCurrentUser = user;
  } catch (error) {
    console.error("Auth guard profile save error:", error);
  }
});