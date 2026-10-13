const themeButton=document.getElementById('theme');
let saved=null;try{saved=localStorage.getItem('yiwen-theme')}catch(e){}
if(saved==='dark')document.body.classList.add('dark');
themeButton.addEventListener('click',()=>{document.body.classList.toggle('dark');(()=>{try{localStorage.setItem('yiwen-theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}})()});
document.getElementById('year').textContent=new Date().getFullYear();


// Stacked galleries: hover to focus, buttons/keyboard/swipe to browse.
const collectionData={games:[['Volcano Princess','Choices, characters, and growing up'],["Sultan’s Game",'Strategy, risk, and difficult decisions'],['Chants of Sennaar','Language puzzles and discovery'],['Yuppie Psycho','Surreal mystery and storytelling'],['Stardew Valley','Cozy days and little adventures'],['League of Legends','Teamwork, champions, and competition'],['Teamfight Tactics','Strategy, adaptation, and creative team compositions']],books:[['Gone with the Wind','Margaret Mitchell'],['Dream of the Red Chamber','Cao Xueqin'],['Verity','Colleen Hoover'],['Educated','Tara Westover'],['Studies on Wu Zetian','Meng Xianshi'],['Wuthering Heights','Emily Brontë'],['The Red and the Black','Stendhal'],['Greenlights','Matthew McConaughey · Currently reading']]};
document.querySelectorAll('[data-collection]').forEach(collection=>{
 const kind=collection.dataset.collection,items=[...collection.querySelectorAll('.stack-card')],viewport=collection.querySelector('.deck-viewport');let active=0,startX=null,hoverTimer=null,dragged=false;
 const wrap=n=>(n+items.length)%items.length;
 function render(){const spacing=Math.min(93,viewport.clientWidth*.20);items.forEach((card,i)=>{let offset=i-active;if(offset>items.length/2)offset-=items.length;if(offset< -items.length/2)offset+=items.length;const visible=Math.abs(offset)<=2;card.style.transform=`translateX(calc(-50% + ${offset*spacing}px)) translateY(${Math.abs(offset)*12}px) scale(${offset===0?1.08:.91})`;card.style.zIndex=String(10-Math.abs(offset));card.style.opacity=visible?'1':'0';card.style.pointerEvents=visible?'auto':'none';card.setAttribute('aria-pressed',String(i===active));card.tabIndex=visible?0:-1;});collection.querySelector('.deck-caption strong').textContent=collectionData[kind][active][0];collection.querySelector('.deck-caption span').textContent=collectionData[kind][active][1];}
 items.forEach((card,i)=>{card.addEventListener('mouseenter',()=>{clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>{if(!dragged){active=i;render()}},280)});card.addEventListener('mouseleave',()=>clearTimeout(hoverTimer));card.addEventListener('focus',()=>{clearTimeout(hoverTimer);active=i;render()});card.addEventListener('click',()=>{if(dragged)return;clearTimeout(hoverTimer);active=i;render()})});
 collection.querySelector('.deck-prev').addEventListener('click',()=>{active=wrap(active-1);render()});collection.querySelector('.deck-next').addEventListener('click',()=>{active=wrap(active+1);render()});
 viewport.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();active=wrap(active+(e.key==='ArrowRight'?1:-1));render()}});
 viewport.addEventListener('pointerdown',e=>{clearTimeout(hoverTimer);startX=e.clientX;dragged=false});viewport.addEventListener('pointerup',e=>{if(startX!==null&&Math.abs(e.clientX-startX)>85){dragged=true;active=wrap(active+(e.clientX<startX?1:-1));render()}startX=null;requestAnimationFrame(()=>dragged=false)});viewport.addEventListener('pointercancel',()=>{startX=null;dragged=false});
 window.addEventListener('resize',render);render();
});

// ChamberCrawler3000: accessible video dialog
(() => {
 const modal=document.getElementById('cc3k-video-modal');
 const video=document.getElementById('cc3k-player');
 if(!modal||!video)return;
 let previousFocus=null;
 function open(){previousFocus=document.activeElement;modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.cc3k-close').focus();}
 function close(){video.pause();modal.hidden=true;document.body.style.overflow='';if(previousFocus)previousFocus.focus();}
 document.querySelectorAll('.cc3k-open').forEach(button=>button.addEventListener('click',open));
 modal.querySelector('.cc3k-close').addEventListener('click',close);
 modal.addEventListener('click',event=>{if(event.target===modal)close();});
 document.addEventListener('keydown',event=>{if(!modal.hidden&&event.key==='Escape')close();});
})();
