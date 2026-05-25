from pathlib import Path
import re

FILES = [Path('index.html'), Path('xohopathi_home_and_class_test/index.html')]

EID_LINK = 'https://1drv.ms/b/c/349d115700558663/IQDcKyU4QK8_RIElh6A1nGrEAXozk2cSVeevTg3yBMyQy9k?e=yy2IAl'
LATEST_ROW = f'''          <a class="resource-row" href="{EID_LINK}" target="_blank" rel="noopener noreferrer">
            <span class="resource-mark">LN</span>
            <span><strong>Notification of Eid Holiday / ঈদ বন্ধৰ জাননী</strong></span>
            <span class="badge green">Open / খোলক</span>
          </a>'''

CLASS_TEST_CARD = '''        <a class="student-action nav-route" href="#class-tests" data-page="class-tests">
          <strong>Class Test / শ্ৰেণী টেষ্ট</strong>
          <p>Class-wise classroom practice and short tests. / শ্ৰেণীভিত্তিক অনুশীলন আৰু চুটি টেষ্ট।</p>
          <span class="badge green">Open / খোলক</span>
        </a>
'''

CLASS_TEST_SECTION = '''  <section class="page-view" id="class-tests" data-title="Class Test" hidden>
    <div class="container">
      <div class="section-head">
        <div class="mini">Class Practice / শ্ৰেণী অনুশীলন</div>
        <h1><span class="bi">Class Test<span class="as">শ্ৰেণী টেষ্ট</span></span></h1>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-mark">X</div>
          <h3>Class 10 / শ্ৰেণী ১০</h3>
          <p>Class test links will be updated here. / শ্ৰেণী টেষ্টৰ লিংক ইয়াতে আপডেট কৰা হ’ব।</p>
          <span class="badge amber">Coming Soon / শীঘ্ৰে</span>
        </div>
        <div class="card">
          <div class="card-mark">IX</div>
          <h3>Class 9 / শ্ৰেণী ৯</h3>
          <p>Class test links will be updated here. / শ্ৰেণী টেষ্টৰ লিংক ইয়াতে আপডেট কৰা হ’ব।</p>
          <span class="badge amber">Coming Soon / শীঘ্ৰে</span>
        </div>
        <div class="card">
          <div class="card-mark">VIII</div>
          <h3>Class 8 / শ্ৰেণী ৮</h3>
          <p>Class test links will be updated here. / শ্ৰেণী টেষ্টৰ লিংক ইয়াতে আপডেট কৰা হ’ব।</p>
          <span class="badge amber">Coming Soon / শীঘ্ৰে</span>
        </div>
      </div>
    </div>
  </section>
'''

FACT_IMAGES = '''const factImages = [
  {src:"https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1000&q=80", alt:"অক্টোপাছ"},
  {src:"https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1000&q=80", alt:"শুক্ৰ গ্ৰহ"},
  {src:"https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80", alt:"আইফেল টাৱাৰ"},
  {src:"https://images.unsplash.com/photo-1552410260-0fd9b577afa6?auto=format&fit=crop&w=1000&q=80", alt:"পখিলা"},
  {src:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80", alt:"পানীৰ ঢৌ"},
  {src:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80", alt:"ঘাঁহনি"},
  {src:"https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1000&q=80", alt:"নীলা তিমি"},
  {src:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80", alt:"কম্পিউটাৰ মাউছ"},
  {src:"https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1000&q=80", alt:"বিজুলী"},
  {src:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=80", alt:"চন্দ্ৰ"}
];'''

for path in FILES:
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8')

    text = re.sub(r'\n\s*<div class="routine-notice">[\s\S]*?</div>\s*\n', '\n', text, count=1)
    text = re.sub(r'\n\s*<p>View assigned periods by teacher or by class time\.[\s\S]*?</p>', '', text, count=1)
    text = re.sub(r'\.routine-notice\{[\s\S]*?\}\s*', '', text, count=1)

    text = re.sub(
        r'\s*<div class="resource-row disabled" aria-disabled="true">\s*<span class="resource-mark">LN</span>[\s\S]*?</div>',
        '\n' + LATEST_ROW,
        text,
        count=1,
    )

    if 'Jaluguti HS School (Class Routine) <span class="new-blink">New</span>' not in text:
        text = text.replace(
            'Jaluguti HS School (Class Routine)',
            'Jaluguti HS School (Class Routine) <span class="new-blink">New</span>',
            1,
        )

    text = text.replace('grid-template-columns:repeat(4,1fr);', 'grid-template-columns:repeat(auto-fit,minmax(220px,1fr));', 1)

    if 'data-page="class-tests"' not in text:
        text = text.replace(
            '        <a class="student-action nav-route" href="#study-materials" data-page="study-materials">',
            CLASS_TEST_CARD + '        <a class="student-action nav-route" href="#study-materials" data-page="study-materials">',
            1,
        )

    if 'id="class-tests"' not in text:
        text = text.replace(
            '  <section class="page-view" id="mock-tests" data-title="Mock Test" hidden>',
            CLASS_TEST_SECTION + '\n  <section class="page-view" id="mock-tests" data-title="Mock Test" hidden>',
            1,
        )

    text = re.sub(r'const factImages = \[[\s\S]*?\];', FACT_IMAGES, text, count=1)

    path.write_text(text, encoding='utf-8')
