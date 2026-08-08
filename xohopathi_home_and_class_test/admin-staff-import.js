import { auth, db, onAuthStateChanged, collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp, ADMIN_EMAILS } from "./firebase-config.js";

const adminInfo = document.getElementById("adminInfo");
const fileInput = document.getElementById("fileInput");
const importBtn = document.getElementById("importBtn");
const status = document.getElementById("status");
let preparedRecords = [];

function setStatus(message, type = "") { status.className = type; status.textContent = message; }
function clean(value, maxLength = 160) { return String(value ?? "").trim().slice(0, maxLength); }

function validateRecords(value) {
  if (!Array.isArray(value) || !value.length || value.length > 200) throw new Error("The file must contain 1 to 200 staff records.");
  const seen = new Set();
  return value.map((item, index) => {
    const id = clean(item.id, 100).toLowerCase().replace(/[^a-z0-9-]/g, "");
    const name = clean(item.name, 120);
    if (!id || !name || seen.has(id)) throw new Error(`Record ${index + 1} has a missing or duplicate ID/name.`);
    seen.add(id);
    return {
      id, name,
      staffType: clean(item.staffType, 40), email: clean(item.email, 160),
      mobile: clean(item.mobile, 20).replace(/[^0-9+ -]/g, ""),
      appointedSubject: clean(item.appointedSubject, 160), post: clean(item.post, 100),
      additionalSubjectProficiency: clean(item.additionalSubjectProficiency, 240),
      additionalLanguageProficiency: clean(item.additionalLanguageProficiency, 160)
    };
  });
}

fileInput.addEventListener("change", async () => {
  preparedRecords = [];
  importBtn.disabled = true;
  const file = fileInput.files?.[0];
  if (!file) return;
  try {
    preparedRecords = validateRecords(JSON.parse(await file.text()));
    importBtn.disabled = false;
    setStatus(`${preparedRecords.length} approved staff records are ready to import.`, "ok");
  } catch (error) { setStatus(error.message || "The selected file could not be validated.", "error"); }
});

importBtn.addEventListener("click", async () => {
  if (!preparedRecords.length) return;
  importBtn.disabled = true;
  fileInput.disabled = true;
  setStatus("Importing protected staff records...");
  try {
    const existing = await getDocs(collection(db, "staffDirectory"));
    const incomingIds = new Set(preparedRecords.map(item => item.id));
    await Promise.all(preparedRecords.map(item => setDoc(doc(db, "staffDirectory", item.id), {
      name: item.name, staffType: item.staffType, email: item.email, mobile: item.mobile,
      appointedSubject: item.appointedSubject, post: item.post,
      additionalSubjectProficiency: item.additionalSubjectProficiency,
      additionalLanguageProficiency: item.additionalLanguageProficiency, updatedAt: serverTimestamp()
    }, { merge: false })));
    await Promise.all(existing.docs.filter(item => !incomingIds.has(item.id)).map(item => deleteDoc(item.ref)));
    setStatus(`Import complete. ${preparedRecords.length} staff records are now available to signed-in Xohopathi AI users.`, "ok");
  } catch (error) {
    console.error("Staff import failed:", error);
    setStatus("Import failed. Check the deployed Firestore rules and try again.", "error");
    importBtn.disabled = false;
    fileInput.disabled = false;
  }
});

onAuthStateChanged(auth, user => {
  if (!user) { window.location.href = "./login.html?redirect=./admin-staff-import.html"; return; }
  const email = String(user.email || "").toLowerCase();
  const allowed = ADMIN_EMAILS.map(item => item.toLowerCase()).includes(email);
  adminInfo.textContent = `${user.displayName || "Admin"} - ${email}`;
  if (!allowed) { setStatus("Access denied. Use an approved Xohopathi administrator account.", "error"); return; }
  fileInput.disabled = false;
  setStatus("Admin access confirmed. Select the prepared JSON file.", "ok");
});
