from pathlib import Path

index_path = Path('index.html')
text = index_path.read_text(encoding='utf-8')

old_friday = '''  Friday:[
    {number:1, label:"1st Period", time:"09:15 AM - 10:00 AM", start:555, end:600, sourceIndex:0},
    {number:2, label:"2nd Period", time:"10:00 AM - 10:40 AM", start:600, end:640, sourceIndex:1},
    {number:3, label:"3rd Period", time:"10:40 AM - 11:20 AM", start:640, end:680, sourceIndex:2},
    {number:4, label:"4th Period", time:"11:20 AM - 12:00 Noon", start:680, end:720, sourceIndex:3},
    {number:5, label:"5th Period", time:"01:15 PM - 01:55 PM", start:795, end:835, sourceIndex:5},
    {number:6, label:"6th Period", time:"01:55 PM - 02:35 PM", start:835, end:875, sourceIndex:6},
    {number:7, label:"7th / Final Period", time:"02:35 PM - 03:30 PM", start:875, end:930, sourceIndex:7}
  ],'''
new_friday = '''  Friday:[
    {number:1, label:"1st Period", time:"09:15 AM - 10:00 AM", start:555, end:600, sourceIndex:0},
    {number:2, label:"2nd Period", time:"10:00 AM - 10:40 AM", start:600, end:640, sourceIndex:1},
    {number:3, label:"3rd Period", time:"10:40 AM - 11:20 AM", start:640, end:680, sourceIndex:2},
    {number:4, label:"4th Period", time:"11:20 AM - 12:00 Noon", start:680, end:720, sourceIndex:3},
    {number:5, label:"5th Period", time:"01:15 PM - 01:55 PM", start:795, end:835, sourceIndex:4},
    {number:6, label:"6th Period", time:"01:55 PM - 02:35 PM", start:835, end:875, sourceIndex:5},
    {number:7, label:"7th / Final Period", time:"02:35 PM - 03:30 PM", start:875, end:930, sourceIndex:6}
  ],'''
if old_friday not in text:
    raise SystemExit('Friday routine block not found')
text = text.replace(old_friday, new_friday, 1)

old_class9 = '''        <div class="card">
          <div class="card-mark">IX</div>
          <h3>Class 9 / শ্ৰেণী ৯</h3>
          <p>Class test links will be updated here. / শ্ৰেণী টেষ্টৰ লিংক ইয়াতে আপডেট কৰা হ’ব।</p>
          <span class="badge amber">Coming Soon / শীঘ্ৰে</span>
        </div>'''
new_class9 = '''        <div class="card">
          <div class="card-mark">IX</div>
          <h3>Class 9 / শ্ৰেণী ৯</h3>
          <p>Class 9 classroom test is available. / শ্ৰেণী ৯-ৰ শ্ৰেণী টেষ্ট উপলব্ধ।</p>
          <a class="badge green" href="/class-tests/class-9/" target="_blank" rel="noopener noreferrer">Open / খোলক</a>
        </div>'''
if old_class9 not in text:
    raise SystemExit('Class 9 class-test card not found')
text = text.replace(old_class9, new_class9, 1)
index_path.write_text(text, encoding='utf-8')

src = Path('xohopathi_home_and_class_test/class-tests/class-9/index.html')
dst = Path('class-tests/class-9/index.html')
if not src.exists():
    raise SystemExit('Source Class 9 class test not found')
dst.parent.mkdir(parents=True, exist_ok=True)
dst.write_text(src.read_text(encoding='utf-8'), encoding='utf-8')
