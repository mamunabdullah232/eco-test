/* KaTeX 0.19.1 is self-hosted with its MIT license in assets/vendor/katex/. */
(() => {
 'use strict';
 const assetBase=new URL('.',document.currentScript.src);
 const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const delimiters=/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
 let pending=null;
 function script(name){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=new URL('vendor/katex/'+name,assetBase).href;s.onload=resolve;s.onerror=()=>reject(Error('Equation renderer could not load'));document.head.append(s);});}
 function load(){if(pending)return pending;pending=(async()=>{const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href=new URL('vendor/katex/katex.min.css',assetBase).href;const ready=new Promise((resolve,reject)=>{sheet.onload=resolve;sheet.onerror=()=>reject(Error('Equation styles could not load'));});document.head.append(sheet);await Promise.all([script('katex.min.js'),ready]);await script('mhchem.min.js');})();return pending;}
 function renderHTML(value){const source=String(value??'');let html='',offset=0;for(const match of source.matchAll(delimiters)){html+=escape(source.slice(offset,match.index));const tex=match[1]??match[2];const display=match[2]!==undefined;try{if(!window.katex)throw Error('Renderer not ready');html+=`<span class="${display?'math-display':'math-inline'}">`+window.katex.renderToString((display?'':'\\displaystyle ')+tex,{displayMode:display,throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml',maxSize:8,maxExpand:1000})+'</span>';}catch(error){html+='<span class="math-fallback">'+escape(tex)+'</span>';}offset=match.index+match[0].length;}return html+escape(source.slice(offset));}
 window.XohopathiMath={load,renderHTML,containsMath:value=>/\\\(|\\\[/.test(JSON.stringify(value??''))};
})();
