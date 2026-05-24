from pathlib import Path

index_path = Path("index.html")
index = index_path.read_text(encoding="utf-8")
index = index.replace("min-height:138px;", "min-height:96px;")
index = index.replace("  border-top:6px solid var(--blue);\n}", "  border-top:6px solid var(--blue);\n  align-content:center;\n  text-align:center;\n}", 1)
index = index.replace("  justify-self:start;\n}", "  justify-self:center;\n}", 1)
index = index.replace('''        <a class="home-login-card" href="/login.html?redirect=/student-dashboard.html">
          <strong>Student Login / শিক্ষাৰ্থী লগইন</strong>
          <p>Optional login for saving English Grammar mock-test attempts and viewing previous results.</p>
          <span class="badge green">View My Results / ফলাফল চাওক</span>
        </a>
        <a class="home-login-card admin" href="/login.html?redirect=/admin-dashboard.html">
          <strong>Admin Login / এডমিন লগইন</strong>
          <p>View student participation, scores, submitted dates, and answer details from the dashboard.</p>
          <span class="badge">Open Admin Dashboard / এডমিন খোলক</span>
        </a>
''', '''        <a class="home-login-card" href="/login.html?redirect=/student-dashboard.html">
          <strong>Student Login / শিক্ষাৰ্থী লগইন</strong>
        </a>
        <a class="home-login-card admin" href="/login.html?redirect=/admin-dashboard.html">
          <strong>Admin Login / এডমিন লগইন</strong>
        </a>
''')
index_path.write_text(index, encoding="utf-8")

login_path = Path("login.js")
login = login_path.read_text(encoding="utf-8")
login = login.replace("  getRedirectResult,\n  doc,", "  getRedirectResult,\n  onAuthStateChanged,\n  doc,")
login = login.replace('''rememberRedirect();

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
''', '''rememberRedirect();

let loginFinished = false;

async function handleSignedInUser(user) {
  if (!user || loginFinished) return;
  loginFinished = true;
  statusText.textContent = "Login successful. Opening dashboard...";
  const role = await saveUser(user);
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
''')
login_path.write_text(login, encoding="utf-8")

Path(".tmp-fix-login-loop.py").unlink(missing_ok=True)
Path(".github/workflows/codex-fix-login-loop.yml").unlink(missing_ok=True)
