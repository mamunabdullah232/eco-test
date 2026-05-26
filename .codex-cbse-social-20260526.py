from pathlib import Path
import base64, json, zlib

PAYLOAD = """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"""

def load_chapters():
    return json.loads(zlib.decompress(base64.b64decode(PAYLOAD)).decode('utf-8'))

def write_json_tests(root):
    chapters = load_chapters()
    for c_index, chapter in enumerate(chapters, start=1):
        out_dir = root / 'mock-tests' / 'class-10' / 'cbse' / 'social-science' / f'chapter-{c_index}'
        out_dir.mkdir(parents=True, exist_ok=True)
        for t_index, test in enumerate(chapter['tests'], start=1):
            data = {
                'className': {'en': 'Class 10 CBSE', 'as': 'শ্ৰেণী ১০ CBSE'},
                'subject': {'en': 'Social Science', 'as': 'সমাজ বিজ্ঞান'},
                'section': {'en': 'CBSE', 'as': 'CBSE'},
                'chapter': {'en': f'Chapter {c_index} - {chapter["title"]}', 'as': f'Chapter {c_index} - {chapter["title"]}'},
                'test': {'en': f'Test {t_index}', 'as': f'টেষ্ট {t_index}'},
                'displayTitle': f'CBSE Class 10 Social Science - Chapter {c_index} Test {t_index}',
                'englishOnly': True,
                'durationMinutes': 10,
                'correctMarks': 1,
                'wrongMarks': -0.25,
                'questions': []
            }
            for question in test['questions']:
                data['questions'].append({
                    'en': question['question'],
                    'options': [{'en': option} for option in question['options']],
                    'answer': question['answer'],
                    'explanation': {'en': question.get('explanation', '')}
                })
            (out_dir / f'test-{t_index}.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def patch_index(root):
    path = root / 'index.html'
    text = path.read_text(encoding='utf-8')

    if 'const class10CbseBoard = {' not in text:
        anchor = 'const class10GeneralMathematics = {'
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
        if anchor not in text:
            raise SystemExit('class10GeneralMathematics anchor not found')
        text = text.replace(anchor, insert + anchor)

    old = '''    subjects:className === "Class 10"
      ? [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience]
      : className === "Class 9"'''
    new = '''    subjects:className === "Class 10"
      ? [class10SebaBoard, class10CbseBoard]
      : className === "Class 9"'''
    if old in text:
        text = text.replace(old, new)

    if 'class10SebaBoard.subjects = [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience];' not in text:
        text = text.replace('const mockClassGroups = [', 'class10SebaBoard.subjects = [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience];\nconst mockClassGroups = [')

    if 'function isClass10CbseSocialScience(parts)' not in text:
        text = text.replace(
            '''function isClass10EnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "class-10__english__grammar";
}
''',
            '''function isClass10EnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "class-10__english__grammar";
}

function isClass10CbseSocialScience(parts){
  return /^class-10__cbse__social-science__chapter-[1-2]-/.test(parts.map(slugify).join("__"));
}
''')

    if 'function class10CbseSocialScienceTestFile(parts, test)' not in text:
        text = text.replace(
            '''function class10EnglishGrammarTestFile(test){
  return "mock-tests/class-10/english/grammar/test" + getNumberFromLabel(test) + ".json";
}
''',
            '''function class10EnglishGrammarTestFile(test){
  return "mock-tests/class-10/english/grammar/test" + getNumberFromLabel(test) + ".json";
}

function class10CbseSocialScienceTestFile(parts, test){
  return "mock-tests/class-10/cbse/social-science/chapter-" + getNumberFromLabel(parts[3]) + "/test-" + getNumberFromLabel(test) + ".json";
}
''')

    if 'if(isClass10CbseSocialScience(parts)){' not in text:
        text = text.replace(
            '''  if(isKidsEnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(kidsEnglishGrammarTestFile(test));
  }
  return "mock-test.html?set=" + encodeURIComponent(mockSetId(parts, test));
}''',
            '''  if(isKidsEnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(kidsEnglishGrammarTestFile(test));
  }
  if(isClass10CbseSocialScience(parts)){
    return "mock-test.html?file=" + encodeURIComponent(class10CbseSocialScienceTestFile(parts, test));
  }
  return "mock-test.html?set=" + encodeURIComponent(mockSetId(parts, test));
}''')

        text = text.replace(
            '''  if(isKidsEnglishGrammarSection(parts)){
    return /^Test [1-3]$/.test(labelEn(test));
  }
  return false;
}''',
            '''  if(isKidsEnglishGrammarSection(parts)){
    return /^Test [1-3]$/.test(labelEn(test));
  }
  if(isClass10CbseSocialScience(parts)){
    return /^Test [1-5]$/.test(labelEn(test));
  }
  return false;
}''')

    if 'if(subject.subjects){' not in text:
        text = text.replace(
            '''function makeSubjectItems(group, subject){
  if(subject.testsOnly){''',
            '''function makeSubjectItems(group, subject){
  if(subject.subjects){
    return subject.subjects.map(childSubject => ({
      label:childSubject.name || childSubject,
      next:{
        title:childSubject.name || childSubject,
        items:makeSubjectItems(group, childSubject)
      }
    }));
  }

  if(subject.testsOnly){''')

    path.write_text(text, encoding='utf-8')

root = Path('.')
patch_index(root)
write_json_tests(root)
Path('.codex-cbse-social-20260526.py').unlink(missing_ok=True)
Path('.github/workflows/codex-cbse-social-20260526.yml').unlink(missing_ok=True)
