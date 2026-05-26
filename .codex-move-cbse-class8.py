from pathlib import Path
import json

root = Path('.')
index_path = root / 'index.html'
text = index_path.read_text(encoding='utf-8')

# Rename the temporary Class 10 CBSE board helpers to Class 8 CBSE helpers.
replacements = {
    'class10SebaBoard': 'class8SebaBoard',
    'class10CbseBoard': 'class8CbseBoard',
    'isClass10CbseSocialScience': 'isClass8CbseSocialScience',
    'class10CbseSocialScienceTestFile': 'class8CbseSocialScienceTestFile',
    'class-10__cbse__social-science__chapter-[1-2]-': 'class-8__cbse__social-science__chapter-[1-2]-',
    'mock-tests/class-10/cbse/social-science/chapter-': 'mock-tests/class-8/cbse/social-science/chapter-',
}
for old, new in replacements.items():
    text = text.replace(old, new)

old_block = '''    subjects:className === "Class 10"
      ? [class8SebaBoard, class8CbseBoard]
      : className === "Class 9"
        ? [juniorMockSubjects[0], class9SocialScience]
        : juniorMockSubjects'''
new_block = '''    subjects:className === "Class 10"
      ? [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience]
      : className === "Class 9"
        ? [juniorMockSubjects[0], class9SocialScience]
        : className === "Class 8"
          ? [class8SebaBoard, class8CbseBoard]
          : juniorMockSubjects'''
if old_block not in text:
    raise SystemExit('Expected mockClassGroups Class 10 CBSE block was not found')
text = text.replace(old_block, new_block, 1)

old_assign = 'class8SebaBoard.subjects = [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience];'
new_assign = 'class8SebaBoard.subjects = juniorMockSubjects;'
if old_assign in text:
    text = text.replace(old_assign, new_assign, 1)
else:
    raise SystemExit('Expected SEBA assignment was not found')

index_path.write_text(text, encoding='utf-8')

src_root = root / 'mock-tests' / 'class-10' / 'cbse' / 'social-science'
dst_root = root / 'mock-tests' / 'class-8' / 'cbse' / 'social-science'
if not src_root.exists():
    raise SystemExit('Source CBSE Class 10 Social Science folder not found')

for src in sorted(src_root.glob('chapter-*/test-*.json')):
    rel = src.relative_to(src_root)
    dst = dst_root / rel
    dst.parent.mkdir(parents=True, exist_ok=True)
    data = json.loads(src.read_text(encoding='utf-8'))
    data['className'] = {'en': 'Class 8 CBSE', 'as': 'শ্ৰেণী ৮ CBSE'}
    if 'displayTitle' in data:
        data['displayTitle'] = data['displayTitle'].replace('CBSE Class 10', 'CBSE Class 8')
    dst.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    src.unlink()

# Clean old generated helper files from the previous transfer.
for helper in root.glob('.codex-cbse-payload-*.txt'):
    helper.unlink(missing_ok=True)
Path('.codex-cbse-social-20260526.py').unlink(missing_ok=True)
Path('.github/workflows/codex-cbse-social-20260526.yml').unlink(missing_ok=True)
Path('.codex-move-cbse-class8.py').unlink(missing_ok=True)
Path('.github/workflows/codex-move-cbse-class8.yml').unlink(missing_ok=True)
