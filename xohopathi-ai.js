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
let assistant = null;
let signedInUser = null;

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

function ask(question) {
  const text = String(question || "").trim();
  if (!text || !assistant) return;
  addMessage(text, "user");
  input.value = "";
  window.setTimeout(() => addMessage(assistant.answer(text), "assistant"), 120);
}

async function loadDirectory() {
  const snapshot = await getDocs(collection(db, "staffDirectory"));
  const records = snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
  assistant = createAssistant(records);
  sendBtn.disabled = false;
  input.disabled = false;
  if (records.length) {
    setStatus(`${records.length} approved staff records ready`, "ready");
    input.focus();
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
    sendBtn.disabled = false;
    input.disabled = false;
  }
});

chatForm.addEventListener("submit", event => { event.preventDefault(); ask(input.value); });
suggestions.addEventListener("click", event => { const button = event.target.closest("button"); if (button) ask(button.textContent); });
logoutBtn.addEventListener("click", async () => { await signOut(auth); window.location.href = "./login.html"; });
