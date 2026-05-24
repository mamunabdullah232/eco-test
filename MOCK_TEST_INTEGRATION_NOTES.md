# Xohopathi Firebase Mock Test Integration

Created files:

- `firebase-config.js`
- `login.html`
- `login.js`
- `auth-guard.js`
- `save-attempt.js`
- `student-dashboard.html`
- `student-dashboard.js`
- `admin-dashboard.html`
- `admin-dashboard.js`
- `firestore-rules.txt`

Current behavior:

- Class 10 English Grammar tests opened through `mock-test.html?file=mock-tests/class-10/english/grammar/test1.json` require Google login.
- After submit, the attempt is saved to Firestore collection `testAttempts`.
- Students can view their own attempts at `/student-dashboard.html`.
- Admin account `mamunabdullah262@gmail.com` can view all attempts at `/admin-dashboard.html`.

Firebase Console steps:

1. Enable Authentication -> Sign-in method -> Google.
2. Add authorized domains:
   - `xohopathi.in`
   - `www.xohopathi.in`
3. Create Firestore database.
4. Paste the contents of `firestore-rules.txt` into Firestore -> Rules -> Publish.
