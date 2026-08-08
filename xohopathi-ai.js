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

async function fetchRecords(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
}

function countLabel(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

async function loadDirectory() {
  let staffRecords = [];
  let knowledgeRecords = [];
  const failures = [];

  try {
    staffRecords = await fetchRecords("staffDirectory");
  } catch (error) {
    console.warn("Staff directory load failed:", error);
    failures.push("staff");
  }

  try {
    knowledgeRecords = await fetchRecords("aiKnowledgeBase");
  } catch (error) {
    console.warn("Knowledge base load failed:", error);
    failures.push("knowledge");
  }

  assistant = createAssistant(staffRecords, knowledgeRecords);
  syncPasswordGate();
  const readyParts = [];
  if (knowledgeRecords.length) readyParts.push(countLabel(knowledgeRecords.length, "approved answer", "approved answers"));
  if (staffRecords.length) readyParts.push(countLabel(staffRecords.length, "staff record", "staff records"));

  if (readyParts.length) {
    setStatus(`${readyParts.join(" and ")} ready`, "ready");
  } else if (failures.length === 2) {
    setStatus("Routine ready. Approved Firestore records could not be loaded.", "ready");
  } else if (failures.length) {
    setStatus("Routine ready. Some approved Firestore records could not be loaded.", "ready");
  } else setStatus("Routine ready. No approved knowledge or staff records imported yet.", "ready");
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
    console.error("Approved record load failed:", error);
    assistant = createAssistant([], []);
    setStatus("Routine ready. Approved Firestore records could not be loaded.", "ready");
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
