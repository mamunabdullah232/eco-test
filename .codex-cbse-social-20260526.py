from pathlib import Path
import base64, json, zlib

PAYLOAD = """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"""

def load_chapters():
    return json.loads(zlib.decompress(base64.b64decode(PAYLOAD)).decode("utf-8"))

def write_json_tests(root):
    chapters = load_chapters()
    for c_index, chapter in enumerate(chapters, start=1):
        out_dir = root / "mock-tests" / "class-10" / "cbse" / "social-science" / f"chapter-{c_index}"
        out_dir.mkdir(parents=True, exist_ok=True)
        for t_index, test in enumerate(chapter["tests"], start=1):
            data = {
                "className": {"en": "Class 10 CBSE", "as": "শ্ৰেণী ১০ CBSE"},
                "subject": {"en": "Social Science", "as": "সমাজ বিজ্ঞান"},
                "section": {"en": "CBSE", "as": "CBSE"},
                "chapter": {"en": f"Chapter {c_index} - {chapter['title']}", "as": f"Chapter {c_index} - {chapter['title']}"},
                "test": {"en": f"Test {t_index}", "as": f"টেষ্ট {t_index}"},
                "displayTitle": f"CBSE Class 10 Social Science - Chapter {c_index} Test {t_index}",
                "englishOnly": True,
                "durationMinutes": 10,
                "correctMarks": 1,
                "wrongMarks": -0.25,
                "questions": []
            }
            for q in test["questions"]:
                data["questions"].append({
                    "en": q["question"],
                    "options": [{"en": option} for option in q["options"]],
                    "answer": q["answer"],
                    "explanation": {"en": q.get("explanation", "")}
                })
            (out_dir / f"test-{t_index}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

def patch_index(root):
    path = root / "index.html"
    text = path.read_text(encoding="utf-8")
    if "const class10CbseBoard = {" not in text:
        insert = '''const class10SebaBoard = {
  name:{en:"SEBA", as:"ছেবা"},
  subjects:[]
};
const class10CbseBoard = {
  name:{en:"CBSE", as:"CBSE"},
  chapterGroups:[
    {
      name:{en:"Social Science", as:"সমাজ বিজ্ঞান"},
      chapters:[
        {en:"Chapter 1 - Natural Resources and Their Use", as:"Chapter 1 - Natural Resources and Their Use"},
        {en:"Chapter 2 - Reshaping India's Political Map", as:"Chapter 2 - Reshaping India's Political Map"}
      ]
    }
  ]
};
'''
        anchor = "const class10SocialScience = {"
        if anchor not in text:
            raise SystemExit("class10SocialScience anchor not found")
        text = text.replace(anchor, insert + anchor, 1)
    old = '''    subjects:className === "Class 10"
      ? [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience]
      : className === "Class 9"'''
    new = '''    subjects:className === "Class 10"
      ? [class10SebaBoard, class10CbseBoard]
      : className === "Class 9"'''
    if old in text:
        text = text.replace(old, new, 1)
    if "class10SebaBoard.subjects = [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience];" not in text:
        text = text.replace("const mockClassGroups = [", "class10SebaBoard.subjects = [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience];\nconst mockClassGroups = [", 1)
    if "function isClass10CbseSocialScience(parts)" not in text:
        text = text.replace('''function isClass10EnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "class-10__english__grammar";
}
''', '''function isClass10EnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "class-10__english__grammar";
}

function isClass10CbseSocialScience(parts){
  return /^class-10__cbse__social-science__chapter-[1-2]-/.test(parts.map(slugify).join("__"));
}
''', 1)
    if "function class10CbseSocialScienceTestFile(parts, test)" not in text:
        text = text.replace('''function class10EnglishGrammarTestFile(test){
  return "mock-tests/class-10/english/grammar/test" + getNumberFromLabel(test) + ".json";
}
''', '''function class10EnglishGrammarTestFile(test){
  return "mock-tests/class-10/english/grammar/test" + getNumberFromLabel(test) + ".json";
}

function class10CbseSocialScienceTestFile(parts, test){
  return "mock-tests/class-10/cbse/social-science/chapter-" + getNumberFromLabel(parts[3]) + "/test-" + getNumberFromLabel(test) + ".json";
}
''', 1)
    if "class10CbseSocialScienceTestFile(parts, test)" in text and "if(isClass10CbseSocialScience(parts)){\n    return \"mock-test.html?file=\" + encodeURIComponent(class10CbseSocialScienceTestFile(parts, test));" not in text:
        text = text.replace('''  if(isKidsEnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(kidsEnglishGrammarTestFile(test));
  }
  return "mock-test.html?set=" + encodeURIComponent(mockSetId(parts, test));
}''', '''  if(isKidsEnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(kidsEnglishGrammarTestFile(test));
  }
  if(isClass10CbseSocialScience(parts)){
    return "mock-test.html?file=" + encodeURIComponent(class10CbseSocialScienceTestFile(parts, test));
  }
  return "mock-test.html?set=" + encodeURIComponent(mockSetId(parts, test));
}''', 1)
    if "if(isClass10CbseSocialScience(parts)){\n    return /^Test [1-5]$/.test(labelEn(test));" not in text:
        text = text.replace('''  if(isKidsEnglishGrammarSection(parts)){
    return /^Test [1-3]$/.test(labelEn(test));
  }
  return false;
}''', '''  if(isKidsEnglishGrammarSection(parts)){
    return /^Test [1-3]$/.test(labelEn(test));
  }
  if(isClass10CbseSocialScience(parts)){
    return /^Test [1-5]$/.test(labelEn(test));
  }
  return false;
}''', 1)
    if "if(subject.subjects){" not in text:
        text = text.replace('''function makeSubjectItems(group, subject){
  if(subject.testsOnly){''', '''function makeSubjectItems(group, subject){
  if(subject.subjects){
    return subject.subjects.map(childSubject => ({
      label:childSubject.name || childSubject,
      next:{
        title:childSubject.name || childSubject,
        items:makeSubjectItems(group, childSubject)
      }
    }));
  }

  if(subject.testsOnly){''', 1)
    path.write_text(text, encoding="utf-8")

root = Path(".")
write_json_tests(root)
patch_index(root)
Path(".codex-cbse-social-20260526.py").unlink(missing_ok=True)
Path(".github/workflows/codex-cbse-social-20260526.yml").unlink(missing_ok=True)
