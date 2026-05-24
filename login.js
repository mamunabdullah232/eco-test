import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
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

function getUserRole(user) {
  const email = (user.email || "").toLowerCase();
  return email === ADMIN_EMAIL.toLowerCase() ? "admin" : "student";
}

function finishLogin(role) {
  const redirect = getRedirectUrl();
  sessionStorage.removeItem("xohopathiLoginRedirect");
  window.location.href = redirect || (role === "admin" ? "/admin-dashboard.html" : "/student-dashboard.html");
}

rememberRedirect();

let loginFinished = false;
let authChecked = false;

async function handleSignedInUser(user) {
  if (!user || loginFinished) return;
  loginFinished = true;
  statusText.textContent = "Login successful. Opening dashboard...";
  const role = getUserRole(user);
  saveUser(user).catch((error) => {
    console.warn("User profile could not be saved before redirect:", error);
  });
  finishLogin(role);
}

getRedirectResult(auth)
  .then(async (result) => {
    if (!result || !result.user) return;
    await handleSignedInUser(result.user);
  })
  .catch((error) => {
    console.error(error);
    statusText.textContent = "Login failed. Please check Google sign-in and authorized domains.";
    googleLoginBtn.disabled = false;
  });

onAuthStateChanged(auth, async (user) => {
  authChecked = true;
  try {
    await handleSignedInUser(user);
  } catch (error) {
    console.error(error);
    loginFinished = false;
    statusText.textContent = "Login successful, but dashboard could not open. Please try again.";
    googleLoginBtn.disabled = false;
  }
});

googleLoginBtn.addEventListener("click", async () => {
  statusText.textContent = "Opening Google sign-in...";
  googleLoginBtn.disabled = true;
  try {
    rememberRedirect();
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, googleProvider);
    await handleSignedInUser(result.user);
  } catch (error) {
    console.error(error);
    const code = error && error.code ? error.code : "";
    if (code.includes("popup") || code.includes("cancelled") || code.includes("blocked")) {
      try {
        statusText.textContent = "Popup blocked. Opening Google sign-in in this tab...";
        await signInWithRedirect(auth, googleProvider);
        return;
      } catch (redirectError) {
        console.error(redirectError);
      }
    }
    statusText.textContent = "Login failed. Please try again in Chrome and allow pop-ups for this site.";
    googleLoginBtn.disabled = false;
  }
});

setTimeout(() => {
  if (!authChecked && !loginFinished) {
    statusText.textContent = "Preparing login...";
  }
}, 1200);
