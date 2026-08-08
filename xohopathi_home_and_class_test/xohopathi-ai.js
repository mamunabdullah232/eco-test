import { auth, db, onAuthStateChanged, signOut, collection, getDocs } from "./firebase-config.js";
import { createAssistant } from "./xohopathi-ai-core.js";

const userInfo = document.getElementById("userInfo");
const status = document.getElementById("directoryStatus");
const messages = document.getElementById("messages");
const chatScroll = document.getElementById("chatScroll");
const chatForm = document.getElementById("chatForm");
const input = document.getElementById("questionInput");
const sendBtn = document.getElementById("sendBtn");
const logoutBtn = document.getElementById("logoutBtn");
const suggestions = document.getElementById("suggestions");
const passwordGate = document.getElementById("passwordGate");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const ACCESS_PASSWORD = "Mentors";
const ACCESS_KEY = "xohopathiAiPasswordOk";
let assistant = null;
let signedInUser = null;
let passwordUnlocked = sessionStorage.getItem(ACCESS_KEY) === "true";

function setStatus(message, state = "") {
  status.className = `status ${state}`.trim();
  status.querySelector("span:last-child").textContent = message;
}

function initials(name) {
  return String(name || "User").split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
}

function addMessage(text, role) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? initials(signedInUser?.displayName) : "XA";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  wrapper.append(avatar, bubble);
  messages.append(wrapper);
  chatScroll.scrollTop = chatScroll.scrollHeight;
}

function syncPasswordGate() {
  passwordGate.hidden = passwordUnlocked;
  input.disabled = !passwordUnlocked || !assistant;
  sendBtn.disabled = !passwordUnlocked || !assistant;
  if (passwordUnlocked && assistant) input.focus();
  else if (!passwordUnlocked) window.setTimeout(() => passwordInput.focus(), 50);
}

function ask(question) {
  const text = String(question || "").trim();
  if (!text || !assistant || !passwordUnlocked) return;
  addMessage(text, "user");
  input.value = "";
  window.setTimeout(() => addMessage(assistant.answer(text), "assistant"), 120);
}

async function loadDirectory() {
  const snapshot = await getDocs(collection(db, "staffDirectory"));
  const records = snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
  assistant = createAssistant(records);
  syncPasswordGate();
  if (records.length) {
    setStatus(`${records.length} approved staff records ready`, "ready");
  } else setStatus("Routine ready. Staff directory has not been imported.", "ready");
}

onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = `/login.html?redirect=${encodeURIComponent("/xohopathi-ai.html")}`;
    return;
  }
  signedInUser = user;
  userInfo.textContent = `${user.displayName || "Signed-in user"} - secure assistant`;
  try {
    await loadDirectory();
  } catch (error) {
    console.error("Staff directory load failed:", error);
    assistant = createAssistant([]);
    setStatus("Routine ready. Approved staff records could not be loaded.", "ready");
    syncPasswordGate();
  }
});

passwordForm.addEventListener("submit", event => {
  event.preventDefault();
  if (passwordInput.value === ACCESS_PASSWORD) {
    passwordUnlocked = true;
    sessionStorage.setItem(ACCESS_KEY, "true");
    passwordInput.value = "";
    passwordError.textContent = "";
    syncPasswordGate();
    return;
  }
  passwordError.textContent = "Incorrect password.";
  passwordInput.select();
});
syncPasswordGate();
chatForm.addEventListener("submit", event => { event.preventDefault(); ask(input.value); });
suggestions.addEventListener("click", event => { const button = event.target.closest("button"); if (button) ask(button.textContent); });
logoutBtn.addEventListener("click", async () => { sessionStorage.removeItem(ACCESS_KEY); await signOut(auth); window.location.href = "./login.html"; });
