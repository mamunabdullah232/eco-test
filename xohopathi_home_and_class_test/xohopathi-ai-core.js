const DAY_ORDER = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const ROUTINE_PERIODS_BY_DAY = {
  Monday: [
    { number: 1, label: "1st Period", time: "09:15 AM - 10:00 AM", sourceIndex: 0 },
    { number: 2, label: "2nd Period", time: "10:00 AM - 10:40 AM", sourceIndex: 1 },
    { number: 3, label: "3rd Period", time: "10:40 AM - 11:20 AM", sourceIndex: 2 },
    { number: 4, label: "4th Period", time: "11:20 AM - 12:00 Noon", sourceIndex: 3 },
    { number: 5, label: "5th Period", time: "12:00 Noon - 12:40 PM", sourceIndex: 4 },
    { number: 6, label: "6th Period", time: "01:15 PM - 01:55 PM", sourceIndex: 5 },
    { number: 7, label: "7th Period", time: "01:55 PM - 02:35 PM", sourceIndex: 6 },
    { number: 8, label: "8th Period", time: "02:35 PM - 03:30 PM", sourceIndex: 7 }
  ],
  Friday: [
    { number: 1, label: "1st Period", time: "09:15 AM - 10:00 AM", sourceIndex: 0 },
    { number: 2, label: "2nd Period", time: "10:00 AM - 10:40 AM", sourceIndex: 1 },
    { number: 3, label: "3rd Period", time: "10:40 AM - 11:20 AM", sourceIndex: 2 },
    { number: 4, label: "4th Period", time: "11:20 AM - 12:00 Noon", sourceIndex: 3 },
    { number: 5, label: "5th Period", time: "01:15 PM - 01:55 PM", sourceIndex: 4 },
    { number: 6, label: "6th Period", time: "01:55 PM - 02:35 PM", sourceIndex: 5 },
    { number: 7, label: "7th / Final Period", time: "02:35 PM - 03:30 PM", sourceIndex: 6 }
  ],
  Saturday: [
    { number: 1, label: "1st Period", time: "09:15 AM - 10:00 AM", sourceIndex: 0 },
    { number: 2, label: "2nd Period", time: "10:00 AM - 10:40 AM", sourceIndex: 1 },
    { number: 3, label: "3rd Period", time: "10:40 AM - 11:20 AM", sourceIndex: 2 },
    { number: 4, label: "4th Period", time: "11:20 AM - 12:00 Noon", sourceIndex: 3 },
    { number: 5, label: "5th Period", time: "12:00 Noon - 12:40 PM", sourceIndex: 4 }
  ]
};

ROUTINE_PERIODS_BY_DAY.Tuesday = ROUTINE_PERIODS_BY_DAY.Monday;
ROUTINE_PERIODS_BY_DAY.Wednesday = ROUTINE_PERIODS_BY_DAY.Monday;
ROUTINE_PERIODS_BY_DAY.Thursday = ROUTINE_PERIODS_BY_DAY.Monday;

export const ROUTINE_ROWS = [
  { className: "XII", periods: [["MIL", ["I. Yogi"]], ["Eng.", ["A. Bordoloi"]], ["Education", ["D. Das"]], ["Agriculture", ["N. Dutta"]], ["Hist./Econ.", ["L. Saikia", "A. Mamun"]], ["Pol. Science", ["C. Sarkar"]], ["SWAD", ["R.L. Das"]], ["MIL", ["P. Rekha Devi"]]] },
  { className: "XI", periods: [["Eng.", ["D. Gogoi"]], ["MIL", ["P. Rekha Devi"]], ["Pol. Sc.", ["C. Sarkar"]], ["Hist./Eco./Adv. Ass.", ["L. Saikia", "A. Mamun", "I. Yogi"]], ["Educ.", ["D. Das"]], ["SWAD", ["L. Saikia"]], ["Agriculture", ["N. Dutta"]], ["Eng.", ["A. Bordoloi"]]] },
  { className: "X-A", periods: [["G. Maths", ["A. Kataki"]], ["G. Science", ["P.K. Nath"]], ["Eng.", ["R.L. Das"]], ["MIL", ["K. Borah"]], ["S. Science", ["P. Das"]], ["Elective", ["P.D.", "A.H.", "B.S."]], ["Eng.", ["D. Gogoi"]], null] },
  { className: "X-B", periods: [["Eng.", ["R.L. Das"]], ["G. Science", ["M. Islam"]], ["G. Maths", ["A. Kataki"]], ["S. Science", ["P. Das"]], ["MIL", ["K. Borah"]], ["Elective", ["M.S.", "N. Dutta"]], ["Ass.", ["I. Yogi"]], null] },
  { className: "IX-A", periods: [["Eng.", ["M. Devnath"]], ["MIL", ["S. Bora"]], ["G. Maths", ["R. Islam"]], ["S. Science", ["B. Hussain"]], ["Elective", ["B. Roy", "A. Hoque"]], ["G. Science", ["P.K. Nath"]], ["S. Science", ["D. Das"]], null] },
  { className: "IX-B", periods: [["S. Science", ["B. Hussain"]], ["Eng.", ["D. Gogoi"]], ["G. Maths", ["M.K. Saikia"]], ["MIL", ["P. Rekha Devi"]], ["Elective", ["N. Dutta"]], ["G. Science", ["R. Devi"]], ["Ass.", ["K. Borah"]], null] },
  { className: "IX-C", periods: [["G. Maths", ["R. Islam"]], ["G. Science", ["R. Devi"]], ["Eng.", ["M. Devnath"]], ["MIL", ["S. Bora"]], ["Elective", ["M. Saikia", "L. Devi"]], ["S. Science", ["B. Hussain"]], ["Eng.", ["B. Thakuria"]], null] },
  { className: "VIII-A", periods: [["Eng.", ["B. Thakuria"]], ["Ass.", ["L. Devi"]], ["Hindi", ["B. Roy"]], ["G. Maths", ["M. Saikia"]], ["S. Science", ["B. Devi"]], ["G. Science", ["J. Begum"]], ["S. Science", ["T. Nasrin"]], null] },
  { className: "VIII-B", periods: [["G. Maths", ["M. Saikia"]], ["G. Science", ["J. Begum"]], ["Hindi", ["P. Pator"]], ["Eng.", ["A. Bordoloi"]], ["S. Science", ["B. Deka"]], ["Ass.", ["S. Bora"]], ["S. Science", ["B. Saikia"]], null] },
  { className: "VII-A", periods: [["G. Maths", ["M.K. Saikia"]], ["Eng.", ["B. Devi"]], ["G. Science", ["P.K. Nath"]], ["Ass.", ["A. Hoque"]], ["Hindi", ["P. Pator"]], ["S. Science", ["B. Deka"]], ["G. Maths", ["M.K. Saikia"]], null] },
  { className: "VII-B", periods: [["Eng.", ["A. Mamun"]], ["S. Science", ["B. Saikia"]], ["Ass.", ["T. Nasrin"]], ["G. Science", ["M. Islam"]], ["G. Maths", ["M.K. Saikia"]], ["Hindi", ["B. Roy"]], ["S. Science", ["B. Deka"]], null] },
  { className: "VI-A", periods: [["Eng.", ["P. Das"]], ["S. Science", ["B. Deka"]], ["Hindi", ["P. Devi"]], ["G. Science", ["R. Devi"]], ["G. Maths", ["R. Islam"]], ["Ass.", ["L. Devi"]], ["G. Science", ["P.K. Nath"]], null] },
  { className: "VI-B", periods: [["G. Science", ["R. Devi"]], ["Hindi", ["P. Pator"]], ["G. Maths", ["B. Thakuria"]], ["S. Science", ["B. Saikia"]], ["Eng.", ["M. Devnath"]], ["Ass.", ["K. Borah"]], ["G. Science", ["M. Islam"]], null] },
  { className: "VI-C", periods: [["G. Maths", ["M. Islam"]], ["Ass.", ["T. Nasrin"]], ["Eng.", ["B. Devi"]], ["G. Science", ["J. Begum"]], ["S. Science", ["T. Nasrin"]], ["Hindi", ["P. Pator"]], ["S. Science", ["C. Sarkar"]], null] }
];

const ROUTINE_NAME_MAP = {
  "a mamun": "Abdullah Al Mamun", "i yogi": "Ivy Yogi", "d das": "Dhunumoni Das",
  "l saikia": "Layanika Saikia", "c sarkar": "Chandana Sarkar", "rl das": "Rajib Lochan Das",
  "p rekha devi": "Priti Rekha Devi", "a kataki": "Afzal Kataki", "k borah": "Kangkanmoni Borah",
  "p das": "Pankaj Das", "a hoque": "Azizul Hoque", "b roy": "Bobita Roy",
  "d gogoi": "Drishti Gogoi", "b thakuria": "Bhabesh Thakuria", "r islam": "Rafiqul Islam",
  "s bora": "Simanta Kumar Bora", "b hussain": "Bipul Hussain", "m islam": "Marvina Islam",
  "j begum": "Julfiara Begum", "p pator": "Parmita Patar", "t nasrin": "Tasmina Nasrin",
  "b deka": "Bhumika Deka", "b saikia": "Budhen Chandra Saikia", "mk saikia": "Mrinal Kumar Saikia",
  "m saikia": "Mayur Krishna Saikia", "m devnath": "Mukti Dev Nath", "r devi": "Rimi Devi",
  "p devi": "Purabi Devi", "b devi": "Bandita Devi", "l devi": "Lakshi Devi",
  "pd": "Purabi Devi", "ah": "Azizul Hoque", "bs": "Budhen Chandra Saikia", "ms": "Mayur Krishna Saikia"
};

const SUBJECT_PATTERNS = [
  { name: "Political Science", test: /\b(?:political science|pol sc|politics)\b/ },
  { name: "Social Science", test: /\b(?:social science|s science)\b/ },
  { name: "General Mathematics", test: /\b(?:general math(?:s|ematics)?|g maths?)\b/ },
  { name: "General Science", test: /\b(?:general science|g science)\b/ },
  { name: "Economics", test: /\b(?:economics|economic|econ|eco)\b/ },
  { name: "History", test: /\b(?:history|hist)\b/ },
  { name: "Education", test: /\b(?:education|educ)\b/ },
  { name: "Agriculture", test: /\bagriculture\b/ },
  { name: "Assamese", test: /\b(?:assamese|mil|ass)\b/ },
  { name: "English", test: /\b(?:english|eng)\b/ },
  { name: "Hindi", test: /\bhindi\b/ },
  { name: "Mathematics", test: /\b(?:mathematics|maths|math)\b/ },
  { name: "Science", test: /\bscience\b/ },
  { name: "Elective", test: /\belective\b/ },
  { name: "SWAD", test: /\bswad\b/ }
];

const CLASS_PATTERNS = [
  { name: "XII", test: /\b(?:class|grade|standard|std)?\s*(?:12|xii)\b/ },
  { name: "XI", test: /\b(?:class|grade|standard|std)?\s*(?:11|xi)\b/ },
  { name: "X-A", test: /\b(?:class|grade|standard|std)?\s*(?:10|x)\s*(?:a|section a)\b/ },
  { name: "X-B", test: /\b(?:class|grade|standard|std)?\s*(?:10|x)\s*(?:b|section b)\b/ },
  { name: "X", test: /\b(?:class|grade|standard|std)\s*(?:10|x)\b/ },
  { name: "IX-A", test: /\b(?:class|grade|standard|std)?\s*(?:9|ix)\s*(?:a|section a)\b/ },
  { name: "IX-B", test: /\b(?:class|grade|standard|std)?\s*(?:9|ix)\s*(?:b|section b)\b/ },
  { name: "IX-C", test: /\b(?:class|grade|standard|std)?\s*(?:9|ix)\s*(?:c|section c)\b/ },
  { name: "IX", test: /\b(?:class|grade|standard|std)\s*(?:9|ix)\b/ },
  { name: "VIII-A", test: /\b(?:class|grade|standard|std)?\s*(?:8|viii)\s*(?:a|section a)\b/ },
  { name: "VIII-B", test: /\b(?:class|grade|standard|std)?\s*(?:8|viii)\s*(?:b|section b)\b/ },
  { name: "VIII", test: /\b(?:class|grade|standard|std)\s*(?:8|viii)\b/ },
  { name: "VII-A", test: /\b(?:class|grade|standard|std)?\s*(?:7|vii)\s*(?:a|section a)\b/ },
  { name: "VII-B", test: /\b(?:class|grade|standard|std)?\s*(?:7|vii)\s*(?:b|section b)\b/ },
  { name: "VII", test: /\b(?:class|grade|standard|std)\s*(?:7|vii)\b/ },
  { name: "VI-A", test: /\b(?:class|grade|standard|std)?\s*(?:6|vi)\s*(?:a|section a)\b/ },
  { name: "VI-B", test: /\b(?:class|grade|standard|std)?\s*(?:6|vi)\s*(?:b|section b)\b/ },
  { name: "VI-C", test: /\b(?:class|grade|standard|std)?\s*(?:6|vi)\s*(?:c|section c)\b/ },
  { name: "VI", test: /\b(?:class|grade|standard|std)\s*(?:6|vi)\b/ }
];

const NOT_AVAILABLE = "I'm sorry, that information is not available in the approved Xohopathi records.";

export function normalizeText(value) {
  return String(value ?? "").toLowerCase().replace(/ma['’]?am/g, "maam").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function cleanValue(value) {
  const text = String(value ?? "").trim();
  return !text || text === "-" ? "" : text;
}

const KNOWLEDGE_STOP_WORDS = new Set([
  "about", "after", "all", "also", "am", "an", "and", "are", "ask", "at", "be", "by", "can", "class",
  "could", "details", "do", "does", "for", "from", "give", "has", "have", "how", "i", "in", "info",
  "information", "is", "it", "know", "me", "my", "of", "on", "or", "our", "please", "school", "show",
  "tell", "the", "this", "to", "today", "tomorrow", "what", "when", "where", "which", "who", "why",
  "with", "xohopathi", "you"
]);

function splitKnowledgeValues(value) {
  if (Array.isArray(value)) return value.flatMap(splitKnowledgeValues);
  return String(value ?? "").split(/[\n,;|]+/).map(cleanValue).filter(Boolean);
}

function knowledgeTokens(value) {
  return normalizeText(value).split(" ").filter(token => token.length > 2 && !KNOWLEDGE_STOP_WORDS.has(token));
}

function containsNormalizedPhrase(haystack, needle) {
  if (!haystack || !needle) return false;
  return ` ${haystack} `.includes(` ${needle} `);
}

function normalizeKnowledgeRecord(item) {
  const question = cleanValue(item.question);
  const answer = cleanValue(item.answer);
  const category = cleanValue(item.category);
  const tags = splitKnowledgeValues(item.tags);
  const aliases = splitKnowledgeValues(item.aliases);
  const phrases = [question, category, ...tags, ...aliases].map(normalizeText).filter(Boolean);
  const tokens = [...new Set(phrases.flatMap(knowledgeTokens))];
  return {
    id: cleanValue(item.id),
    question,
    normalizedQuestion: normalizeText(question),
    answer,
    category,
    tags,
    aliases,
    phrases,
    tokens
  };
}

function scoreKnowledgeRecord(normalizedQuestion, questionTokens, record) {
  if (!normalizedQuestion || !record.normalizedQuestion || !record.answer) return 0;
  let score = 0;
  if (normalizedQuestion === record.normalizedQuestion) score += 1200;
  if (containsNormalizedPhrase(normalizedQuestion, record.normalizedQuestion)) score += 850;
  if (normalizedQuestion.length > 10 && containsNormalizedPhrase(record.normalizedQuestion, normalizedQuestion)) score += 700;

  record.aliases.map(normalizeText).filter(Boolean).forEach(alias => {
    if (normalizedQuestion === alias) score += 950;
    else if (containsNormalizedPhrase(normalizedQuestion, alias)) score += 850;
    else if (alias.length > 10 && containsNormalizedPhrase(alias, normalizedQuestion)) score += 600;
  });

  record.tags.map(normalizeText).filter(Boolean).forEach(tag => {
    if (containsNormalizedPhrase(normalizedQuestion, tag)) score += 220;
  });

  if (record.category && containsNormalizedPhrase(normalizedQuestion, normalizeText(record.category))) score += 90;

  const asked = new Set(questionTokens);
  const hits = record.tokens.filter(token => asked.has(token)).length;
  if (hits) {
    const questionCoverage = hits / Math.max(questionTokens.length, 1);
    const recordCoverage = hits / Math.max(record.tokens.length, 1);
    score += hits * 90 + Math.round(Math.max(questionCoverage, recordCoverage) * 320);
  }
  return score;
}

function findKnowledgeAnswer(question, knowledgeList) {
  const normalized = normalizeText(question);
  const tokens = knowledgeTokens(normalized);
  const scored = knowledgeList.map(record => ({
    record,
    score: scoreKnowledgeRecord(normalized, tokens, record)
  })).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
  if (!scored.length) return "";
  const [best, second] = scored;
  if (best.score >= 900 || (best.score >= 640 && (!second || best.score - second.score >= 120))) return best.record.answer;
  return "";
}

function routinePersonName(shortName) {
  return ROUTINE_NAME_MAP[normalizeText(shortName)] || String(shortName).trim();
}

function detectedDay(question, now) {
  const normalized = normalizeText(question);
  const explicit = DAY_ORDER.find(day => normalized.includes(day.toLowerCase()));
  if (explicit) return explicit;
  const formatter = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Asia/Kolkata" });
  if (normalized.includes("tomorrow")) return formatter.format(new Date(now.getTime() + 86400000));
  if (normalized.includes("today")) return formatter.format(now);
  return "";
}

function detectedClass(question) {
  const normalized = normalizeText(question);
  return CLASS_PATTERNS.find(item => item.test.test(normalized))?.name || "";
}

function detectedSubject(question) {
  const normalized = normalizeText(question);
  return SUBJECT_PATTERNS.find(item => item.test.test(normalized))?.name || "";
}

function classMatches(actual, requested) {
  if (!requested) return true;
  return actual === requested || (requested === "X" && actual.startsWith("X-")) ||
    (requested === "IX" && actual.startsWith("IX-")) || (requested === "VIII" && actual.startsWith("VIII-")) ||
    (requested === "VII" && actual.startsWith("VII-")) || (requested === "VI" && actual.startsWith("VI-"));
}

function subjectMatches(label, requested) {
  const value = normalizeText(label);
  const checks = {
    "Political Science": /\bpol(?:itical)?\s*(?:science|sc)\b/.test(value),
    "Social Science": /\bs\s*science\b|\bsocial science\b/.test(value),
    "General Mathematics": /\bg maths?\b|\bgeneral math/.test(value),
    "General Science": /\bg science\b|\bgeneral science\b/.test(value),
    Economics: /\becon?\b|\beconomics\b/.test(value),
    History: /\bhist\b|\bhistory\b/.test(value),
    Education: /\beduc\b|\beducation\b/.test(value),
    Agriculture: value.includes("agriculture"),
    Assamese: /\bmil\b|\bass\b|\bassamese\b|\badv ass\b/.test(value),
    English: /\beng\b|\benglish\b/.test(value),
    Hindi: value.includes("hindi"),
    Mathematics: value.includes("math"),
    Science: value.includes("science"),
    Elective: value.includes("elective"),
    SWAD: value.includes("swad")
  };
  return requested ? Boolean(checks[requested]) : true;
}

function routineEntries({ className = "", subject = "", day = "Monday" } = {}) {
  const periods = ROUTINE_PERIODS_BY_DAY[day] || ROUTINE_PERIODS_BY_DAY.Monday;
  return ROUTINE_ROWS.flatMap(row => periods.flatMap(period => {
    const entry = row.periods[period.sourceIndex];
    if (!entry || !classMatches(row.className, className) || !subjectMatches(entry[0], subject)) return [];
    return [{ className: row.className, subject: entry[0], teachers: entry[1].map(routinePersonName), period }];
  }));
}

function staffAliases(staff) {
  const full = normalizeText(staff.name);
  const tokens = full.split(" ").filter(Boolean);
  const aliases = new Set([full]);
  if (tokens.length) aliases.add(tokens[0]);
  if (tokens.length > 1) aliases.add(tokens.at(-1));
  if (tokens.length > 2) aliases.add(`${tokens[0]} ${tokens.at(-1)}`);
  Object.entries(ROUTINE_NAME_MAP).forEach(([shortName, fullName]) => {
    if (normalizeText(fullName) === full) aliases.add(shortName);
  });
  return [...aliases].filter(Boolean);
}

function findStaff(question, staffList) {
  const normalized = normalizeText(question);
  const scored = staffList.flatMap(staff => staffAliases(staff).flatMap(alias => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(?:^|\\s)${escaped}(?:$|\\s)`);
    return pattern.test(normalized) ? [{ staff, score: alias.split(" ").length * 100 + alias.length }] : [];
  }));
  scored.sort((a, b) => b.score - a.score);
  if (!scored.length) return { staff: null, ambiguous: [] };
  const topScore = scored[0].score;
  const top = [...new Map(scored.filter(item => item.score === topScore).map(item => [item.staff.id || item.staff.name, item.staff])).values()];
  return top.length === 1 ? { staff: top[0], ambiguous: [] } : { staff: null, ambiguous: top };
}

function routineTeacherRecords() {
  const names = new Set(routineEntries().flatMap(entry => entry.teachers));
  return [...names].sort((a, b) => a.localeCompare(b)).map(name => ({ id: normalizeText(name), name }));
}

function findRoutineTeacher(question) {
  return findStaff(question, routineTeacherRecords());
}

function staffRoutineEntries(staff, day) {
  const target = normalizeText(staff.name);
  return routineEntries({ day }).filter(entry => entry.teachers.some(name => normalizeText(name) === target));
}

function subjectSummary(staff) {
  const approved = [cleanValue(staff.appointedSubject), cleanValue(staff.additionalSubjectProficiency)].filter(Boolean);
  const routine = routineEntries().filter(entry => entry.teachers.some(name => normalizeText(name) === normalizeText(staff.name)));
  const routineSubjects = [...new Set(routine.map(entry => entry.subject))];
  const parts = [];
  if (approved.length) parts.push(`The staff directory lists ${approved.join(" and ")} for ${staff.name}.`);
  else parts.push(`The staff directory does not list an appointed subject for ${staff.name}.`);
  if (routineSubjects.length) parts.push(`The current routine shows: ${routineSubjects.join(", ")}.`);
  else parts.push("No matching class-routine assignment is available under that full name.");
  return parts.join(" ");
}

function formatRoutine(entries, day) {
  if (!entries.length) return `No assigned period is listed for ${day}.`;
  return entries.map(entry => `${entry.period.label} (${entry.period.time}): ${entry.subject}, Class ${entry.className}`).join("\n");
}

function answerSubjectQuestion(staffList, subject, className) {
  const matches = routineEntries({ className, subject });
  if (!matches.length) return NOT_AVAILABLE;
  const people = [...new Set(matches.flatMap(match => match.teachers))];
  const proficiencyMatches = people.filter(name => {
    const staff = staffList.find(item => normalizeText(item.name) === normalizeText(name));
    return staff && subjectMatches(cleanValue(staff.additionalSubjectProficiency), subject);
  });
  const scope = className ? ` in Class ${className}` : "";
  if (proficiencyMatches.length === 1) {
    const grouped = matches.find(match => match.teachers.includes(proficiencyMatches[0]));
    return `${proficiencyMatches[0]} is listed with ${subject} proficiency and appears in the ${grouped.subject} routine slot${scope}.`;
  }
  return `The current routine lists ${people.join(", ")} for ${subject}${scope}.`;
}

export function createAssistant(staffRecords = [], knowledgeRecords = []) {
  const staffList = staffRecords.map(item => ({ ...item, name: cleanValue(item.name) })).filter(item => item.name).sort((a, b) => a.name.localeCompare(b.name));
  const knowledgeList = knowledgeRecords.map(normalizeKnowledgeRecord).filter(item => item.question && item.answer);

  return {
    answer(question, now = new Date()) {
      const normalized = normalizeText(question);
      if (!normalized) return "Please type a question about a staff member or the class routine.";
      if (/^(hi|hello|hey|namaskar|namaste)\b/.test(normalized)) return "Hello! Ask me about approved teacher or staff details, contact information, subjects, or the Jaluguti HS School class routine.";

      const knowledgeAnswer = findKnowledgeAnswer(question, knowledgeList);
      if (knowledgeAnswer) return knowledgeAnswer;

      const match = findStaff(question, staffList);
      if (match.ambiguous.length) return `I found more than one matching staff member: ${match.ambiguous.map(item => item.name).join(", ")}. Please include the full name.`;
      const staff = match.staff;
      const routineMatch = staff ? { staff, ambiguous: [] } : findRoutineTeacher(question);
      const day = detectedDay(question, now);
      const className = detectedClass(question);
      const subject = detectedSubject(question);

      if (/\b(?:school timing|school time|first period|last period|final period|starts|ends)\b/.test(normalized)) {
        const routineDay = day || new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Asia/Kolkata" }).format(now);
        const periods = ROUTINE_PERIODS_BY_DAY[routineDay];
        if (!periods) return `No school routine is listed for ${routineDay}.`;
        return `${routineDay}'s listed school periods run from ${periods[0].time.split(" - ")[0]} to ${periods.at(-1).time.split(" - ")[1]}.`;
      }
      if (subject && /\b(?:who|teacher|teach|teaches|subject)\b/.test(normalized)) return answerSubjectQuestion(staffList, subject, className);
      if (className && /\b(?:routine|schedule|period|class)\b/.test(normalized)) {
        const routineDay = day || "Monday";
        if (!ROUTINE_PERIODS_BY_DAY[routineDay]) return `No school routine is listed for ${routineDay}.`;
        return `Class ${className} ${routineDay} routine:\n${formatRoutine(routineEntries({ className, day: routineDay }), routineDay)}`;
      }
      if (routineMatch.ambiguous.length && /\b(?:routine|schedule|period|class today|class tomorrow)\b/.test(normalized)) {
        return `I found more than one matching routine teacher: ${routineMatch.ambiguous.map(item => item.name).join(", ")}. Please include the full name.`;
      }
      if (routineMatch.staff && /\b(?:routine|schedule|period|class today|class tomorrow)\b/.test(normalized)) {
        const routineDay = day || new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Asia/Kolkata" }).format(now);
        if (!ROUTINE_PERIODS_BY_DAY[routineDay]) return `No school routine is listed for ${routineDay}.`;
        return `${routineMatch.staff.name}'s ${routineDay} routine:\n${formatRoutine(staffRoutineEntries(routineMatch.staff, routineDay), routineDay)}`;
      }
      if (!staffList.length) return "The approved staff directory is not available yet. Class routine and school timing questions are available now; staff contact/details require the admin import.";
      if (/\b(?:qualification|degree|education qualification|educational qualification)\b/.test(normalized)) return staff ? `Educational qualification is not included in the approved record for ${staff.name}.` : NOT_AVAILABLE;
      if (/\b(?:list|show|name)\b/.test(normalized) && /\bnon teaching\b/.test(normalized)) {
        const names = staffList.filter(item => normalizeText(item.staffType).includes("non teaching")).map(item => item.name);
        return names.length ? `Non-teaching staff: ${names.join(", ")}.` : NOT_AVAILABLE;
      }
      if (/\b(?:list|show|name)\b/.test(normalized) && /\b(?:teachers|teaching staff)\b/.test(normalized)) {
        const names = staffList.filter(item => normalizeText(item.staffType) === "teaching").map(item => item.name);
        return names.length ? `Teaching staff: ${names.join(", ")}.` : NOT_AVAILABLE;
      }
      if (staff && /\b(?:mobile|phone|contact number|telephone|number)\b/.test(normalized)) return cleanValue(staff.mobile) ? `${staff.name}'s approved mobile number is ${staff.mobile}.` : `A mobile number is not available for ${staff.name}.`;
      if (staff && /\b(?:email|mail address|e mail)\b/.test(normalized)) return cleanValue(staff.email) ? `${staff.name}'s approved email address is ${staff.email}.` : `An email address is not available for ${staff.name}.`;
      if (staff && /\b(?:subject|teach|teaches|proficiency)\b/.test(normalized)) return subjectSummary(staff);
      if (staff && /\b(?:routine|schedule|period|class today|class tomorrow)\b/.test(normalized)) {
        const routineDay = day || new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Asia/Kolkata" }).format(now);
        if (!ROUTINE_PERIODS_BY_DAY[routineDay]) return `No school routine is listed for ${routineDay}.`;
        return `${staff.name}'s ${routineDay} routine:\n${formatRoutine(staffRoutineEntries(staff, routineDay), routineDay)}`;
      }
      if (staff && /\b(?:details|information|who is|post|staff type|designation)\b/.test(normalized)) {
        const details = [cleanValue(staff.staffType), cleanValue(staff.post)].filter(Boolean).join(", ");
        return `${staff.name}${details ? ` is listed as ${details}` : " is included in the approved staff directory"}. ${subjectSummary(staff)}`;
      }
      if (staff) {
        const details = [cleanValue(staff.staffType), cleanValue(staff.post)].filter(Boolean).join(", ");
        return `${staff.name}${details ? ` is listed as ${details}` : " is included in the approved staff directory"}.`;
      }
      return NOT_AVAILABLE;
    }
  };
}
