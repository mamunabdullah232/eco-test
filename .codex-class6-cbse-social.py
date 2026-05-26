from pathlib import Path
import base64
import json
import zlib

ROOT = Path(__file__).resolve().parent
PAYLOAD_PREFIX = ".codex-class6-cbse-payload-"
WORKFLOW = ROOT / ".github/workflows/codex-class6-cbse-social.yml"

payload_files = sorted(ROOT.glob(PAYLOAD_PREFIX + "*.txt"))
if not payload_files:
    raise SystemExit("No payload files found")

payload = "".join(path.read_text(encoding="utf-8").strip() for path in payload_files)
chapters = json.loads(zlib.decompress(base64.b64decode(payload)).decode("utf-8"))

out_root = ROOT / "mock-tests" / "class-6" / "cbse" / "social-science"
for chapter in chapters:
    chapter_dir = out_root / f"chapter-{chapter['number']}"
    chapter_dir.mkdir(parents=True, exist_ok=True)
    for test in chapter["tests"]:
        questions = []
        for item in test["questions"]:
            questions.append({
                "en": item["question"],
                "options": [{"en": option} for option in item["options"]],
                "answer": item["answer"],
                "explanation": {"en": item["explanation"]},
            })
        data = {
            "className": {"en": "Class 6 CBSE", "as": "শ্ৰেণী ৬ CBSE"},
            "subject": {"en": "Social Science", "as": "সমাজ বিজ্ঞান"},
            "section": {"en": "CBSE", "as": "CBSE"},
            "chapter": {
                "en": f"Chapter {chapter['number']} - {chapter['title']}",
                "as": f"Chapter {chapter['number']} - {chapter['title']}",
            },
            "test": {"en": f"Test {test['number']}", "as": f"টেষ্ট {test['number']}"},
            "displayTitle": f"CBSE Class 6 Social Science - Chapter {chapter['number']} Test {test['number']}",
            "englishOnly": True,
            "durationMinutes": 10,
            "correctMarks": 1,
            "wrongMarks": -0.25,
            "questions": questions,
        }
        (chapter_dir / f"test-{test['number']}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

index_path = ROOT / "index.html"
html = index_path.read_text(encoding="utf-8")

board_block = '''const class6SebaBoard = {
  name:{en:"SEBA", as:"ছেবা"},
  subjects:[]
};
const class6CbseBoard = {
  name:{en:"CBSE", as:"CBSE"},
  chapterGroups:[
    {
      name:{en:"Social Science", as:"সমাজ বিজ্ঞান"},
      chapters:[
        {en:"Chapter 2 - Oceans and Continents", as:"Chapter 2 - Oceans and Continents"},
        {en:"Chapter 3 - Landforms and Life", as:"Chapter 3 - Landforms and Life"}
      ]
    }
  ]
};
'''
if "const class6CbseBoard" not in html:
    html = html.replace("const class8SebaBoard = {", board_block + "const class8SebaBoard = {")

if "class6SebaBoard.subjects = juniorMockSubjects;" not in html:
    html = html.replace(
        "class8SebaBoard.subjects = juniorMockSubjects;",
        "class6SebaBoard.subjects = juniorMockSubjects;\nclass8SebaBoard.subjects = juniorMockSubjects;",
    )

old_mapping = '''        : className === "Class 8"
          ? [class8SebaBoard, class8CbseBoard]
          : juniorMockSubjects'''
new_mapping = '''        : className === "Class 8"
          ? [class8SebaBoard, class8CbseBoard]
          : className === "Class 6"
            ? [class6SebaBoard, class6CbseBoard]
            : juniorMockSubjects'''
if new_mapping not in html:
    html = html.replace(old_mapping, new_mapping)

helper_block = '''function isClass6CbseSocialScience(parts){
  return /^class-6__cbse__social-science__chapter-[2-3]-/.test(parts.map(slugify).join("__"));
}
'''
if "function isClass6CbseSocialScience" not in html:
    html = html.replace("function isClass8CbseSocialScience(parts){", helper_block + "\nfunction isClass8CbseSocialScience(parts){")

file_func = '''function class6CbseSocialScienceTestFile(parts, test){
  return "mock-tests/class-6/cbse/social-science/chapter-" + getNumberFromLabel(parts[3]) + "/test-" + getNumberFromLabel(test) + ".json";
}
'''
if "function class6CbseSocialScienceTestFile" not in html:
    html = html.replace("function class8CbseSocialScienceTestFile(parts, test){", file_func + "\nfunction class8CbseSocialScienceTestFile(parts, test){")

class8_nested = '''  if(isClass8CbseSocialScience(parts)){
    return "mock-test.html?file=" + encodeURIComponent(class8CbseSocialScienceTestFile(parts, test));
  }'''
class6_nested = '''  if(isClass6CbseSocialScience(parts)){
    return "mock-test.html?file=" + encodeURIComponent(class6CbseSocialScienceTestFile(parts, test));
  }'''
if class6_nested not in html:
    html = html.replace(class8_nested, class8_nested + "\n" + class6_nested)

class8_available = '''  if(isClass8CbseSocialScience(parts)){
    return /^Test [1-5]$/.test(labelEn(test));
  }'''
class6_available = '''  if(isClass6CbseSocialScience(parts)){
    return /^Test [1-5]$/.test(labelEn(test));
  }'''
if class6_available not in html:
    html = html.replace(class8_available, class8_available + "\n" + class6_available)

required_markers = [
    "const class6CbseBoard",
    "class6SebaBoard.subjects = juniorMockSubjects;",
    "function isClass6CbseSocialScience",
    "function class6CbseSocialScienceTestFile",
    "isClass6CbseSocialScience(parts)",
]
missing = [marker for marker in required_markers if marker not in html]
if missing:
    raise SystemExit("Index patch failed, missing: " + ", ".join(missing))

index_path.write_text(html, encoding="utf-8")

for path in payload_files:
    path.unlink()
Path(__file__).unlink()
if WORKFLOW.exists():
    WORKFLOW.unlink()
