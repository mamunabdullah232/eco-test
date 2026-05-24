import {
  auth,
  db,
  googleProvider,
  signInWithRedirect,
  getRedirectResult,
  doc,
  setDoc,
  serverTimestamp,
  ADMIN_EMAIL
} from "./firebase-config.js";

const googleLoginBtn = document.getElementById("googleLoginBtn");
const statusText = document.getElementById("statusText");

function getRedirectUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("redirect") || sessionStorage.getItem("xohopathiLoginRedirect") || "";
}

function rememberRedirect() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect") || "";
  if (redirect) sessionStorage.setItem("xohopathiLoginRedirect", redirect);
}

async function saveUser(user) {
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
  return role;
}

function finishLogin(role) {
  const redirect = getRedirectUrl();
  sessionStorage.removeItem("xohopathiLoginRedirect");
  window.location.href = redirect || (role === "admin" ? "/admin-dashboard.html" : "/student-dashboard.html");
}

rememberRedirect();

getRedirectResult(auth)
  .then(async (result) => {
    if (!result || !result.user) return;
    statusText.textContent = "Login successful. Opening dashboard...";
    const role = await saveUser(result.user);
    finishLogin(role);
  })
  .catch((error) => {
    console.error(error);
    statusText.textContent = "Login failed. Please check Google sign-in and authorized domains.";
    googleLoginBtn.disabled = false;
  });

googleLoginBtn.addEventListener("click", async () => {
  statusText.textContent = "Opening Google sign-in...";
  googleLoginBtn.disabled = true;
  try {
    rememberRedirect();
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error(error);
    statusText.textContent = "Login failed. Please check Google sign-in and authorized domains.";
    googleLoginBtn.disabled = false;
  }
});
