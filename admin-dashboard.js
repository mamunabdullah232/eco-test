import { auth, db, onAuthStateChanged, signOut, collection, getDocs, ADMIN_EMAIL } from "./firebase-config.js";

const adminInfo = document.getElementById("adminInfo");
const adminArea = document.getElementById("adminArea");
const logoutBtn = document.getElementById("logoutBtn");
const refreshBtn = document.getElementById("refreshBtn");

function formatDate(value) {
  if (!value) return "-";
  if (value.toDate) return value.toDate().toLocaleString();
  return String(value);
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function renderAttempts(attempts) {
  if (!attempts.length) {
    adminArea.textContent = "No student attempts found yet.";
    return;
  }
  attempts.sort((a, b) => {
    const at = a.submittedAt?.toMillis ? a.submittedAt.toMillis() : 0;
    const bt = b.submittedAt?.toMillis ? b.submittedAt.toMillis() : 0;
    return bt - at;
  });
  const rows = attempts.map(item => `<tr><td>${escapeHtml(item.studentName || "-")}<br><span class="muted">${escapeHtml(item.email || "")}</span></td><td>${escapeHtml(item.className || "-")}</td><td>${escapeHtml(item.subject || "-")}</td><td>${escapeHtml(item.topic || "-")}</td><td>${escapeHtml(item.testId || "-")}</td><td>${escapeHtml(item.score ?? "-")} / ${escapeHtml(item.totalQuestions ?? "-")}</td><td>${formatDate(item.submittedAt)}</td><td><pre>${escapeHtml(JSON.stringify(item.answers || [], null, 2))}</pre></td></tr>`).join("");
  adminArea.innerHTML = `<table><thead><tr><th>Student</th><th>Class</th><th>Subject</th><th>Topic</th><th>Test</th><th>Score</th><th>Submitted</th><th>Answers</th></tr></thead><tbody>${rows}</tbody></table>`;
}

async function loadAllAttempts() {
  adminArea.textContent = "Loading results...";
  const snapshot = await getDocs(collection(db, "testAttempts"));
  renderAttempts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/login.html?redirect=/admin-dashboard.html";
    return;
  }
  const email = (user.email || "").toLowerCase();
  adminInfo.textContent = `${user.displayName || "Admin"} - ${user.email || ""}`;
  if (email !== ADMIN_EMAIL.toLowerCase()) {
    adminArea.innerHTML = `<p class="danger">Access denied. This page is only for the Xohopathi admin account.</p>`;
    return;
  }
  try {
    await loadAllAttempts();
  } catch (error) {
    console.error(error);
    adminArea.textContent = "Could not load results. Please check Firestore rules.";
  }
});

refreshBtn.addEventListener("click", loadAllAttempts);
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/login.html";
});