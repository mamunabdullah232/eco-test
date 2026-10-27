'use strict';
const CONFIG={nmmsYear:2026,sebaYear:2027,ahsecYear:2027,youtube:'https://www.youtube.com/@xohopathi',whatsapp:'https://chat.whatsapp.com/JRFtUEqDKnz0rQMYOrTxVC'};
const $=id=>document.getElementById(id);
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let catalog=[],subjectFilter='All',searchTerm='';
const levelOf=test=>test.exam==='NMMS'?'nmms-sat':test.group==='Kids'?'kids':'class-'+(test.group.match(/\d+/)?.[0]||'');
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
 const levels=['kids','class-6','class-8','class-10','class-12'];
 const featured=catalog.filter(t=>levelOf(t)==='class-12');
 const sat=catalog.filter(t=>t.exam==='NMMS'&&t.paper==='SAT');
 $('pageContent').innerHTML=heading('Mock Tests &amp; Study Materials',catalog.length+' tests')+searchBox()+`
 <div id="homeOverview">
 <section class="exam-grid" aria-label="Exam sections">
 <a class="exam-card nmms" href="#nmms-2026"><span class="exam-year">2026</span><b>NMMS</b><small>MAT · SAT</small><span class="arrow" aria-hidden="true">↗</span></a>
 <a class="exam-card seba" href="#seba-2027"><span class="exam-year">2027</span><b>SEBA</b><small>Kids – Class 10</small><span class="arrow" aria-hidden="true">↗</span></a>
 <a class="exam-card ahsec" href="#ahsec-2027"><span class="exam-year">2027</span><b>AHSEC</b><small>Classes 11 &amp; 12</small><span class="arrow" aria-hidden="true">↗</span></a></section>
 <div class="community-links"><a class="youtube" href="#youtube"><span>▶ YouTube</span><span aria-hidden="true">↗</span></a><a class="whatsapp" href="${CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer"><span>WhatsApp Group</span><span aria-hidden="true">↗</span></a></div>
 ${sectionHeading('Available mock tests')}
 <div class="class-grid">${levels.map(level=>`<a class="class-card" href="#${level==='class-12'?'ahsec-2027':'seba-2027'}/${level}"><span><b>${className(level)}</b><small>${countFor(level)} tests${['class-6','class-8'].includes(level)?' · CBSE':''}</small></span><span class="arrow" aria-hidden="true">↗</span></a>`).join('')}</div>
 <div class="home-columns"><section class="content-block"><h2>NMMS 2026</h2><div class="nmms-links"><a href="#nmms-2026/mat">MAT ↗<small>Mock tests coming soon</small></a><a href="#nmms-2026/sat">SAT ↗<small>${sat.length} practice tests · 90 MCQs</small></a></div>${testLinks(sat,true,'nmms-2026/sat')}</section>
 <section class="content-block"><h2>Class 12 · Economics</h2><p>Part 2 · 20 MCQs per test · 20 minutes</p>${testLinks(featured,true,'ahsec-2027/class-12')}</section></div>
 ${sectionHeading('Study materials')}${resourceLinks(['textbooks','english','social'])}
 </div><div id="homeSearchResults" hidden></div>`;
 bindSearch(true);
}
function groupTests(tests){const map=new Map();for(const t of tests){const key=[t.group,t.subject,t.section,t.chapter].join('|');if(!map.has(key))map.set(key,[]);map.get(key).push(t);}return [...map.values()];}
function renderCards(tests,back=currentRoute()){
 if(!tests.length)return '<div class="empty"><h2>No matching tests</h2><p>Try another subject or clear the search.</p></div>';
 return `<div class="collection-grid">${groupTests(tests).map(group=>{const first=group[0];const title=levelOf(first)==='class-12'?'Part 2 · Indian Economic Development':first.chapter||first.section||first.subject;return `<article class="collection-card"><div class="meta">${escapeHTML(first.group)} · ${escapeHTML(first.subject)}${first.section&&first.section!==first.subject?' · '+escapeHTML(first.section):''}</div><h3>${escapeHTML(title)}</h3>${first.chapterAs&&first.chapterAs!==title?`<div class="chapter-as" lang="as">${escapeHTML(first.chapterAs)}</div>`:''}${testLinks(group,false,back)}</article>`;}).join('')}</div>`;
}
function matches(test,query){return [test.group,test.subject,test.section,test.chapter,test.chapterAs,test.title].join(' ').toLowerCase().includes(query.toLowerCase().trim());}
function bindSearch(home=false){const input=$('testSearch');input.closest('form').addEventListener('submit',e=>e.preventDefault());input.addEventListener('input',()=>{searchTerm=input.value;if(home){const active=searchTerm.trim().length>0;$('homeOverview').hidden=active;$('homeSearchResults').hidden=!active;if(active){const found=catalog.filter(t=>matches(t,searchTerm));$('homeSearchResults').innerHTML=`<p class="result-count" role="status">${found.length} matching tests</p>`+renderCards(found,'home');}}else renderScopedResults();});}
let scopedTests=[];
function renderScopedResults(){const found=scopedTests.filter(t=>(subjectFilter==='All'||t.subject===subjectFilter)&&matches(t,searchTerm));$('testResults').innerHTML=`<p class="result-count" role="status">${found.length} tests</p>`+renderCards(found);}
function renderLibrary(tests){scopedTests=tests;const subjects=['All',...new Set(tests.map(t=>t.subject))];return searchBox(searchTerm)+(subjects.length>2?`<div class="subject-tabs" role="group" aria-label="Filter subjects">${subjects.map(subject=>`<button data-subject="${escapeHTML(subject)}" aria-pressed="${subject===subjectFilter}">${escapeHTML(subject)}</button>`).join('')}</div>`:'')+'<div id="testResults"></div>';}
function bindLibrary(){bindSearch();document.querySelectorAll('[data-subject]').forEach(button=>button.addEventListener('click',()=>{subjectFilter=button.dataset.subject;document.querySelectorAll('[data-subject]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderScopedResults();}));renderScopedResults();}
function classTabs(type,selected){const levels=type==='seba'?['kids',...Array.from({length:10},(_,i)=>'class-'+(i+1))]:['class-11','class-12'];const route=type==='seba'?'seba-2027':'ahsec-2027';return `<nav class="class-tabs ${type==='seba'?'seba-classes':'ahsec-classes'}" aria-label="Choose class">${levels.map(level=>`<a href="#${route}/${level}" ${level===selected?'aria-current="page"':''}>${className(level)}<small>${countFor(level)?countFor(level)+' tests':'Coming soon'}</small></a>`).join('')}</nav>`;}
function renderBoard(type,level){
 const seba=type==='seba';const title=seba?'SEBA 2027':'AHSEC 2027';const allowed=seba?['kids',...Array.from({length:10},(_,i)=>'class-'+(i+1))]:['class-11','class-12'];if(!allowed.includes(level))level=seba?'class-10':'class-12';
 const tests=catalog.filter(t=>levelOf(t)===level);
 $('pageContent').innerHTML=`<div class="breadcrumb"><a href="#home">Home</a><span>›</span><span>${title}</span></div>`+heading(title)+classTabs(type,level)+`<h2 class="scope-title">${className(level)} · Mock Tests</h2>`+(['class-6','class-8'].includes(level)?'<p class="scope-note">Current sets: CBSE Social Science foundation practice. SEBA-specific sets have not been added yet.</p>':'')+(tests.length?renderLibrary(tests):`<section class="empty"><h2>${className(level)} mock tests coming soon</h2><p>Study materials are available below.</p></section>`)+sectionHeading('Study materials')+resourceLinks(seba?['textbooks','english','social']:['textbooks']);
 if(tests.length)bindLibrary();
}
function renderNMMS(stream){const mat=stream==='mat';const tests=catalog.filter(t=>t.exam==='NMMS'&&t.paper==='SAT');
 $('pageContent').innerHTML='<div class="breadcrumb"><a href="#home">Home</a><span>›</span><span>NMMS 2026</span></div>'+heading('NMMS 2026')+`<nav class="stream-tabs" aria-label="NMMS paper"><a href="#nmms-2026/mat" ${mat?'aria-current="page"':''}>MAT</a><a href="#nmms-2026/sat" ${!mat?'aria-current="page"':''}>SAT</a></nav><h2 class="scope-title">${mat?'Mental Ability Test (MAT)':'Scholastic Aptitude Test (SAT)'}</h2>`+(mat?'<section class="empty"><h2>MAT mock tests coming soon</h2><p><a href="#nmms-2026/sat">Open SAT foundation practice →</a></p></section>':'<p class="scope-note">9 short SAT practice tests · 10 MCQs each · Mathematics 3, Science 4, Social Science 3 · No negative marking. These are practice sets, not official full-length papers.</p>'+renderLibrary(tests))+sectionHeading('Study materials')+resourceLinks(['nmms','textbooks']);if(!mat)bindLibrary();
}
function renderYouTube(){$('pageContent').innerHTML='<div class="breadcrumb"><a href="#home">Home</a><span>›</span><span>YouTube</span></div>'+heading('YouTube')+`<section class="youtube-card"><img src="assets/channel-banner.png" width="1672" height="941" alt="Xohopathi — Your Digital Companion"><div class="youtube-details"><h2>Xohopathi</h2><p>@xohopathi</p><a class="button" href="${CONFIG.youtube}" target="_blank" rel="noopener noreferrer">Open YouTube channel ↗</a></div></section><div class="community-links"><a href="${CONFIG.whatsapp}" class="whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp Group ↗</a><a href="#home">Mock tests &amp; materials →</a></div>`;}
function renderPage(){
 let route=currentRoute();const legacy={'mock-tests':'home',practice:'home','study-materials':'home',materials:'home','previous-papers':'home',exams:'home'};if(legacy[route]){location.replace('#'+legacy[route]);return;}
 const [page,level]=route.split('/');subjectFilter='All';searchTerm='';
 const nav=page.startsWith('nmms')?'nmms':page.startsWith('seba')?'seba':page.startsWith('ahsec')?'ahsec':page==='youtube'?'youtube':'home';
 document.querySelectorAll('[data-nav]').forEach(link=>{if(link.dataset.nav===nav)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 document.title=(nav==='home'?'Xohopathi':nav==='nmms'?'NMMS 2026':nav==='seba'?'SEBA 2027':nav==='ahsec'?'AHSEC 2027':'YouTube')+' | Your Digital Companion';
 if(nav==='nmms')renderNMMS(level);else if(nav==='seba'||nav==='ahsec')renderBoard(nav,level);else if(nav==='youtube')renderYouTube();else renderHome();
 window.scrollTo({top:0,behavior:'auto'});
}
$('year').textContent=new Date().getFullYear();
window.addEventListener('hashchange',renderPage);
fetch('assets/test-catalog.json').then(response=>{if(!response.ok)throw Error('Unavailable');return response.json();}).then(data=>{catalog=data;renderPage();}).catch(()=>{$('pageContent').innerHTML=heading('Mock Tests &amp; Study Materials')+'<p class="notice">The test list could not load. Please refresh this page.</p>';});
