'use strict';
const $=id=>document.getElementById(id);
let unlockedPayload=null,idleTimer=null,downloadURL=null;
const bytes=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
function lock(){unlockedPayload=null;clearTimeout(idleTimer);$('archiveFrame').srcdoc='';$('savedLinks').replaceChildren();$('openRoutine').textContent='Open school class routine ↗';$('archiveViewer').hidden=true;$('unlocked').hidden=true;$('locked').hidden=false;$('accessKey').value='';$('unlockStatus').textContent='';if(downloadURL){URL.revokeObjectURL(downloadURL);downloadURL=null;}}
function resetIdle(){if(unlockedPayload){clearTimeout(idleTimer);idleTimer=setTimeout(lock,15*60*1000);}}
$('unlockForm').addEventListener('submit',async event=>{
 event.preventDefault();const passphrase=$('accessKey').value.trim();if(!passphrase)return;
 $('unlockButton').disabled=true;$('unlockStatus').textContent='Unlocking your workspace…';
 try{
  const response=await fetch('vault.json',{cache:'no-store'});if(!response.ok)throw Error('load');const vault=await response.json();
  const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(passphrase),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:bytes(vault.salt),iterations:vault.iterations},material,{name:'AES-GCM',length:256},false,['decrypt']);
  const decrypted=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(vault.iv)},key,bytes(vault.ciphertext));
  unlockedPayload=JSON.parse(new TextDecoder().decode(decrypted));$('accessKey').value='';
  const archivedDocument=new DOMParser().parseFromString(unlockedPayload.homepage,'text/html');
  const routineTitle=archivedDocument.getElementById('routineTitle')?.textContent.trim();
  $('openRoutine').textContent=(routineTitle||'Open school class routine')+' ↗';
  $('savedLinks').replaceChildren();for(const item of unlockedPayload.links){const link=document.createElement('a');link.textContent=item.title+' ↗';link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';$('savedLinks').append(link);}
  $('locked').hidden=true;$('unlocked').hidden=false;$('unlockStatus').textContent='';resetIdle();$('lockButton').focus();
 }catch(error){$('unlockStatus').textContent=error.message==='load'?'The archive could not load. Please try again.':'Unable to unlock. Check the access key in your local archive.';$('accessKey').value='';$('accessKey').focus();}
 finally{$('unlockButton').disabled=false;}
});
$('lockButton').addEventListener('click',()=>{lock();$('accessKey').focus();});
function openArchivedPage(mode){
 if(!unlockedPayload)return;
 const base=new URL('../',location.href).href;
 const openRoutine=mode==='routine';
 const activityScript='<script>for(const event of ["pointerdown","keydown","scroll"])document.addEventListener(event,()=>parent.postMessage("owner-workspace-activity","*"),{passive:true});'+(openRoutine?'showPage("teacher-corner",false);openRoutineModal();':'')+'</script>';
 $('archiveFrame').srcdoc=unlockedPayload.homepage.replace('<head>','<head><base href="'+base+'" target="_blank">').replace(/history\.pushState\([^;]*\);/g,'').replace('</body>',activityScript+'</body>');
 $('archiveViewerHeading').textContent=openRoutine?'School class routine':'Archived homepage';
 $('archiveFrame').title=openRoutine?'Private school class routine':'Private archived school homepage';
 $('archiveViewer').hidden=false;$('archiveViewer').scrollIntoView({behavior:'smooth'});resetIdle();
}
$('openArchive').addEventListener('click',()=>openArchivedPage('home'));
$('openRoutine').addEventListener('click',()=>openArchivedPage('routine'));
$('closeArchive').addEventListener('click',()=>{$('archiveFrame').srcdoc='';$('archiveViewer').hidden=true;});
$('downloadArchive').addEventListener('click',()=>{if(!unlockedPayload)return;if(downloadURL)URL.revokeObjectURL(downloadURL);downloadURL=URL.createObjectURL(new Blob([bytes(unlockedPayload.archive)],{type:'application/zip'}));const link=document.createElement('a');link.href=downloadURL;link.download='xohopathi-original-private-archive.zip';link.click();resetIdle();});
for(const event of ['pointerdown','keydown','scroll'])document.addEventListener(event,resetIdle,{passive:true});
window.addEventListener('pagehide',lock);
window.addEventListener('message',event=>{if(event.source===$('archiveFrame').contentWindow&&event.data==='owner-workspace-activity')resetIdle();});
