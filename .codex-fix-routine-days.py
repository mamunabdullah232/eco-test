from pathlib import Path

options = '''<select id="routineDaySelect">
          <option value="Monday">Monday / সোমবাৰ</option>
          <option value="Tuesday">Tuesday / মঙলবাৰ</option>
          <option value="Wednesday">Wednesday / বুধবাৰ</option>
          <option value="Thursday">Thursday / বৃহস্পতিবাৰ</option>
          <option value="Friday">Friday / শুকুৰবাৰ</option>
          <option value="Saturday">Saturday / শনিবাৰ</option>
        </select>'''
old = '''<select id="routineDaySelect">
          <option value="Monday">Monday / সোমবাৰ</option>
          <option value="Tuesday">Tuesday / মঙলবাৰ</option>
        </select>'''
for filename in ['index.html', 'xohopathi_home_and_class_test/index.html']:
    path = Path(filename)
    text = path.read_text(encoding='utf-8')
    text = text.replace(old, options)
    path.write_text(text, encoding='utf-8')
