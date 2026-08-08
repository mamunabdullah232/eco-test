import { auth, db, onAuthStateChanged, collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, ADMIN_EMAILS } from "./firebase-config.js";

const COLLECTION = "aiKnowledgeBase";
const adminInfo = document.getElementById("adminInfo");
const recordForm = document.getElementById("recordForm");
const recordId = document.getElementById("recordId");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const categoryInput = document.getElementById("categoryInput");
const tagsInput = document.getElementById("tagsInput");
const aliasesInput = document.getElementById("aliasesInput");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const fileInput = document.getElementById("fileInput");
const importBtn = document.getElementById("importBtn");
const refreshBtn = document.getElementById("refreshBtn");
const status = document.getElementById("status");
const recordsArea = document.getElementById("recordsArea");
const recordCount = document.getElementById("recordCount");
let records = [];
let preparedRecords = [];
let adminEmail = "";

function setStatus(message, type = "") { status.className = type; status.textContent = message; }
function clean(value, maxLength = 160) { return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength); }
function cleanMultiline(value, maxLength = 2000) { return String(value ?? "").trim().replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").slice(0, maxLength); }
function splitList(value, maxItems = 20, maxLength = 80) {
  const source = Array.isArray(value) ? value : String(value ?? "").split(/[\n,;]+/);
  return [...new Set(source.map(item => clean(item, maxLength)).filter(Boolean))].slice(0, maxItems);
}
function slug(value) {
  return clean(value, 90).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "knowledge";
}
function firebaseErrorText(error) {
  const code = clean(error?.code, 80);
  const message = clean(error?.message, 220);
  if (code === "permission-denied") return "Firestore denied access. Publish the aiKnowledgeBase rule in firestore-rules.txt, then try again.";
  return [code && `Firebase ${code}`, message].filter(Boolean).join(": ") || "Check the deployed Firestore rules and try again.";
}
function validateRecord(item, index = 0) {
  const question = cleanMultiline(item.question, 260);
  const answer = cleanMultiline(item.answer, 2000);
  if (!question || !answer) throw new Error(`Record ${index + 1} needs both a question and an approved answer.`);
  return {
    id: clean(item.id, 100).toLowerCase().replace(/[^a-z0-9-]/g, "") || `${slug(question)}-${index + 1}`,
    question,
    answer,
    category: clean(item.category, 80),
    tags: splitList(item.tags, 24, 60),
    aliases: splitList(item.aliases, 40, 120)
  };
}
function formRecord() {
  return validateRecord({
    id: recordId.value || `${slug(questionInput.value)}-${Date.now().toString(36)}`,
    question: questionInput.value,
    answer: answerInput.value,
    category: categoryInput.value,
    tags: tagsInput.value,
    aliases: aliasesInput.value
  });
}
function setControls(enabled) {
  [questionInput, answerInput, categoryInput, tagsInput, aliasesInput, fileInput, refreshBtn, clearBtn].forEach(item => { item.disabled = !enabled; });
  saveBtn.disabled = !enabled;
}
function clearForm() {
  recordId.value = "";
  recordForm.reset();
  questionInput.focus();
}
function fillForm(record) {
  recordId.value = record.id;
  questionInput.value = record.question;
  answerInput.value = record.answer;
  categoryInput.value = record.category || "";
  tagsInput.value = (record.tags || []).join(", ");
  aliasesInput.value = (record.aliases || []).join("\n");
  questionInput.focus();
}
function renderRecords() {
  recordsArea.replaceChildren();
  recordCount.textContent = `${records.length} approved record${records.length === 1 ? "" : "s"}.`;
  if (!records.length) {
    recordsArea.textContent = "No approved knowledge records yet.";
    return;
  }
  records.forEach(record => {
    const wrapper = document.createElement("article");
    wrapper.className = "record";
    const title = document.createElement("strong");
    title.textContent = record.question;
    const meta = document.createElement("div");
    meta.className = "meta";
    [record.category, ...(record.tags || [])].filter(Boolean).forEach(value => {
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = value;
      meta.append(pill);
    });
    const answer = document.createElement("p");
    answer.textContent = record.answer;
    const actions = document.createElement("div");
    actions.className = "actions";
    const edit = document.createElement("button");
    edit.className = "btn secondary";
    edit.type = "button";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => fillForm(record));
    const remove = document.createElement("button");
    remove.className = "btn danger";
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => deleteRecord(record));
    actions.append(edit, remove);
    wrapper.append(title, meta, answer, actions);
    recordsArea.append(wrapper);
  });
}
async function refreshRecords() {
  recordsArea.textContent = "Loading...";
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    records = snapshot.docs.map(item => validateRecord({ id: item.id, ...item.data() })).sort((a, b) => (a.category || "").localeCompare(b.category || "") || a.question.localeCompare(b.question));
    renderRecords();
  } catch (error) {
    console.error("Knowledge records load failed:", error);
    recordsArea.textContent = firebaseErrorText(error);
    recordCount.textContent = "Records could not be loaded.";
  }
}
async function saveRecord(record) {
  await setDoc(doc(db, COLLECTION, record.id), { ...record, updatedAt: serverTimestamp(), updatedBy: adminEmail }, { merge: false });
}
async function deleteRecord(record) {
  if (!window.confirm(`Delete this approved answer?\n\n${record.question}`)) return;
  try {
    await deleteDoc(doc(db, COLLECTION, record.id));
    setStatus("Approved answer deleted.", "ok");
    clearForm();
    await refreshRecords();
  } catch (error) {
    console.error("Knowledge record delete failed:", error);
    setStatus(`Delete failed: ${firebaseErrorText(error)}`, "error");
  }
}

recordForm.addEventListener("submit", async event => {
  event.preventDefault();
  saveBtn.disabled = true;
  try {
    const record = formRecord();
    await saveRecord(record);
    setStatus("Approved answer saved.", "ok");
    clearForm();
    await refreshRecords();
  } catch (error) {
    console.error("Knowledge record save failed:", error);
    setStatus(`Save failed: ${firebaseErrorText(error)}`, "error");
  } finally {
    saveBtn.disabled = false;
  }
});
clearBtn.addEventListener("click", clearForm);
refreshBtn.addEventListener("click", refreshRecords);
fileInput.addEventListener("change", async () => {
  preparedRecords = [];
  importBtn.disabled = true;
  const file = fileInput.files?.[0];
  if (!file) return;
  try {
    const value = JSON.parse(await file.text());
    if (!Array.isArray(value) || !value.length || value.length > 500) throw new Error("The file must contain 1 to 500 knowledge records.");
    const seen = new Set();
    preparedRecords = value.map(validateRecord).map((record, index) => {
      const id = seen.has(record.id) ? `${record.id}-${index + 1}` : record.id;
      seen.add(id);
      return { ...record, id };
    });
    importBtn.disabled = false;
    setStatus(`${preparedRecords.length} approved knowledge records are ready to import.`, "ok");
  } catch (error) {
    setStatus(error.message || "The selected file could not be validated.", "error");
  }
});
importBtn.addEventListener("click", async () => {
  if (!preparedRecords.length) return;
  importBtn.disabled = true;
  fileInput.disabled = true;
  setStatus("Importing approved knowledge records...");
  try {
    const incomingIds = new Set(preparedRecords.map(item => item.id));
    await Promise.all(preparedRecords.map(saveRecord));
    try {
      const existing = await getDocs(collection(db, COLLECTION));
      await Promise.all(existing.docs.filter(item => !incomingIds.has(item.id)).map(item => deleteDoc(item.ref)));
      setStatus(`Import complete. ${preparedRecords.length} approved knowledge records are available to Xohopathi AI.`, "ok");
    } catch (cleanupError) {
      console.warn("Knowledge cleanup skipped:", cleanupError);
      setStatus(`Import complete. ${preparedRecords.length} records were saved. Cleanup skipped: ${firebaseErrorText(cleanupError)}`, "ok");
    }
    preparedRecords = [];
    fileInput.value = "";
    await refreshRecords();
  } catch (error) {
    console.error("Knowledge import failed:", error);
    setStatus(`Import failed: ${firebaseErrorText(error)}`, "error");
  } finally {
    importBtn.disabled = !preparedRecords.length;
    fileInput.disabled = false;
  }
});

onAuthStateChanged(auth, async user => {
  if (!user) { window.location.href = "./login.html?redirect=./admin-knowledge-base.html"; return; }
  adminEmail = String(user.email || "").toLowerCase();
  const allowed = ADMIN_EMAILS.map(item => item.toLowerCase()).includes(adminEmail);
  adminInfo.textContent = `${user.displayName || "Admin"} - ${adminEmail}`;
  if (!allowed) {
    setStatus("Access denied. Use an approved Xohopathi administrator account.", "error");
    recordsArea.textContent = "Access denied.";
    return;
  }
  setControls(true);
  setStatus("Admin access confirmed.", "ok");
  await refreshRecords();
});
