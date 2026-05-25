import { auth, db, onAuthStateChanged, signOut, collection, query, where, getDocs } from "./firebase-config.js";

const studentInfo = document.getElementById("studentInfo");
const attemptsArea = document.getElementById("attemptsArea");
const logoutBtn = document.getElementById("logoutBtn");

function formatDate(value) {
  if (!value) return "-";
  if (value.toDate) return value.toDate().toLocaleString();
  return String(value);
}

function renderAttempts(attempts) {
  if (!attempts.length) {
    attemptsArea.textContent = "No test attempts found yet.";
    return;
  }
  attempts.sort((a, b) => {
    const at = a.submittedAt?.toMillis ? a.submittedAt.toMillis() : 0;
    const bt = b.submittedAt?.toMillis ? b.submittedAt.toMillis() : 0;
    return bt - at;
  });
  const rows = attempts.map(item => `<tr><td>${item.testId || "-"}</td><td>${item.subject || "-"}</td><td>${item.topic || "-"}</td><td>${item.score ?? "-"} / ${item.totalQuestions ?? "-"}</td><td>${formatDate(item.submittedAt)}</td></tr>`).join("");
  attemptsArea.innerHTML = `<table><thead><tr><th>Test</th><th>Subject</th><th>Topic</th><th>Score</th><th>Submitted</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function mergeAttempts(groups) {
  const merged = new Map();
  groups.flat().forEach(item => {
    const key = item.id || item.attemptId || `${item.testId || ""}-${item.submittedAt?.seconds || ""}-${item.score || ""}`;
    merged.set(key, item);
  });
  return Array.from(merged.values());
}

async function readQuerySafely(queryRef) {
  try {
    const snapshot = await getDocs(queryRef);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Attempt query failed:", error);
    return [];
  }
}

async function loadAttempts(user) {
  attemptsArea.textContent = "Loading attempts...";
  const email = (user.email || "").toLowerCase();
  const byUid = query(collection(db, "testAttempts"), where("uid", "==", user.uid));
  const byEmail = email ? query(collection(db, "testAttempts"), where("email", "==", email)) : null;
  const ownCopy = collection(db, "users", user.uid, "testAttempts");
  const attempts = await Promise.all([
    readQuerySafely(byUid),
    byEmail ? readQuerySafely(byEmail) : Promise.resolve([]),
    readQuerySafely(ownCopy)
  ]);
  renderAttempts(mergeAttempts(attempts));
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "./login.html?redirect=./student-dashboard.html";
    return;
  }
  studentInfo.textContent = `${user.displayName || "Student"} - ${user.email || ""}`;
  try {
    await loadAttempts(user);
  } catch (error) {
    console.error(error);
    attemptsArea.textContent = "Could not load attempts. Please check Firestore rules.";
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./login.html";
});