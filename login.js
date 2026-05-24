import { auth, db, googleProvider, signInWithPopup, doc, setDoc, serverTimestamp, ADMIN_EMAIL } from "./firebase-config.js";

const googleLoginBtn = document.getElementById("googleLoginBtn");
const statusText = document.getElementById("statusText");

function getRedirectUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("redirect") || "";
}

googleLoginBtn.addEventListener("click", async () => {
  statusText.textContent = "Signing in...";
  googleLoginBtn.disabled = true;
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const email = (user.email || "").toLowerCase();
    const role = email === ADMIN_EMAIL.toLowerCase() ? "admin" : "student";
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName || "",
      email,
      photoURL: user.photoURL || "",
      role,
      provider: "google",
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    const redirect = getRedirectUrl();
    window.location.href = redirect || (role === "admin" ? "/admin-dashboard.html" : "/student-dashboard.html");
  } catch (error) {
    console.error(error);
    statusText.textContent = "Login failed. Please try again.";
    googleLoginBtn.disabled = false;
  }
});