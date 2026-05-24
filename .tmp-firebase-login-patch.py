from pathlib import Path

mock = Path('mock-test.html')
text = mock.read_text(encoding='utf-8')
if 'function isEnglishGrammarTest()' not in text:
    text = text.replace(
        'let timerHandle = null;\n',
        'let timerHandle = null;\n\nfunction isEnglishGrammarTest(){\n  const filePath = params.get("file") || "";\n  return filePath.includes("mock-tests/class-10/english/grammar/");\n}\n',
        1
    )
old_submit = '''function submitTest(autoSubmitted){
  if(submitted) return;
  submitted = true;
  clearInterval(timerHandle);
  if(autoSubmitted) timer.textContent = "00:00";
  renderQuestions();
}
'''
new_submit = '''function currentTestId(){
  const filePath = params.get("file") || params.get("set") || "";
  const match = filePath.match(/([^/]+)\.json$/);
  return match ? match[1] : filePath || "test";
}

async function saveAttemptResult(result, autoSubmitted){
  if(!isEnglishGrammarTest() || typeof window.saveXohopathiAttempt !== "function") return;
  const selectedAnswers = testSet.questions.map((question, index) => {
    if(answers[index] === undefined) return null;
    const option = question.options[answers[index]];
    return {
      questionNumber:index + 1,
      selectedIndex:answers[index],
      selectedText:typeof option === "string" ? option : text(option),
      correct:isCorrectAnswer(question, answers[index])
    };
  });
  const correctAnswers = testSet.questions.map((question, index) => ({
    questionNumber:index + 1,
    answer:question.answer
  }));
  try{
    await window.saveXohopathiAttempt({
      className:text(testSet.className) || "Class 10",
      subject:text(testSet.subject) || "English",
      topic:text(testSet.section) || "Grammar",
      testId:currentTestId(),
      testTitle:document.title || "Class 10 English Grammar Test",
      score:Number(result.score.toFixed(2)),
      totalQuestions:testSet.questions.length,
      answers:selectedAnswers,
      correctAnswers,
      extra:{
        autoSubmitted,
        file:params.get("file") || "",
        correct:result.correct,
        wrong:result.wrong,
        unanswered:result.unanswered
      }
    });
    const resultBox = content.querySelector(".result");
    if(resultBox){
      resultBox.insertAdjacentHTML("beforeend", "<br><span>Attempt saved to dashboard.</span>");
    }
  }catch(error){
    console.error("Could not save attempt:", error);
    const resultBox = content.querySelector(".result");
    if(resultBox){
      resultBox.insertAdjacentHTML("beforeend", "<br><span>Attempt could not be saved. Please check login and Firestore rules.</span>");
    }
  }
}

async function submitTest(autoSubmitted){
  if(submitted) return;
  submitted = true;
  clearInterval(timerHandle);
  if(autoSubmitted) timer.textContent = "00:00";
  const result = calculateResult();
  renderQuestions();
  await saveAttemptResult(result, autoSubmitted);
}
'''
if 'async function saveAttemptResult' not in text:
    text = text.replace(old_submit, new_submit, 1)
if '<script type="module" src="/save-attempt.js"></script>' not in text:
    text = text.replace('</script>\n</body>', '</script>\n<script type="module" src="/save-attempt.js"></script>\n</body>', 1)
mock.write_text(text, encoding='utf-8')

index = Path('index.html')
text = index.read_text(encoding='utf-8')
login_card = '''        <a class="student-action" href="/login.html">
          <strong>Student Login</strong>
          <p>Sign in with Google to take protected English Grammar tests and save results.</p>
          <span class="badge green">Login / Dashboard</span>
        </a>
'''
if 'href="/login.html"' not in text:
    text = text.replace('        <a class="student-action nav-route" href="#study-materials" data-page="study-materials">\n', login_card + '        <a class="student-action nav-route" href="#study-materials" data-page="study-materials">\n', 1)
index.write_text(text, encoding='utf-8')
