'use strict';
const CONFIG={nmmsYear:2026,sebaYear:2027,ahsecYear:2027,youtube:'https://www.youtube.com/@xohopathi',whatsapp:'https://chat.whatsapp.com/JRFtUEqDKnz0rQMYOrTxVC'};
const $=id=>document.getElementById(id);
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let catalog=[],subjectFilter='All',searchTerm='';
const levelOf=test=>test.exam==='NMMS'?'nmms-'+test.paper.toLowerCase():test.group==='Kids'?'kids':'class-'+(test.group.match(/\d+/)?.[0]||'');
const currentRoute=()=>location.hash.slice(1)||'home';
function testURL(test,back=currentRoute()){return 'mock-test.html?file='+encodeURIComponent(test.file)+'&return='+encodeURIComponent(back);}
function countFor(level){return catalog.filter(t=>levelOf(t)===level).length;}
function className(level){return level==='kids'?'Kids':'Class '+level.replace('class-','');}
function searchBox(value=''){return `<form class="search" role="search"><label class="sr" for="testSearch">Search mock tests</label><input id="testSearch" type="search" autocomplete="off" placeholder="Search subject or class…" value="${escapeHTML(value)}"></form>`;}
function testLinks(tests,featured=false,back=currentRoute()){return `<div class="test-links ${featured?'featured-links':''}">${tests.map(test=>`<a href="${testURL(test,back)}">${escapeHTML(test.test)}${featured?'':`<small>${test.questions} MCQs · ${test.minutes} min</small>`}</a>`).join('')}</div>`;}
const resources={
 textbooks:{title:'NCERT textbooks',detail:'Classes 1–12 · Official library',url:'https://ncert.nic.in/textbook.php'},
 english:{title:'English · HSLC 2024 paper',detail:'Official question paper · PDF',url:'https://site.sebaonline.org/photo/upload/2025/1752655853_3181.pdf'},
 social:{title:'Social Science · HSLC 2024 paper',detail:'Official question paper · PDF',url:'https://site.sebaonline.org/photo/upload/2025/1752655937_9300.pdf'},
 nmms:{title:'NMMS official information',detail:'Assam education portal',url:'https://madhyamik.assam.gov.in/frontimpotentdata/nmmss-scholarship'}
};
function resourceLinks(keys){return `<div class="resource-list">${keys.map(key=>{const r=resources[key];return `<a class="resource-link" href="${r.url}" target="_blank" rel="noopener noreferrer"><span>${r.title}<small>${r.detail}</small></span><span class="arrow" aria-hidden="true">↗</span></a>`;}).join('')}</div>`;}
function heading(title,count=''){return `<div class="page-heading"><h1>${title}</h1>${count?`<span class="count">${count}</span>`:''}</div>`;}
function sectionHeading(title){return `<div class="section-heading"><h2>${title}</h2></div>`;}
function renderHome(){
 $('pageContent').innerHTML=heading('Home')+`<section class="exam-grid home-exams" aria-label="Exam sections">
 <a class="exam-card nmms" href="#nmms-2026"><span class="exam-year">2026 <span class="exam-soon"><i aria-hidden="true"></i>Exam soon</span></span><b>NMMS</b><span class="card-action">Open section <span aria-hidden="true">→</span></span></a>
 <a class="exam-card seba" href="#seba-2027"><span class="exam-year">2027</span><b>SEBA</b><span class="card-action">Open section <span aria-hidden="true">→</span></span></a>
 <a class="exam-card ahsec" href="#ahsec-2027"><span class="exam-year">2027</span><b>AHSEC</b><span class="card-action">Open section <span aria-hidden="true">→</span></span></a></section>
 <div class="community-links"><a class="youtube" href="#youtube"><span>▶ YouTube</span><span aria-hidden="true">↗</span></a><a class="whatsapp" href="${CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer"><span>WhatsApp Group</span><span aria-hidden="true">↗</span></a></div>`;
}
function breadcrumbs(items){return '<nav class="breadcrumb" aria-label="Breadcrumb">'+[{title:'Home',route:'home'},...items].map((item,i)=>(i?'<span aria-hidden="true">›</span>':'')+(item.route?'<a href="#'+item.route+'">'+escapeHTML(item.title)+'</a>':'<span aria-current="page">'+escapeHTML(item.title)+'</span>')).join('')+'</nav>';}
function menuCards(items){return '<div class="menu-grid">'+items.map(item=>'<a class="menu-card" href="#'+item.route+'"><span><b>'+escapeHTML(item.title)+'</b>'+(item.detail?'<small>'+escapeHTML(item.detail)+'</small>':'')+'</span><span class="arrow" aria-hidden="true">→</span></a>').join('')+'</div>';}
function infoPanel(title,text){return '<section class="info-panel"><h2>'+title+'</h2><p>'+text+'</p></section>';}
function groupTests(tests){const map=new Map();for(const t of tests){const key=[t.group,t.subject,t.section,t.chapter].join('|');if(!map.has(key))map.set(key,[]);map.get(key).push(t);}return [...map.values()];}
function renderCards(tests,back=currentRoute()){
 if(!tests.length)return '<div class="empty"><h2>No matching tests</h2><p>Try another subject or clear the search.</p></div>';
 return `<div class="collection-grid">${groupTests(tests).map(group=>{const first=group[0];const title=levelOf(first)==='class-12'&&first.subject==='Economics'?'Part 2 · Indian Economic Development':first.chapter||first.section||first.subject;return `<article class="collection-card"><div class="meta">${escapeHTML(first.group)} · ${escapeHTML(first.subject)}${first.section&&first.section!==first.subject?' · '+escapeHTML(first.section):''}</div><h3>${escapeHTML(title)}</h3>${first.chapterAs&&first.chapterAs!==title?`<div class="chapter-as" lang="as">${escapeHTML(first.chapterAs)}</div>`:''}${testLinks(group,false,back)}</article>`;}).join('')}</div>`;
}
function matches(test,query){return [test.group,test.subject,test.section,test.chapter,test.chapterAs,test.title].join(' ').toLowerCase().includes(query.toLowerCase().trim());}
function bindSearch(home=false){const input=$('testSearch');input.closest('form').addEventListener('submit',e=>e.preventDefault());input.addEventListener('input',()=>{searchTerm=input.value;if(home){const active=searchTerm.trim().length>0;$('homeOverview').hidden=active;$('homeSearchResults').hidden=!active;if(active){const found=catalog.filter(t=>matches(t,searchTerm));$('homeSearchResults').innerHTML=`<p class="result-count" role="status">${found.length} matching tests</p>`+renderCards(found,'home');}}else renderScopedResults();});}
let scopedTests=[];
function renderScopedResults(){const found=scopedTests.filter(t=>(subjectFilter==='All'||t.subject===subjectFilter)&&matches(t,searchTerm));$('testResults').innerHTML=`<p class="result-count" role="status">${found.length} tests</p>`+renderCards(found);}
function renderLibrary(tests){scopedTests=tests;const subjects=['All',...new Set(tests.map(t=>t.subject))];return searchBox(searchTerm)+(subjects.length>2?`<div class="subject-tabs" role="group" aria-label="Filter subjects">${subjects.map(subject=>`<button data-subject="${escapeHTML(subject)}" aria-pressed="${subject===subjectFilter}">${escapeHTML(subject)}</button>`).join('')}</div>`:'')+'<div id="testResults"></div>';}
function bindLibrary(){bindSearch();document.querySelectorAll('[data-subject]').forEach(button=>button.addEventListener('click',()=>{subjectFilter=button.dataset.subject;document.querySelectorAll('[data-subject]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderScopedResults();}));renderScopedResults();}
function classTabs(type,selected){const levels=type==='seba'?['kids',...Array.from({length:10},(_,i)=>'class-'+(i+1))]:['class-11','class-12'];const route=type==='seba'?'seba-2027':'ahsec-2027';return `<nav class="class-tabs ${type==='seba'?'seba-classes':'ahsec-classes'}" aria-label="Choose class">${levels.map(level=>`<a href="#${route}/${level}" ${level===selected?'aria-current="page"':''}>${className(level)}<small>${countFor(level)?countFor(level)+' tests':'Coming soon'}</small></a>`).join('')}</nav>`;}
function renderBoard(type,segments){
 const seba=type==='seba', title=seba?'SEBA 2027':'AHSEC 2027', base=seba?'seba-2027':'ahsec-2027';
 const levels=seba?['kids',...Array.from({length:10},(_,i)=>'class-'+(i+1))]:['class-11','class-12'];
 const [view,level]=segments;
 if(levels.includes(view)){location.replace('#'+base+'/mock-tests/'+view);return;}
 const crumbs=[{title,route:segments.length?base:null}];
 if(view==='materials'){
  $('pageContent').innerHTML=breadcrumbs([...crumbs,{title:'Study materials'}])+heading('Study materials')+resourceLinks(seba?['textbooks','english','social']:['textbooks']);return;
 }
 if(view!=='mock-tests'){
  $('pageContent').innerHTML=breadcrumbs(crumbs)+heading(title)+infoPanel('Information',seba?'Mock tests for Kids to Class 10.':'Mock tests for Classes 11 and 12.')+menuCards([{title:'Mock Tests',detail:'Choose your class',route:base+'/mock-tests'},{title:'Study Materials',detail:'Textbooks and available papers',route:base+'/materials'}]);return;
 }
 if(!levels.includes(level)){
  $('pageContent').innerHTML=breadcrumbs([...crumbs,{title:'Mock Tests'}])+heading(title+' · Mock Tests')+menuCards(levels.map(l=>({title:className(l),detail:countFor(l)?'Open mock tests':'Coming soon',route:base+'/mock-tests/'+l})));return;
 }
 const tests=catalog.filter(t=>levelOf(t)===level);
 $('pageContent').innerHTML=breadcrumbs([...crumbs,{title:'Mock Tests',route:base+'/mock-tests'},{title:className(level)}])+heading(className(level)+' · Mock Tests')+(['class-6','class-8'].includes(level)?'<p class="scope-note">Current sets: CBSE Social Science foundation practice. SEBA-specific sets have not been added yet.</p>':'')+(tests.length?renderLibrary(tests):'<section class="empty"><h2>Coming soon</h2><p>Mock tests will be added here.</p></section>');
 if(tests.length)bindLibrary();
}
function renderNMMS(segments){
 const base='nmms-2026',title='NMMS 2026';let [view,year,paper]=segments;
 if(['mat','sat'].includes(view)){location.replace('#'+base+'/mock-tests/2024/'+view);return;}
 const crumbs=[{title,route:segments.length?base:null}];
 if(view==='information'){$('pageContent').innerHTML=breadcrumbs([...crumbs,{title:'Information'}])+heading('NMMS Information')+renderNMMSInformation();return;}
 if(view==='materials'){$('pageContent').innerHTML=breadcrumbs([...crumbs,{title:'Study materials'}])+heading('NMMS · Study Materials')+resourceLinks(['nmms','textbooks']);return;}
 if(view!=='mock-tests'){
  $('pageContent').innerHTML=breadcrumbs(crumbs)+heading(title,'Exam soon')+infoPanel('Information','National Means-cum-Merit Scholarship examination. MAT: Mental Ability Test. SAT: Scholastic Aptitude Test — Mathematics, Science and Social Science.')+menuCards([{title:'NMMS Information',detail:'Dates, eligibility and exam pattern',route:base+'/information'},{title:'Mock Tests',detail:'Question-paper practice by year',route:base+'/mock-tests'},{title:'Study Materials',detail:'Textbooks and official information',route:base+'/materials'}]);return;
 }
 if(!['2024','2025'].includes(year)){
  $('pageContent').innerHTML=breadcrumbs([...crumbs,{title:'Mock Tests'}])+heading('NMMS · Mock Tests')+menuCards([{title:'2024 Question Paper',detail:'MAT · SAT',route:base+'/mock-tests/2024'},{title:'2025 Question Paper',detail:'Coming soon',route:base+'/mock-tests/2025'}]);return;
 }
 const yearRoute=base+'/mock-tests/'+year;
 const trail=[...crumbs,{title:'Mock Tests',route:base+'/mock-tests'},{title:year+' Question Paper',route:paper?yearRoute:null}];
 if(!['mat','sat'].includes(paper)){
  $('pageContent').innerHTML=breadcrumbs(trail)+heading(year+' Question Paper')+(year==='2025'?'<p class="scope-note">2025 question-paper mock tests will be uploaded soon.</p>':'')+menuCards([{title:'MAT',detail:'Mental Ability Test'+(year==='2025'?' · Coming soon':''),route:yearRoute+'/mat'},{title:'SAT',detail:'Scholastic Aptitude Test'+(year==='2025'?' · Coming soon':''),route:yearRoute+'/sat'}]);return;
 }
 const sat=paper==='sat',tests=catalog.filter(t=>t.exam==='NMMS'&&t.paper===paper.toUpperCase()&&t.paperYear===2024);
 $('pageContent').innerHTML=breadcrumbs([...trail,{title:paper.toUpperCase()}])+heading(year+' · '+paper.toUpperCase())+((year==='2024')?'<p class="scope-note">2024 question-paper practice · '+tests.length+' sets · 10 MCQs per set · No negative marking.</p>'+renderLibrary(tests):'<section class="empty"><h2>Coming soon</h2><p>'+year+' '+paper.toUpperCase()+' question-paper mock tests will be added here.</p></section>');
 if(year==='2024')bindLibrary();
}
function renderNMMSInformation(){
 return `<section class="nmms-info" aria-labelledby="nmms-info-title">
 <h2 id="nmms-info-title" class="scope-title">NMMS Information <span lang="as">· NMMS তথ্য</span></h2>
 <p class="scope-note">National Means-cum-Merit Scholarship Scheme (NMMSS) supports eligible students from Class IX to XII. The selection examination is taken in Class VIII. <span lang="as">অষ্টম শ্ৰেণীত বাছনি পৰীক্ষা দিয়া হয়; যোগ্য শিক্ষাৰ্থীয়ে নৱমৰ পৰা দ্বাদশ শ্ৰেণীলৈ জলপানি লাভ কৰিব পাৰে।</span></p>
 <section class="nmms-update" aria-labelledby="nmms-dates-title"><h3 id="nmms-dates-title">Assam NMMS 2026 · Important dates / <span lang="as">গুৰুত্বপূৰ্ণ তাৰিখ</span></h3>
 <dl><div><dt>Application deadline / <span lang="as">আবেদনৰ শেষ তাৰিখ</span></dt><dd><time datetime="2026-11-08">8 November 2026</time></dd></div><div><dt>Entrance examination / <span lang="as">বাছনি পৰীক্ষা</span></dt><dd><time datetime="2026-11-28">28 November 2026</time></dd></div></dl>
 <p>Checked on <time datetime="2026-10-28">28 October 2026</time> against <a href="https://bidyarthi.co.in/" target="_blank" rel="noopener noreferrer">Assam’s Bidyarthi portal ↗</a>. Check the portal for revisions and the latest application notice. <span lang="as">নতুন জাননী আৰু সংশোধিত তাৰিখৰ বাবে চৰকাৰী পৰ্টেল চাবা।</span></p></section>
 <div class="nmms-info-grid">
 <article class="collection-card"><h3>Scholarship / <span lang="as">জলপানি</span></h3><p>₹12,000 per year, paid through DBT, for selected eligible students in Classes IX–XII, subject to renewal conditions.</p><p lang="as">বাছনি হোৱা যোগ্য শিক্ষাৰ্থীয়ে নৱীকৰণৰ চৰ্ত অনুসৰি নৱমৰ পৰা দ্বাদশ শ্ৰেণীলৈ বছৰি ₹12,000-কৈ DBT-ৰ জৰিয়তে লাভ কৰে।</p></article>
 <article class="collection-card"><h3>Who is eligible? / <span lang="as">যোগ্যতা</span></h3><ul><li>Regular Class VIII students in State Government, Government-aided or local body schools.</li><li>Parental income from all sources: not more than ₹3,50,000 a year.</li><li>Class VII marks: at least 55%; 50% for SC/ST students.</li></ul><p lang="as">চৰকাৰী, চৰকাৰী সাহায্যপ্ৰাপ্ত বা স্থানীয় নিকায়ৰ বিদ্যালয়ৰ নিয়মীয়া অষ্টম শ্ৰেণীৰ শিক্ষাৰ্থী। অভিভাৱকৰ মুঠ বাৰ্ষিক আয় সৰ্বাধিক ₹3,50,000। সপ্তম শ্ৰেণীত ন্যূনতম 55% নম্বৰ; SC/ST-ৰ বাবে 50%।</p><p>KVS, NVS, private-school students and students of government residential schools providing boarding, lodging and education are not eligible for this scholarship. Exam participation, where permitted, does not establish scholarship eligibility.</p><p lang="as">KVS, NVS, ব্যক্তিগত বিদ্যালয় আৰু থকা-খোৱা তথা শিক্ষাৰ সুবিধা দিয়া চৰকাৰী আবাসিক বিদ্যালয়ৰ শিক্ষাৰ্থী এই জলপানিৰ বাবে যোগ্য নহয়। পৰীক্ষাত অৱতীৰ্ণ হ’ব পৰাটোৱে জলপানিৰ যোগ্যতা নিশ্চিত নকৰে।</p></article>
 <article class="collection-card"><h3>Exam pattern / <span lang="as">পৰীক্ষাৰ আৰ্হি</span></h3><div class="nmms-table-wrap"><table><caption>Full-length papers / <span lang="as">সম্পূৰ্ণ প্ৰশ্নকাকত</span></caption><thead><tr><th scope="col">Paper</th><th scope="col">Questions</th><th scope="col">Marks</th><th scope="col">Time</th></tr></thead><tbody><tr><th scope="row">MAT</th><td>90</td><td>90</td><td>90 min</td></tr><tr><th scope="row">SAT</th><td>90</td><td>90</td><td>90 min</td></tr></tbody></table></div><p>MAT covers verbal and non-verbal reasoning. SAT covers Science, Mathematics and Social Studies at Classes VII–VIII level. Follow the current notice and admit card for exam-day instructions and applicable extra time.</p><p lang="as">MAT-ত ভাষাভিত্তিক আৰু চিত্ৰভিত্তিক যুক্তি থাকে। SAT-ত সপ্তম–অষ্টম শ্ৰেণীৰ বিজ্ঞান, গণিত আৰু সমাজ বিজ্ঞান থাকে। পৰীক্ষাৰ নিৰ্দেশনা আৰু প্ৰযোজ্য অতিৰিক্ত সময়ৰ বাবে চলিত জাননী তথা প্ৰৱেশপত্ৰ চাবা।</p></article>
 <article class="collection-card"><h3>Qualifying and selection / <span lang="as">উত্তীৰ্ণতা আৰু বাছনি</span></h3><p>The Ministry’s scheme rules specify at least 40% aggregate in MAT and SAT together; 32% for SC/ST students. Meeting the qualifying score alone does not guarantee a scholarship: merit, eligibility and the state quota also apply.</p><p lang="as">কেন্দ্ৰীয় আঁচনিৰ নিয়ম অনুসৰি MAT আৰু SAT মিলাই ন্যূনতম 40% নম্বৰ; SC/ST-ৰ বাবে 32%। কেৱল উত্তীৰ্ণ নম্বৰ পালেই জলপানি নিশ্চিত নহয়; মেধা, যোগ্যতা আৰু ৰাজ্যৰ নিৰ্ধাৰিত আসনো প্ৰযোজ্য।</p></article>
 <article class="collection-card"><h3>Apply for the Assam exam / <span lang="as">অসমৰ পৰীক্ষাৰ বাবে আবেদন</span></h3><ol><li>Open the NMMS 2026 application notice on <a href="https://bidyarthi.co.in/" target="_blank" rel="noopener noreferrer">Bidyarthi ↗</a>.</li><li>Check eligibility and the documents required in that notice. Keep Class VII marks, income and applicable category/disability documents ready.</li><li>Complete the entrance-exam application and retain its acknowledgement. Download the admit card when released.</li></ol><p lang="as">বিদ্যাৰ্থী পৰ্টেলত চলিত NMMS জাননী খুলি যোগ্যতা আৰু প্ৰয়োজনীয় নথি চাবা। আবেদন সম্পূৰ্ণ কৰি প্ৰাপ্তিস্বীকাৰ ৰাখিবা আৰু প্ৰকাশ পালে প্ৰৱেশপত্ৰ ডাউনলোড কৰিবা।</p></article>
 <article class="collection-card"><h3>After selection: NSP / <span lang="as">বাছনিৰ পিছত NSP</span></h3><p>Entrance-exam registration and the scholarship application are separate. Selected eligible students must complete the fresh Class IX application through the <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer">National Scholarship Portal ↗</a>, including OTR as required. School and district verification must be completed within the published deadlines. Renew in Classes X–XII and keep the payment bank account active.</p><p lang="as">বাছনি পৰীক্ষাৰ আবেদন আৰু জলপানিৰ আবেদন পৃথক। বাছনি হোৱা যোগ্য শিক্ষাৰ্থীয়ে NSP-ত প্ৰয়োজনীয় OTR-সহ নৱম শ্ৰেণীৰ নতুন আবেদন কৰিব লাগে। বিদ্যালয় আৰু জিলা পৰ্যায়ৰ সত্যাপন সময়মতে সম্পূৰ্ণ কৰিব লাগে। দশম–দ্বাদশ শ্ৰেণীত নৱীকৰণ আৰু বেংক একাউণ্ট সক্ৰিয় ৰখা প্ৰয়োজন।</p></article>
 <article class="collection-card"><h3>Renewal / <span lang="as">নৱীকৰণ</span></h3><p>Renewal requires continued eligibility and promotion in the first attempt. The Ministry’s current summary specifies clear promotion from IX to X and XI to XII, and at least 60% in Class X (55% for SC/ST) for higher-secondary continuation. Follow the applicable Assam and NSP renewal notice for your session.</p><p lang="as">নৱীকৰণৰ বাবে যোগ্যতা বজাই ৰাখি প্ৰথম প্ৰচেষ্টাত পৰৱৰ্তী শ্ৰেণীলৈ উত্তীৰ্ণ হ’ব লাগে। কেন্দ্ৰীয় সাৰাংশ অনুসৰি নৱমৰ পৰা দশম আৰু একাদশৰ পৰা দ্বাদশলৈ উত্তীৰ্ণতা, তথা উচ্চতৰ মাধ্যমিকত অব্যাহত ৰাখিবলৈ দশমত ন্যূনতম 60% (SC/ST-ৰ বাবে 55%) লাগে। নিজৰ শিক্ষাবৰ্ষৰ অসম আৰু NSP-ৰ নৱীকৰণ জাননী মানি চলিবা।</p></article>
 <article class="collection-card"><h3>Previous result: NMMS 2025 / <span lang="as">পূৰ্বৰ ফলাফল</span></h3><p>The supplied Assam result booklet records the exam on 13 December 2025 and result declaration on 18 March 2026, for the scholarship session 2026–27. These are historical dates, separate from the NMMS 2026 entrance examination.</p><p lang="as">দিয়া ফলাফল পুস্তিকা অনুসৰি 2025-ৰ পৰীক্ষা 13 ডিচেম্বৰ 2025-ত আৰু ফলাফল 18 মাৰ্চ 2026-ত ঘোষণা কৰা হৈছিল; জলপানিৰ শিক্ষাবৰ্ষ 2026–27। এইবোৰ পূৰ্বৰ তাৰিখ, 2026-ৰ বাছনি পৰীক্ষাৰ তাৰিখ নহয়।</p><p><a class="text-link" href="https://bidyarthi.co.in/" target="_blank" rel="noopener noreferrer">Official results and notices ↗</a></p></article>
 </div>
 <section class="content-block"><h3>Practice on Xohopathi / <span lang="as">অনুশীলন</span></h3><p>9 MAT tests and 9 SAT tests · 10 questions per test · 10 minutes · +1 for a correct answer and 0 for a wrong or unanswered question. MAT includes bilingual explanations after submission.</p><p lang="as">9টা MAT আৰু 9টা SAT টেষ্ট। প্ৰতিটোত 10টা প্ৰশ্ন আৰু 10 মিনিট। শুদ্ধ উত্তৰত +1; ভুল বা উত্তৰ নিদিলে 0। MAT জমা দিয়াৰ পিছত দ্বিভাষিক ব্যাখ্যা পোৱা যাব।</p><div class="test-links"><a href="#nmms-2026/mock-tests/2024/mat">Start MAT →</a><a href="#nmms-2026/mock-tests/2024/sat">Start SAT →</a></div></section>
 <section class="content-block nmms-sources"><h3>Official sources / <span lang="as">চৰকাৰী উৎস</span></h3><ul><li><a href="https://bidyarthi.co.in/" target="_blank" rel="noopener noreferrer">Assam Bidyarthi: current applications and results ↗</a></li><li><a href="https://madhyamik.assam.gov.in/frontimpotentdata/nmmss-scholarship" target="_blank" rel="noopener noreferrer">Directorate of Secondary Education, Assam: exam overview ↗</a></li><li><a href="https://www.education.gov.in/sites/upload_files/mhrd/files/document-reports/MoE_AR_En.pdf" target="_blank" rel="noopener noreferrer">Ministry of Education Annual Report 2024–25: eligibility, selection and renewal ↗</a></li><li><a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer">National Scholarship Portal: scholarship applications and renewal ↗</a></li></ul><p class="scope-note">Eligibility and selection details use the Ministry’s updated scheme summary; older Assam overview material still shows the former ₹1.5 lakh income ceiling. Current ceiling: ₹3.5 lakh. The supplied 2025 Assam result booklet was also consulted for the NSP process and historical result dates.</p></section>
 </section>`;
}
function renderYouTube(){$('pageContent').innerHTML='<div class="breadcrumb"><a href="#home">Home</a><span>›</span><span>YouTube</span></div>'+heading('YouTube')+`<section class="youtube-card"><img src="assets/channel-banner.png" width="1672" height="941" alt="Xohopathi — Your Digital Companion"><div class="youtube-details"><h2>Xohopathi</h2><p>@xohopathi</p><a class="button" href="${CONFIG.youtube}" target="_blank" rel="noopener noreferrer">Open YouTube channel ↗</a></div></section><div class="community-links"><a href="${CONFIG.whatsapp}" class="whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp Group ↗</a><a href="#home">Mock tests &amp; materials →</a></div>`;}
function renderPage(){
 let route=currentRoute();const legacy={'mock-tests':'home',practice:'home','study-materials':'home',materials:'home','previous-papers':'home',exams:'home'};if(legacy[route]){location.replace('#'+legacy[route]);return;}
 const [page,...segments]=route.split('/');subjectFilter='All';searchTerm='';
 const nav=page.startsWith('nmms')?'nmms':page.startsWith('seba')?'seba':page.startsWith('ahsec')?'ahsec':page==='youtube'?'youtube':'home';
 document.querySelectorAll('[data-nav]').forEach(link=>{if(link.dataset.nav===nav)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 document.title=(nav==='home'?'Xohopathi':nav==='nmms'?'NMMS 2026':nav==='seba'?'SEBA 2027':nav==='ahsec'?'AHSEC 2027':'YouTube')+' | Your Digital Companion';
 if(nav==='nmms')renderNMMS(segments);else if(nav==='seba'||nav==='ahsec')renderBoard(nav,segments);else if(nav==='youtube')renderYouTube();else renderHome();
 window.scrollTo({top:0,behavior:'auto'});
}
$('year').textContent=new Date().getFullYear();
window.addEventListener('hashchange',renderPage);
fetch('assets/test-catalog.json').then(response=>{if(!response.ok)throw Error('Unavailable');return response.json();}).then(data=>{catalog=data;renderPage();}).catch(()=>{$('pageContent').innerHTML=heading('Mock Tests &amp; Study Materials')+'<p class="notice">The test list could not load. Please refresh this page.</p>';});
