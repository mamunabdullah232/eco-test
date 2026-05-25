from pathlib import Path
import re

app = Path('xohopathi_home_and_class_test/index.html')
text = app.read_text(encoding='utf-8')

# Stronger colorful top navigation and blinking new badge.
css_insert = '''
.nav-link.student-login{--accent:#0891b2}
.nav-link.admin-login{--accent:#7c3aed}
.new-blink{
  display:inline-flex;
  align-items:center;
  margin-left:8px;
  padding:3px 8px;
  border-radius:999px;
  background:#ef4444;
  color:#fff;
  font-size:.72rem;
  font-weight:900;
  animation:newBlink 1s infinite;
}
@keyframes newBlink{
  0%,100%{opacity:1;transform:scale(1)}
  50%{opacity:.35;transform:scale(.94)}
}
.routine-notice{
  margin:0 0 16px;
  padding:13px 14px;
  border:1px solid #fde68a;
  border-radius:13px;
  background:#fffbeb;
  color:#78350f;
  font-size:.9rem;
  font-weight:800;
}
'''
if '.nav-link.student-login' not in text:
    text = text.replace('.nav-link.contact{--accent:var(--violet)}', '.nav-link.contact{--accent:var(--violet)}' + css_insert)

# Make mobile/top nav buttons visually colorful by default.
old_nav_css = '''.nav-link{
  --accent:var(--blue);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:38px;
  padding:8px 12px;
  border-radius:12px;
  border:1px solid transparent;
  color:#334155;
}'''
new_nav_css = '''.nav-link{
  --accent:var(--blue);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:38px;
  padding:8px 12px;
  border-radius:12px;
  border:1px solid color-mix(in srgb, var(--accent) 22%, white);
  color:var(--accent);
  background:color-mix(in srgb, var(--accent) 10%, white);
}'''
text = text.replace(old_nav_css, new_nav_css)

# Remove Mock Test from top nav and add login links there.
mock_nav = '      <a class="nav-link mock nav-route" href="#mock-tests" data-page="mock-tests"><span class="bi">Mock Test<span class="as">মক টেষ্ট</span></span></a>\n'
text = text.replace(mock_nav, '')
materials_nav = '      <a class="nav-link materials nav-route" href="#study-materials" data-page="study-materials"><span class="bi">Study Materials<span class="as">অধ্যয়ন সামগ্ৰী</span></span></a>\n'
login_nav = materials_nav + '      <a class="nav-link student-login" href="/login.html?redirect=/student-dashboard.html"><span class="bi">Student Login<span class="as">শিক্ষাৰ্থী লগইন</span></span></a>\n      <a class="nav-link admin-login" href="/login.html?redirect=/admin-dashboard.html"><span class="bi">Admin Login<span class="as">এডমিন লগইন</span></span></a>\n'
if 'nav-link student-login' not in text:
    text = text.replace(materials_nav, login_nav)

# Teacher routine label with blinking New.
text = text.replace('<span><strong>Jaluguti HS School (Class Routine)</strong></span>', '<span><strong>Jaluguti HS School (Class Routine) <span class="new-blink">New</span></strong></span>')

# Add class routine notice in the modal if absent.
notice = '''
    <div class="routine-notice">
      Class Routine Notice: The routine from Monday to Thursday will remain the same. On Friday, leisure will start at 12:00 Noon and continue till 1:15 PM. After leisure, regular classes will continue from 1:15 PM to 3:30 PM. On Friday, regular classes will be held during the final period instead of Co-Curricular Activities. On Saturday, the school will run only up to the 5th period.
    </div>
'''
if 'Class Routine Notice:' not in text:
    text = text.replace('    <div class="routine-legend" aria-label="Period colour status">', notice + '\n    <div class="routine-legend" aria-label="Period colour status">')

# Make all fact image URLs query-based and clearly related.
related_images = '''const factImages = [
  {src:"https://source.unsplash.com/1000x700/?octopus", alt:"অক্টোপাছ"},
  {src:"https://source.unsplash.com/1000x700/?venus,planet", alt:"শুক্ৰ গ্ৰহ"},
  {src:"https://source.unsplash.com/1000x700/?eiffel,tower", alt:"আইফেল টাৱাৰ"},
  {src:"https://source.unsplash.com/1000x700/?butterfly", alt:"পখিলা"},
  {src:"https://source.unsplash.com/1000x700/?underwater,waves", alt:"পানী"},
  {src:"https://source.unsplash.com/1000x700/?grass,lawn", alt:"ঘাঁহনি"},
  {src:"https://source.unsplash.com/1000x700/?blue,whale", alt:"নীলা তিমি"},
  {src:"https://source.unsplash.com/1000x700/?computer,mouse", alt:"কম্পিউটাৰ মাউছ"},
  {src:"https://source.unsplash.com/1000x700/?lightning", alt:"বিজুলী"},
  {src:"https://source.unsplash.com/1000x700/?moon", alt:"চন্দ্ৰ"}
];'''
text = re.sub(r'const factImages = \[[\s\S]*?\];', related_images, text, count=1)

# Day-specific routine periods.
period_block = '''const routinePeriodsByDay = {
  Monday:[
    {number:1, label:"1st Period", time:"09:15 AM - 10:00 AM", start:555, end:600, sourceIndex:0},
    {number:2, label:"2nd Period", time:"10:00 AM - 10:40 AM", start:600, end:640, sourceIndex:1},
    {number:3, label:"3rd Period", time:"10:40 AM - 11:20 AM", start:640, end:680, sourceIndex:2},
    {number:4, label:"4th Period", time:"11:20 AM - 12:00 Noon", start:680, end:720, sourceIndex:3},
    {number:5, label:"5th Period", time:"12:00 Noon - 12:40 PM", start:720, end:760, sourceIndex:4},
    {number:6, label:"6th Period", time:"01:15 PM - 01:55 PM", start:795, end:835, sourceIndex:5},
    {number:7, label:"7th Period", time:"01:55 PM - 02:35 PM", start:835, end:875, sourceIndex:6},
    {number:8, label:"8th Period", time:"02:35 PM - 03:30 PM", start:875, end:930, sourceIndex:7}
  ],
  Friday:[
    {number:1, label:"1st Period", time:"09:15 AM - 10:00 AM", start:555, end:600, sourceIndex:0},
    {number:2, label:"2nd Period", time:"10:00 AM - 10:40 AM", start:600, end:640, sourceIndex:1},
    {number:3, label:"3rd Period", time:"10:40 AM - 11:20 AM", start:640, end:680, sourceIndex:2},
    {number:4, label:"4th Period", time:"11:20 AM - 12:00 Noon", start:680, end:720, sourceIndex:3},
    {number:5, label:"5th Period", time:"01:15 PM - 01:55 PM", start:795, end:835, sourceIndex:5},
    {number:6, label:"6th Period", time:"01:55 PM - 02:35 PM", start:835, end:875, sourceIndex:6},
    {number:7, label:"7th / Final Period", time:"02:35 PM - 03:30 PM", start:875, end:930, sourceIndex:7}
  ],
  Saturday:[
    {number:1, label:"1st Period", time:"09:15 AM - 10:00 AM", start:555, end:600, sourceIndex:0},
    {number:2, label:"2nd Period", time:"10:00 AM - 10:40 AM", start:600, end:640, sourceIndex:1},
    {number:3, label:"3rd Period", time:"10:40 AM - 11:20 AM", start:640, end:680, sourceIndex:2},
    {number:4, label:"4th Period", time:"11:20 AM - 12:00 Noon", start:680, end:720, sourceIndex:3},
    {number:5, label:"5th Period", time:"12:00 Noon - 12:40 PM", start:720, end:760, sourceIndex:4}
  ]
};
routinePeriodsByDay.Tuesday = routinePeriodsByDay.Monday;
routinePeriodsByDay.Wednesday = routinePeriodsByDay.Monday;
routinePeriodsByDay.Thursday = routinePeriodsByDay.Monday;
const routinePeriods = routinePeriodsByDay.Monday;

function routinePeriodsForDay(dayValue){
  return routinePeriodsByDay[dayValue] || routinePeriodsByDay.Monday;
}
'''
text = re.sub(r'const routinePeriods = \[[\s\S]*?\];\s*const jhssRoutineRows =', period_block + 'const jhssRoutineRows =', text, count=1)

# Routine assignment helper for selected day.
assignment_helper = '''function routineAssignmentsForDay(dayValue){
  const periods = routinePeriodsForDay(dayValue);
  return jhssRoutineRows.flatMap(function(row){
    return periods.flatMap(function(period){
      const entry = row.periods[period.sourceIndex];
      if(!entry) return [];
      return entry[1].map(function(teacher){
        return {teacher:expandTeacherName(teacher), className:row.className, period:period.number, subject:entry[0]};
      });
    });
  });
}
'''
if 'function routineAssignmentsForDay' not in text:
    text = text.replace('const classSubjects = [', assignment_helper + '\nconst classSubjects = [')

# Update period dropdown and rendering to respect selected day.
old_populate = '''function populateRoutinePeriods(){
  const periodSelect = document.getElementById("routinePeriodSelect");
  periodSelect.innerHTML = routinePeriods.map(function(period){
    return `<option value="${period.number}">${routineText(period.label)} - ${routineText(period.time)}</option>`;
  }).join("");
}'''
new_populate = '''function populateRoutinePeriods(){
  const dayValue = document.getElementById("routineDaySelect").value || "Monday";
  const periods = routinePeriodsForDay(dayValue);
  const periodSelect = document.getElementById("routinePeriodSelect");
  const previousValue = periodSelect.value;
  periodSelect.innerHTML = periods.map(function(period){
    return `<option value="${period.number}">${routineText(period.label)} - ${routineText(period.time)}</option>`;
  }).join("");
  if(periods.some(function(period){ return String(period.number) === previousValue; })){
    periodSelect.value = previousValue;
  }
}'''
text = text.replace(old_populate, new_populate)

text = text.replace('function renderRoutineByTime(output, day){\n  const periodNumber = Number(document.getElementById("routinePeriodSelect").value || 1);\n  const period = routinePeriods.find(function(item){ return item.number === periodNumber; }) || routinePeriods[0];\n  const allocations = jhssRoutineRows.map(function(row){\n    const entry = row.periods[period.number - 1];', 'function renderRoutineByTime(output, day, dayValue){\n  const periods = routinePeriodsForDay(dayValue);\n  const periodNumber = Number(document.getElementById("routinePeriodSelect").value || 1);\n  const period = periods.find(function(item){ return item.number === periodNumber; }) || periods[0];\n  const allocations = jhssRoutineRows.map(function(row){\n    const entry = row.periods[period.sourceIndex];')
text = text.replace('    renderRoutineByTime(output, day);', '    renderRoutineByTime(output, day, daySelect.value);')
text = text.replace('  const assignments = jhssAssignments.filter(function(item){\n    return item.teacher === teacher;\n  });\n  const periodColumns = routinePeriods.map(function(period){', '  const assignments = routineAssignmentsForDay(daySelect.value).filter(function(item){\n    return item.teacher === teacher;\n  });\n  const periodColumns = routinePeriodsForDay(daySelect.value).map(function(period){')
text = text.replace('document.getElementById("routineDaySelect").addEventListener("change", renderRoutine);', 'document.getElementById("routineDaySelect").addEventListener("change", function(){ populateRoutinePeriods(); renderRoutine(); });')

app.write_text(text, encoding='utf-8')
Path('index.html').write_text(text, encoding='utf-8')
