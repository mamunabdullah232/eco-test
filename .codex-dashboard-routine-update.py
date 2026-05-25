from pathlib import Path
import re

path = Path('xohopathi_home_and_class_test/index.html')
text = path.read_text(encoding='utf-8')

# Teacher routine label and subtitle cleanup
text = text.replace('Class Routine JHSS / শ্ৰেণী সূচী', 'Jaluguti HS School (Class Routine)')
text = text.replace('<small>Teacher-wise assigned periods / শিক্ষকভিত্তিক পাঠদানৰ সময়সূচী</small>', '')
text = text.replace('<h2 id="routineTitle">Class Routine JHSS</h2>', '<h2 id="routineTitle">Jaluguti HS School (Class Routine)</h2>')

# Assamese-only rotating fact block
text = text.replace('<h1 id="did-you-know-title"><span class="bi">Did you know?<span class="as">আপুনি জানেনে?</span></span></h1>', '<h1 id="did-you-know-title">তুমি জানানে?</h1>')
text = text.replace('<span class="fact-date" id="factDate">Today</span>', '<span class="fact-date" id="factDate">প্ৰতি ৫ মিনিটত নতুন তথ্য</span>')

facts_block = '''const facts = [
  "অক্টোপাছৰ তিনিটা হৃদয় থাকে, আৰু ইয়াৰ তেজ নীলা ৰঙৰ।",
  "শুক্ৰ গ্ৰহত এটা দিন, শুক্ৰ গ্ৰহৰ এটা বছৰতকৈও দীঘল।",
  "গ্ৰীষ্মকালত আইফেল টাৱাৰ অলপ ওখ হৈ যায়, কাৰণ তাপত ধাতু প্ৰসাৰিত হয়।",
  "পখিলাই নিজৰ ভৰিৰে সোৱাদ অনুভৱ কৰিব পাৰে।",
  "শব্দ বায়ুতকৈ পানীত প্ৰায় চাৰি গুণ বেছি বেগেৰে গতি কৰে।",
  "কাটি থোৱা ঘাঁহৰ সতেজ গোন্ধটো আচলতে উদ্ভিদৰ এক প্ৰকাৰৰ বিপদ সংকেত।",
  "নীলা তিমিৰ হৃদয় ইমান ডাঙৰ যে ইয়াৰ ৰক্তনলীৰ ভিতৰে এটা সৰু শিশু সোমাই যাব পাৰে।",
  "প্ৰথম কম্পিউটাৰ মাউছ কাঠেৰে বনোৱা হৈছিল।",
  "বিজুলী সূৰ্যৰ পৃষ্ঠতকৈও অধিক উষ্ণ।",
  "চন্দ্ৰ বছৰি অলপ অলপকৈ পৃথিৱীৰ পৰা আঁতৰি গৈ আছে।"
];

const factImages = [
  {src:"https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1000&q=80", alt:"অক্টোপাছ"},
  {src:"https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1000&q=80", alt:"শুক্ৰ গ্ৰহ"},
  {src:"https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1000&q=80", alt:"আইফেল টাৱাৰ"},
  {src:"https://images.unsplash.com/photo-1552410260-0fd9b577afa6?auto=format&fit=crop&w=1000&q=80", alt:"পখিলা"},
  {src:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80", alt:"পানীৰ ঢৌ"},
  {src:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80", alt:"ঘাঁহনি"},
  {src:"https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1000&q=80", alt:"নীলা তিমি"},
  {src:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80", alt:"কম্পিউটাৰ"},
  {src:"https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1000&q=80", alt:"বিজুলী"},
  {src:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=80", alt:"চন্দ্ৰ"}
];'''
text = re.sub(r'const facts = \[[\s\S]*?\];\s*const factImages = \[[\s\S]*?\];', facts_block, text, count=1)

render_fact = '''function renderFact(){
  const intervalMs = 5 * 60 * 1000;
  const index = Math.floor(Date.now() / intervalMs) % facts.length;
  const fact = facts[index];
  const image = factImages[index % factImages.length];
  const factImage = document.getElementById("factImage");
  factImage.src = image.src;
  factImage.alt = image.alt;
  document.getElementById("factDate").textContent = "প্ৰতি ৫ মিনিটত নতুন তথ্য";
  document.getElementById("factTitle").textContent = "তুমি জানানে?";
  document.getElementById("factText").textContent = fact;
}

let routineRefreshTimer = null;'''
text = re.sub(r'function renderFact\(\)\{[\s\S]*?\}\s*\n\s*let routineRefreshTimer = null;', render_fact, text, count=1)

if 'window.setInterval(renderFact, 5 * 60 * 1000);' not in text:
    text = text.replace('renderFact();', 'renderFact();\nwindow.setInterval(renderFact, 5 * 60 * 1000);', 1)

alias_block = '''const teacherAliasMap = {
  "PD":"P. Devi",
  "P.D.":"P. Devi",
  "P.D":"P. Devi",
  "AH":"A. Hoque",
  "A.H.":"A. Hoque",
  "A.H":"A. Hoque",
  "BS":"B. Saikia",
  "B.S.":"B. Saikia",
  "B.S":"B. Saikia",
  "MS":"M. Saikia",
  "M.S.":"M. Saikia",
  "M.S":"M. Saikia"
};

function expandTeacherName(name){
  const normalized = String(name).trim();
  const compact = normalized.replace(/\s+/g, "");
  const noDots = compact.replace(/\./g, "");
  return teacherAliasMap[compact] || teacherAliasMap[noDots] || normalized;
}

function teacherListText(teachers){
  return teachers.map(expandTeacherName).join(" / ");
}

'''
if 'const teacherAliasMap' not in text:
    text = text.replace('const jhssAssignments = jhssRoutineRows.flatMap(function(row){', alias_block + 'const jhssAssignments = jhssRoutineRows.flatMap(function(row){')
text = text.replace('return {teacher:teacher, className:row.className, period:index + 1, subject:period[0]};', 'return {teacher:expandTeacherName(teacher), className:row.className, period:index + 1, subject:period[0]};')
text = text.replace('<small>${routineText(item.teachers.join(" / "))}</small>', '<small>${routineText(teacherListText(item.teachers))}</small>')

path.write_text(text, encoding='utf-8')
