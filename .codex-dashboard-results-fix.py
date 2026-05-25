from pathlib import Path

# firebase-config.js
path = Path('firebase-config.js')
text = path.read_text(encoding='utf-8')
text = text.replace('export const ADMIN_EMAIL = "mamunabdullah262@gmail.com";', '''export const ADMIN_EMAILS = [
  "mamunabdullah262@gmail.com",
  "mamunabdullah232@gmail.com"
];
export const ADMIN_EMAIL = ADMIN_EMAILS[0];''')
path.write_text(text, encoding='utf-8')

# login.js
path = Path('login.js')
text = path.read_text(encoding='utf-8')
text = text.replace('  ADMIN_EMAIL\n} from "./firebase-config.js";', '  ADMIN_EMAILS\n} from "./firebase-config.js";')
text = text.replace('const role = email === ADMIN_EMAIL.toLowerCase() ? "admin" : "student";', 'const role = ADMIN_EMAILS.map(item => item.toLowerCase()).includes(email) ? "admin" : "student";')
text = text.replace('return email === ADMIN_EMAIL.toLowerCase() ? "admin" : "student";', 'return ADMIN_EMAILS.map(item => item.toLowerCase()).includes(email) ? "admin" : "student";')
path.write_text(text, encoding='utf-8')

# save-attempt.js
path = Path('save-attempt.js')
text = path.read_text(encoding='utf-8')
text = text.replace('import { auth, db, onAuthStateChanged, collection, addDoc, serverTimestamp } from "./firebase-config.js";', 'import { auth, db, onAuthStateChanged, collection, doc, addDoc, setDoc, serverTimestamp } from "./firebase-config.js";')
text = text.replace('''  const docRef = await addDoc(collection(db, "testAttempts"), attempt);
  return { saved: true, id: docRef.id };''', '''  const docRef = await addDoc(collection(db, "testAttempts"), attempt);
  setDoc(doc(db, "users", user.uid, "testAttempts", docRef.id), {
    ...attempt,
    attemptId: docRef.id
  }).catch((error) => {
    console.warn("Student attempt copy could not be saved:", error);
  });
  return { saved: true, id: docRef.id };''')
path.write_text(text, encoding='utf-8')

# student-dashboard.js
path = Path('student-dashboard.js')
text = path.read_text(encoding='utf-8')
old = '''async function loadAttempts(user) {
  attemptsArea.textContent = "Loading attempts...";
  const q = query(collection(db, "testAttempts"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);
  renderAttempts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
}'''
new = '''function mergeAttempts(groups) {
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
}'''
if old not in text:
    raise SystemExit('student-dashboard loadAttempts block not found')
text = text.replace(old, new)
path.write_text(text, encoding='utf-8')

# admin-dashboard.js
path = Path('admin-dashboard.js')
text = path.read_text(encoding='utf-8')
text = text.replace('import { auth, db, onAuthStateChanged, signOut, collection, getDocs, ADMIN_EMAIL } from "./firebase-config.js";', 'import { auth, db, onAuthStateChanged, signOut, collection, getDocs, ADMIN_EMAILS } from "./firebase-config.js";')
text = text.replace('if (email !== ADMIN_EMAIL.toLowerCase()) {', 'if (!ADMIN_EMAILS.map(item => item.toLowerCase()).includes(email)) {')
path.write_text(text, encoding='utf-8')

# firestore-rules.txt documentation
path = Path('firestore-rules.txt')
text = path.read_text(encoding='utf-8')
text = text.replace('''    function isAdmin() {
      return signedIn() && request.auth.token.email == "mamunabdullah262@gmail.com";
    }''', '''    function isAdmin() {
      return signedIn() && request.auth.token.email in [
        "mamunabdullah262@gmail.com",
        "mamunabdullah232@gmail.com"
      ];
    }''')
text = text.replace('''    match /testAttempts/{attemptId} {
      allow create: if signedIn() && request.resource.data.uid == request.auth.uid;
      allow read: if isAdmin() || (signedIn() && resource.data.uid == request.auth.uid);
      allow update, delete: if isAdmin();
    }''', '''    match /testAttempts/{attemptId} {
      allow create: if signedIn() && request.resource.data.uid == request.auth.uid;
      allow read: if isAdmin() || (signedIn() && resource.data.uid == request.auth.uid);
      allow update, delete: if isAdmin();
    }
    match /users/{userId}/testAttempts/{attemptId} {
      allow create, update: if signedIn() && request.auth.uid == userId;
      allow read: if isAdmin() || (signedIn() && request.auth.uid == userId);
      allow delete: if isAdmin();
    }''')
path.write_text(text, encoding='utf-8')
