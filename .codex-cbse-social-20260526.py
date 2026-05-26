from pathlib import Path
import base64, json, zlib


def load_chapters(root):
    chunks = []
    for path in sorted(root.glob('.codex-cbse-payload-*.txt')):
        chunks.append(path.read_text(encoding='utf-8').strip())
    if not chunks:
        raise SystemExit('CBSE payload chunks not found')
    payload = ''.join(chunks)
    return json.loads(zlib.decompress(base64.b64decode(payload)).decode('utf-8'))


def write_json_tests(root):
    chapters = load_chapters(root)
    for c_index, chapter in enumerate(chapters, start=1):
        out_dir = root / 'mock-tests' / 'class-10' / 'cbse' / 'social-science' / f'chapter-{c_index}'
        out_dir.mkdir(parents=True, exist_ok=True)
        for t_index, test in enumerate(chapter['tests'], start=1):
            data = {
                'className': {'en': 'Class 10 CBSE', 'as': 'শ্ৰেণী ১০ CBSE'},
                'subject': {'en': 'Social Science', 'as': 'সমাজ বিজ্ঞান'},
                'section': {'en': 'CBSE', 'as': 'CBSE'},
                'chapter': {'en': f"Chapter {c_index} - {chapter['title']}", 'as': f"Chapter {c_index} - {chapter['title']}"},
                'test': {'en': f'Test {t_index}', 'as': f'টেষ্ট {t_index}'},
                'displayTitle': f"CBSE Class 10 Social Science - Chapter {c_index} Test {t_index}",
                'englishOnly': True,
                'durationMinutes': 10,
                'correctMarks': 1,
                'wrongMarks': -0.25,
                'questions': []
            }
            for q in test['questions']:
                data['questions'].append({
                    'en': q['question'],
                    'options': [{'en': option} for option in q['options']],
                    'answer': q['answer'],
                    'explanation': {'en': q.get('explanation', '')}
                })
            (out_dir / f'test-{t_index}.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def patch_index(root):
    path = root / 'index.html'
    text = path.read_text(encoding='utf-8')

    if 'const class10CbseBoard = {' not in text:
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
        text = text.replace('const class10SocialScience = {', insert + 'const class10SocialScience = {', 1)

    old = '''    subjects:className === "Class 10"
      ? [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience]
      : className === "Class 9"'''
    new = '''    subjects:className === "Class 10"
      ? [class10SebaBoard, class10CbseBoard]
      : className === "Class 9"'''
    if old in text:
        text = text.replace(old, new, 1)

    if 'class10SebaBoard.subjects = [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience];' not in text:
        text = text.replace('const mockClassGroups = [', 'class10SebaBoard.subjects = [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience];\nconst mockClassGroups = [', 1)

    if 'function isClass10CbseSocialScience(parts)' not in text:
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

    if 'function class10CbseSocialScienceTestFile(parts, test)' not in text:
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

    if 'class10CbseSocialScienceTestFile(parts, test)' in text and 'if(isClass10CbseSocialScience(parts)){' not in text:
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

    if 'if(subject.subjects){' not in text:
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

    path.write_text(text, encoding='utf-8')


root = Path('.')
write_json_tests(root)
patch_index(root)
Path('.codex-cbse-social-20260526.py').unlink(missing_ok=True)
Path('.github/workflows/codex-cbse-social-20260526.yml').unlink(missing_ok=True)
