from pathlib import Path
import json

ROOT = Path('.')
index_path = ROOT / 'index.html'
mock_path = ROOT / 'mock-test.html'

index = index_path.read_text(encoding='utf-8')

kids_block = '''const kidsMockSubjects = [
  {name:{en:"English", as:"ইংৰাজী"}, testsOnly:true},
  {name:{en:"Social Science", as:"সমাজ বিজ্ঞান"}, testsOnly:true},
  {name:{en:"English Grammar", as:"ইংৰাজী ব্যাকৰণ"}, testsOnly:true},
  {name:{en:"GK", as:"সাধাৰণ জ্ঞান"}, testsOnly:true}
];
'''
old_mock_groups = '''const mockClassGroups = [
  ...seniorMockClasses.map(className => ({name:className, subjects:seniorMockSubjects})),
  ...juniorMockClasses.map(className => ({
    name:className,
    subjects:className === "Class 10"
      ? [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience]
      : className === "Class 9"
        ? [juniorMockSubjects[0], class9SocialScience]
        : juniorMockSubjects
  }))
];'''
new_mock_groups = kids_block + '''const mockClassGroups = [
  ...seniorMockClasses.map(className => ({name:className, subjects:seniorMockSubjects})),
  ...juniorMockClasses.map(className => ({
    name:className,
    subjects:className === "Class 10"
      ? [juniorMockSubjects[0], class10GeneralMathematics, class10SocialScience]
      : className === "Class 9"
        ? [juniorMockSubjects[0], class9SocialScience]
        : juniorMockSubjects
  })),
  {name:"Kids", subjects:kidsMockSubjects}
];'''
if 'const kidsMockSubjects = [' not in index:
    if old_mock_groups not in index:
        raise SystemExit('mockClassGroups anchor not found')
    index = index.replace(old_mock_groups, new_mock_groups)

if 'if(group.name === "Kids") return {en:"Kids", as:"শিশু"};' not in index:
    index = index.replace(
        '  if(group.name === "APSC") return {en:"APSC", as:"এ পি এছ চি"};',
        '  if(group.name === "Kids") return {en:"Kids", as:"শিশু"};\n  if(group.name === "APSC") return {en:"APSC", as:"এ পি এছ চি"};'
    )

if 'function isKidsEnglishGrammarSection(parts)' not in index:
    index = index.replace(
        '''function isClass10EnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "class-10__english__grammar";
}
''',
        '''function isClass10EnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "class-10__english__grammar";
}

function isKidsEnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "kids__english-grammar__english-grammar";
}
'''
    )

if 'function kidsEnglishGrammarTestFile(test)' not in index:
    index = index.replace(
        '''function class10EnglishGrammarTestFile(test){
  return "mock-tests/class-10/english/grammar/test" + getNumberFromLabel(test) + ".json";
}
''',
        '''function class10EnglishGrammarTestFile(test){
  return "mock-tests/class-10/english/grammar/test" + getNumberFromLabel(test) + ".json";
}

function kidsEnglishGrammarTestFile(test){
  return "mock-tests/kids/english-grammar/test-" + getNumberFromLabel(test) + ".json";
}
'''
    )

if 'if(isKidsEnglishGrammarSection(parts)){' not in index:
    index = index.replace(
        '''  if(isClass10EnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(class10EnglishGrammarTestFile(test));
  }
  return "mock-test.html?set=" + encodeURIComponent(mockSetId(parts, test));
}''',
        '''  if(isClass10EnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(class10EnglishGrammarTestFile(test));
  }
  if(isKidsEnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(kidsEnglishGrammarTestFile(test));
  }
  return "mock-test.html?set=" + encodeURIComponent(mockSetId(parts, test));
}'''
    )

if 'if(isKidsEnglishGrammarSection(parts)){' not in index[index.find('function isMockTestAvailable'):index.find('function renderTestLinks')]:
    index = index.replace(
        '''  if(isClass10EnglishGrammarSection(parts)){
    return /^Test ([1-9]|10)$/.test(labelEn(test));
  }
  return false;
}''',
        '''  if(isClass10EnglishGrammarSection(parts)){
    return /^Test ([1-9]|10)$/.test(labelEn(test));
  }
  if(isKidsEnglishGrammarSection(parts)){
    return /^Test [1-3]$/.test(labelEn(test));
  }
  return false;
}'''
    )

if 'if(subject.testsOnly){' not in index:
    index = index.replace(
        '''function makeSubjectItems(group, subject){
  if(subject.finalPapers){''',
        '''function makeSubjectItems(group, subject){
  if(subject.testsOnly){
    return makeTestLevel(subject.name || subject, [group.name, subject.name || subject, subject.name || subject]).items;
  }

  if(subject.finalPapers){'''
    )

index_path.write_text(index, encoding='utf-8')

mock = mock_path.read_text(encoding='utf-8')

kid_css = '''
.explanation{
  margin-top:14px;
  border:1px solid #bae6fd;
  background:linear-gradient(135deg,#f0f9ff 0%,#fff7ed 100%);
  border-radius:14px;
  padding:12px 13px;
  color:#0f172a;
}
.explanation-title{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:4px 9px;
  border-radius:999px;
  background:#dbeafe;
  color:#1d4ed8;
  font-size:.86rem;
  font-weight:900;
}
.explanation p{margin-top:8px;color:#334155;font-weight:700}
body.kid-mode{
  background:linear-gradient(135deg,#fff7ad 0%,#e0f2fe 34%,#fce7f3 68%,#dcfce7 100%);
}
body.kid-mode .panel{border:2px solid #facc15;box-shadow:0 18px 38px rgba(249,115,22,.16)}
body.kid-mode .test-head{background:linear-gradient(135deg,#fff7ed 0%,#ecfeff 48%,#fdf2f8 100%)}
body.kid-mode .kicker{color:#be123c}
body.kid-mode .question-card{border:2px solid #bfdbfe;background:linear-gradient(135deg,#ffffff 0%,#f8fbff 100%)}
body.kid-mode .question-card:nth-child(4n+1){border-color:#fed7aa}
body.kid-mode .question-card:nth-child(4n+2){border-color:#bbf7d0}
body.kid-mode .question-card:nth-child(4n+3){border-color:#fbcfe8}
body.kid-mode .btn{background:linear-gradient(135deg,#f97316,#2563eb)}
body.kid-mode .timer{background:#fef3c7;color:#92400e}
'''
if '.explanation{' not in mock:
    mock = mock.replace('@media(max-width:680px){', kid_css + '\n@media(max-width:680px){')

if 'const activeFilePath = params.get("file") || "";' not in mock:
    mock = mock.replace(
        'const params = new URLSearchParams(location.search);\n',
        'const params = new URLSearchParams(location.search);\nconst activeFilePath = params.get("file") || "";\nif(activeFilePath.includes("mock-tests/kids/")){\n  document.body.classList.add("kid-mode");\n}\n'
    )

mock = mock.replace(
    'return filePath.includes("mock-tests/class-10/english/grammar/");',
    'return filePath.includes("mock-tests/class-10/english/grammar/") || filePath.includes("mock-tests/kids/english-grammar/");'
)

if 'function renderExplanation(question)' not in mock:
    mock = mock.replace(
        '''function label(value){
  return escapeHTML(text(value));
}
''',
        '''function label(value){
  return escapeHTML(text(value));
}

function renderExplanation(question){
  if(!submitted || !question.explanation) return "";
  const explanation = question.explanation;
  const english = typeof explanation === "string" ? explanation : explanation.en || "";
  const assamese = typeof explanation === "string" ? "" : explanation.as || "";
  return `
    <div class="explanation">
      <span class="explanation-title">Explanation / ব্যাখ্যা</span>
      ${english ? `<p><strong>English:</strong> ${escapeHTML(english)}</p>` : ""}
      ${assamese ? `<p><strong>অসমীয়া:</strong> ${escapeHTML(assamese)}</p>` : ""}
    </div>
  `;
}
'''
    )

if '${renderExplanation(question)}' not in mock:
    mock = mock.replace(
        '''      </div>
    </div>
  `).join("");''',
        '''      </div>
      ${renderExplanation(question)}
    </div>
  `).join("");'''
    )

mock_path.write_text(mock, encoding='utf-8')

BASE_META = {
    'className': {'en': 'Kids', 'as': 'শিশু'},
    'subject': {'en': 'English Grammar', 'as': 'ইংৰাজী ব্যাকৰণ'},
    'section': {'en': 'English Grammar', 'as': 'ইংৰাজী ব্যাকৰণ'},
    'chapter': {'en': 'Basic English Grammar', 'as': 'মৌলিক ইংৰাজী ব্যাকৰণ'},
    'durationMinutes': 10,
    'correctMarks': 1,
    'wrongMarks': -0.25,
}

def q(en, as_, opts, ans, exp_en, exp_as):
    return {
        'en': en,
        'as': as_,
        'options': [{'en': opt, 'as': opt} for opt in opts],
        'answer': ans,
        'explanation': {'en': exp_en, 'as': exp_as}
    }

tests = [
    {
        **BASE_META,
        'test': {'en': 'Test 1', 'as': 'টেষ্ট ১'},
        'displayTitle': 'Kids English Grammar - Test 1',
        'questions': [
            q('Choose the correct sentence.', 'সঠিক বাক্যটো বাছি লোৱা।', ['Is playing Rahul.', 'Rahul is playing.', 'Playing is Rahul.', 'Is Rahul playing football.'], 1, 'In a simple sentence, the subject usually comes first. Rahul is the subject, and is playing tells what Rahul is doing.', 'সৰল বাক্যত সাধাৰণতে subject আগতে থাকে। ইয়াত Rahul subject আৰু is playing-এ Rahul-এ কি কৰি আছে জনাইছে।'),
            q('Which word is a noun?', 'কোনটো শব্দ noun?', ['run', 'beautiful', 'table', 'quickly'], 2, 'A noun is the name of a person, place, animal, or thing. Table is the name of a thing.', 'Noun হৈছে ব্যক্তি, ঠাই, জন্তু বা বস্তুৰ নাম। Table এটা বস্তুৰ নাম।'),
            q('Which one is a proper noun?', 'কোনটো proper noun?', ['city', 'girl', 'Guwahati', 'school'], 2, 'A proper noun is the special name of a person, place, or thing. Guwahati is the name of a particular city.', 'Proper noun হৈছে কোনো ব্যক্তি, ঠাই বা বস্তুৰ বিশেষ নাম। Guwahati এখন বিশেষ চহৰৰ নাম।'),
            q('Which one is a common noun?', 'কোনটো common noun?', ['India', 'Monday', 'teacher', 'Rina'], 2, 'A common noun is a general name. Teacher is a general name for a person who teaches.', 'Common noun হৈছে সাধাৰণ নাম। Teacher হৈছে পাঠদান কৰা ব্যক্তিৰ সাধাৰণ নাম।'),
            q('Choose the correct word order.', 'সঠিক word order বাছি লোৱা।', ['I mango eat.', 'Eat I mango.', 'I eat a mango.', 'Mango I eat.'], 2, 'The correct order is Subject + Verb + Object. I is the subject, eat is the verb, and a mango is the object.', 'সঠিক ক্ৰম হৈছে Subject + Verb + Object। I subject, eat verb, আৰু a mango object।'),
            q('Which one is a countable noun?', 'কোনটো countable noun?', ['milk', 'rice', 'book', 'water'], 2, 'A countable noun can be counted. We can say one book, two books, three books.', 'Countable noun গণনা কৰিব পাৰি। আমি one book, two books বুলি ক’ব পাৰোঁ।'),
            q('Which one is an uncountable noun?', 'কোনটো uncountable noun?', ['pencil', 'chair', 'sugar', 'apple'], 2, 'An uncountable noun cannot be counted directly. We usually say some sugar.', 'Uncountable noun সরাসৰি গণনা কৰিব নোৱাৰি। আমি সাধাৰণতে some sugar বুলি কওঁ।'),
            q('Identify the noun in the sentence: “The cat is sleeping.”', '“The cat is sleeping.” বাক্যত noun চিনাক্ত কৰা।', ['The', 'cat', 'is', 'sleeping'], 1, 'Cat is the name of an animal. So, it is a noun.', 'Cat এটা জন্তুৰ নাম। সেয়েহে ই noun।'),
            q('Which sentence has correct word order?', 'কোনটো বাক্যৰ word order সঠিক?', ['She reads a book.', 'Reads she a book.', 'A book she reads.', 'She a book reads.'], 0, 'The correct order is Subject + Verb + Object. She is the subject, reads is the verb, and a book is the object.', 'সঠিক ক্ৰম হৈছে Subject + Verb + Object। She subject, reads verb, আৰু a book object।'),
            q('Which one is a proper noun?', 'কোনটো proper noun?', ['river', 'Brahmaputra', 'boy', 'animal'], 1, 'Brahmaputra is the special name of a river. So, it is a proper noun.', 'Brahmaputra এখন বিশেষ নদীৰ নাম। সেয়েহে ই proper noun।')
        ]
    },
    {
        **BASE_META,
        'test': {'en': 'Test 2', 'as': 'টেষ্ট ২'},
        'displayTitle': 'Kids English Grammar - Test 2',
        'questions': [
            q('Choose the correct sentence.', 'সঠিক বাক্যটো বাছি লোৱা।', ['The dog barks.', 'Barks the dog.', 'Dog the barks.', 'The barks dog.'], 0, 'The subject The dog comes first, and the verb barks comes after it.', 'Subject The dog আগতে আহিছে, আৰু verb barks তাৰ পিছত আহিছে।'),
            q('Which word is a noun?', 'কোনটো শব্দ noun?', ['school', 'sing', 'slowly', 'happy'], 0, 'School is the name of a place. So, it is a noun.', 'School এখন ঠাইৰ নাম। সেয়েহে ই noun।'),
            q('Which one is a common noun?', 'কোনটো common noun?', ['Assam', 'Sunday', 'boy', 'Sita'], 2, 'Boy is a general name for a male child. So, it is a common noun.', 'Boy হৈছে এজন ল’ৰাৰ সাধাৰণ নাম। সেয়েহে ই common noun।'),
            q('Which one is a proper noun?', 'কোনটো proper noun?', ['country', 'India', 'village', 'river'], 1, 'India is the special name of a country. So, it is a proper noun.', 'India এখন বিশেষ দেশৰ নাম। সেয়েহে ই proper noun।'),
            q('Choose the correct word order.', 'সঠিক word order বাছি লোৱা।', ['We in school study.', 'Study we in school.', 'We study in school.', 'In school study we.'], 2, 'The sentence begins with the subject We, followed by the verb study.', 'বাক্যটো subject We-ৰে আৰম্ভ হৈছে, তাৰ পিছত verb study আহিছে।'),
            q('Which one is a countable noun?', 'কোনটো countable noun?', ['water', 'milk', 'pen', 'oil'], 2, 'Pen can be counted. We can say one pen, two pens, three pens.', 'Pen গণনা কৰিব পাৰি। আমি one pen, two pens বুলি ক’ব পাৰোঁ।'),
            q('Which one is an uncountable noun?', 'কোনটো uncountable noun?', ['orange', 'sand', 'bag', 'egg'], 1, 'Sand cannot be counted directly. We say some sand, not one sand.', 'Sand সরাসৰি গণনা কৰিব নোৱাৰি। আমি one sand নহয়, some sand বুলি কওঁ।'),
            q('Identify the nouns in the sentence: “Raju has a ball.”', '“Raju has a ball.” বাক্যত nouns চিনাক্ত কৰা।', ['has', 'a', 'ball', 'Raju and ball'], 3, 'Raju is the name of a person, and ball is the name of a thing. Both are nouns.', 'Raju এজন ব্যক্তিৰ নাম, আৰু ball এটা বস্তুৰ নাম। দুয়োটাই noun।'),
            q('Which one is a proper noun?', 'কোনটো proper noun?', ['school', 'Jaluguti H.S. School', 'teacher', 'student'], 1, 'Jaluguti H.S. School is the special name of a particular school. So, it is a proper noun.', 'Jaluguti H.S. School এখন বিশেষ বিদ্যালয়ৰ নাম। সেয়েহে ই proper noun।'),
            q('Which sentence is correct?', 'কোনটো বাক্য সঠিক?', ['I am a student.', 'Student a am I.', 'Am I student a.', 'A student I am.'], 0, 'This sentence has the correct word order: I + am + a student.', 'এই বাক্যত সঠিক word order আছে: I + am + a student।')
        ]
    },
    {
        **BASE_META,
        'test': {'en': 'Test 3', 'as': 'টেষ্ট ৩'},
        'displayTitle': 'Kids English Grammar - Test 3',
        'questions': [
            q('Choose the correct sentence.', 'সঠিক বাক্যটো বাছি লোৱা।', ['My mother cooks food.', 'Cooks food my mother.', 'Food cooks my mother.', 'My cooks mother food.'], 0, 'The subject My mother comes first, then the verb cooks, and then the object food.', 'Subject My mother আগতে আহিছে, তাৰ পিছত verb cooks, আৰু তাৰ পিছত object food।'),
            q('Which word is a noun?', 'কোনটো শব্দ noun?', ['jump', 'flower', 'fast', 'sweetly'], 1, 'Flower is the name of a thing. So, it is a noun.', 'Flower এটা বস্তুৰ নাম। সেয়েহে ই noun।'),
            q('Which one is a common noun?', 'কোনটো common noun?', ['Mamun Sir', 'Delhi', 'month', 'Friday'], 2, 'Month is a general name. It does not name any particular month.', 'Month হৈছে সাধাৰণ নাম। ই কোনো বিশেষ মাহৰ নাম নহয়।'),
            q('Which one is a proper noun?', 'কোনটো proper noun?', ['girl', 'river', 'teacher', 'Ganga'], 3, 'Ganga is the special name of a river. So, it is a proper noun.', 'Ganga এখন বিশেষ নদীৰ নাম। সেয়েহে ই proper noun।'),
            q('Choose the correct word order.', 'সঠিক word order বাছি লোৱা।', ['They football play.', 'Football they play.', 'They play football.', 'Play they football.'], 2, 'The correct order is Subject + Verb + Object. They is the subject, play is the verb, and football is the object.', 'সঠিক ক্ৰম হৈছে Subject + Verb + Object। They subject, play verb, আৰু football object।'),
            q('Which one is a countable noun?', 'কোনটো countable noun?', ['flour', 'water', 'banana', 'tea'], 2, 'Banana can be counted. We can say one banana, two bananas.', 'Banana গণনা কৰিব পাৰি। আমি one banana, two bananas বুলি ক’ব পাৰোঁ।'),
            q('Which one is an uncountable noun?', 'কোনটো uncountable noun?', ['apple', 'cup', 'water', 'doll'], 2, 'Water cannot be counted directly. We say some water or a glass of water.', 'Water সরাসৰি গণনা কৰিব নোৱাৰি। আমি some water বা a glass of water বুলি কওঁ।'),
            q('Identify the nouns in the sentence: “The bird flies in the sky.”', '“The bird flies in the sky.” বাক্যত nouns চিনাক্ত কৰা।', ['bird and sky', 'flies', 'in', 'the'], 0, 'Bird is the name of an animal, and sky is the name of a place or thing. Both are nouns.', 'Bird এটা জন্তুৰ নাম, আৰু sky এটা ঠাই/বস্তুৰ নাম। দুয়োটাই noun।'),
            q('Which sentence has correct word order?', 'কোনটো বাক্যৰ word order সঠিক?', ['Is my friend he.', 'He is my friend.', 'My friend he is.', 'Friend my he is.'], 1, 'The subject He comes first, followed by is my friend.', 'Subject He আগতে আহিছে, তাৰ পিছত is my friend আহিছে।'),
            q('Which one is a countable noun?', 'কোনটো countable noun?', ['rice', 'milk', 'chair', 'sugar'], 2, 'Chair can be counted. We can say one chair, two chairs, three chairs.', 'Chair গণনা কৰিব পাৰি। আমি one chair, two chairs, three chairs বুলি ক’ব পাৰোঁ।')
        ]
    }
]

out_dir = ROOT / 'mock-tests' / 'kids' / 'english-grammar'
out_dir.mkdir(parents=True, exist_ok=True)
for idx, data in enumerate(tests, start=1):
    (out_dir / f'test-{idx}.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')

# Remove the one-time automation files after applying the patch.
Path('.codex-kids-tests-20260526.py').unlink(missing_ok=True)
Path('.github/workflows/codex-kids-tests-20260526.yml').unlink(missing_ok=True)
