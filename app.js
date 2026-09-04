let lessons=[];
const state={
  lessonIndex:0,
  reviewMode:"word",
  reviewIndex:0,
  spellIndex:0
};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function getStore(){
  try{return JSON.parse(localStorage.getItem("idInterviewEnglishState")||"{}")}catch(e){return{}}
}
function setStore(obj){localStorage.setItem("idInterviewEnglishState",JSON.stringify(obj))}
function todayKey(){return new Date().toISOString().slice(0,10)}
function dateSeed(){
  const start=new Date("2026-09-04T00:00:00");
  const now=new Date();
  return Math.max(0,Math.floor((now-start)/(86400000)));
}
function ensureStore(){
  const s=getStore();
  if(!s.completed)s.completed={};
  if(!s.answers)s.answers={};
  if(!s.stats)s.stats={reviews:0,spelling:0,answers:0};
  if(typeof s.lessonIndex!=="number")s.lessonIndex=dateSeed()%lessons.length;
  setStore(s);
  state.lessonIndex=Math.min(s.lessonIndex,lessons.length-1);
}
function saveLessonIndex(){const s=getStore();s.lessonIndex=state.lessonIndex;setStore(s)}
function lesson(){return lessons[state.lessonIndex]}
function speak(text,rate=.88){
  if(!("speechSynthesis" in window)){toast("這個瀏覽器不支援語音播放");return}
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-US";u.rate=rate;u.pitch=1;
  const voices=speechSynthesis.getVoices();
  const us=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith("en-us"))||voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith("en"));
  if(us)u.voice=us;
  speechSynthesis.speak(u);
}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.remove("hidden");setTimeout(()=>el.classList.add("hidden"),1700)}
function dayData(){
  const s=getStore(); const key=String(lesson().day);
  if(!s.completed[key])s.completed[key]={words:[],phrases:[],shadow:false,spelling:false,review:false,answer:false};
  setStore(s); return s.completed[key];
}
function updateProgress(){
  const d=dayData();
  const done=d.words.length+d.phrases.length+(d.shadow?1:0)+(d.spelling?1:0)+(d.review?1:0)+(d.answer?1:0);
  const pct=Math.round(done/12*100);
  $("#progressText").textContent=pct+"%";$("#progressBar").style.width=pct+"%";
}
function render(){
  const l=lesson(),d=dayData();
  $("#title").textContent=`Day ${l.day} · ${l.title}`;
  $("#subtitle").textContent=l.theme_zh+" · Simple professional English";
  $("#dayLabel").textContent=`Day ${l.day}`;
  $("#shadowText").textContent=l.shadow;
  $("#question").textContent=l.question;
  $("#structure").innerHTML=l.structure.map(x=>`<div>${x}</div>`).join("");
  $("#modelAnswer").textContent=l.model;
  $("#answerInput").value=(getStore().answers||{})[String(l.day)]||"";
  $("#vocabList").innerHTML=l.vocab.map((v,i)=>`
    <div class="item">
      <div class="itemTop">
        <div>
          <div class="word">${i+1}. ${v[0]} <span class="zh">· ${v[1]}</span></div>
          <div class="definition">${v[2]}</div>
          <div class="example">“${v[3]}”</div>
        </div>
        <div class="actions">
          <button data-word="${i}">Word audio</button>
          <button data-sentence="${i}">Sentence</button>
          <button data-done-word="${i}" class="${d.words.includes(i)?"done":""}">${d.words.includes(i)?"Done":"Mark"}</button>
        </div>
      </div>
    </div>`).join("");
  $("#phraseList").innerHTML=l.phrases.map((p,i)=>`
    <div class="item">
      <div class="itemTop">
        <div>
          <div class="word">${p[0]} <span class="zh">· ${p[1]}</span></div>
          <div class="example">“${p[2]}”</div>
        </div>
        <div class="actions">
          <button data-phrase-audio="${i}">Example audio</button>
          <button data-done-phrase="${i}" class="${d.phrases.includes(i)?"done":""}">${d.phrases.includes(i)?"Done":"Mark"}</button>
        </div>
      </div>
    </div>`).join("");
  bindDynamic();
  state.reviewIndex=0;state.spellIndex=0;
  renderReview();resetSpell();renderStats();updateProgress();
}
function bindDynamic(){
  $$("[data-word]").forEach(b=>b.onclick=()=>speak(lesson().vocab[+b.dataset.word][0],.8));
  $$("[data-sentence]").forEach(b=>b.onclick=()=>speak(lesson().vocab[+b.dataset.sentence][3],.88));
  $$("[data-phrase-audio]").forEach(b=>b.onclick=()=>speak(lesson().phrases[+b.dataset.phraseAudio][2],.88));
  $$("[data-done-word]").forEach(b=>b.onclick=()=>{
    const s=getStore(),k=String(lesson().day),i=+b.dataset.doneWord,d=s.completed[k];
    d.words=d.words.includes(i)?d.words.filter(x=>x!==i):[...d.words,i];
    setStore(s);b.classList.toggle("done");updateProgress();renderStats();
  });
  $$("[data-done-phrase]").forEach(b=>b.onclick=()=>{
    const s=getStore(),k=String(lesson().day),i=+b.dataset.donePhrase,d=s.completed[k];
    d.phrases=d.phrases.includes(i)?d.phrases.filter(x=>x!==i):[...d.phrases,i];
    setStore(s);b.classList.toggle("done");updateProgress();renderStats();
  });
}
function renderReview(){
  const l=lesson();
  $("#reviewBack").classList.add("hidden");
  if(state.reviewMode==="word"){
    const v=l.vocab[state.reviewIndex%l.vocab.length];
    $("#reviewFront").textContent=v[0];
    $("#reviewBack").innerHTML=`<b>${v[1]}</b> · ${v[2]}<br><br>“${v[3]}”`;
  }else{
    const p=l.phrases[state.reviewIndex%l.phrases.length];
    $("#reviewFront").textContent=p[1];
    $("#reviewBack").innerHTML=`<b>${p[0]}</b><br><br>“${p[2]}”`;
  }
}
function reviewAudio(){
  if(state.reviewMode==="word")speak(lesson().vocab[state.reviewIndex%lesson().vocab.length][0],.8);
  else speak(lesson().phrases[state.reviewIndex%lesson().phrases.length][2],.88);
}
function nextReview(markGood=false){
  if(markGood){
    const s=getStore(),k=String(lesson().day);s.stats.reviews++;s.completed[k].review=true;setStore(s);
  }
  state.reviewIndex++;renderReview();renderStats();updateProgress();
}
function resetSpell(){$("#spellInput").value="";$("#spellFeedback").textContent=""}
function renderStats(){
  const s=getStore();
  const completed=Object.values(s.completed||{});
  const wordCount=completed.reduce((n,d)=>n+(d.words||[]).length,0);
  const phraseCount=completed.reduce((n,d)=>n+(d.phrases||[]).length,0);
  const days=completed.filter(d=>(d.words||[]).length+(d.phrases||[]).length+(d.shadow?1:0)+(d.spelling?1:0)+(d.review?1:0)+(d.answer?1:0)>0).length;
  $("#stats").innerHTML=`
    <div class="stat"><div class="muted small">Words completed</div><div class="statValue">${wordCount}</div></div>
    <div class="stat"><div class="muted small">Phrases completed</div><div class="statValue">${phraseCount}</div></div>
    <div class="stat"><div class="muted small">Spelling correct</div><div class="statValue">${s.stats.spelling||0}</div></div>
    <div class="stat"><div class="muted small">Practice days</div><div class="statValue">${days}</div></div>`;
}
function activateTab(name){
  $$(".tab").forEach(x=>x.classList.toggle("active",x.dataset.tab===name));
  $$(".panel").forEach(x=>x.classList.toggle("active",x.id===name));
}
$$(".tab").forEach(b=>b.onclick=()=>activateTab(b.dataset.tab));
$("#shadowPlay").onclick=()=>speak(lesson().shadow,.88);
$("#shadowSlow").onclick=()=>speak(lesson().shadow,.68);
$("#shadowDone").onclick=()=>{
  const s=getStore(),k=String(lesson().day);s.completed[k].shadow=true;setStore(s);updateProgress();renderStats();toast("Shadowing completed")
};
$("#reviewWord").onclick=()=>{state.reviewMode="word";state.reviewIndex=0;$("#reviewWord").classList.add("active");$("#reviewSentence").classList.remove("active");renderReview()};
$("#reviewSentence").onclick=()=>{state.reviewMode="sentence";state.reviewIndex=0;$("#reviewSentence").classList.add("active");$("#reviewWord").classList.remove("active");renderReview()};
$("#reviewAudio").onclick=reviewAudio;
$("#reviewReveal").onclick=()=>$("#reviewBack").classList.remove("hidden");
$("#reviewAgain").onclick=()=>nextReview(false);
$("#reviewHard").onclick=()=>nextReview(false);
$("#reviewGood").onclick=()=>nextReview(true);
$("#spellPlay").onclick=()=>speak(lesson().vocab[state.spellIndex%lesson().vocab.length][0],.78);
$("#spellHint").onclick=()=>{
  const w=lesson().vocab[state.spellIndex%lesson().vocab.length][0];
  $("#spellFeedback").textContent=`Hint: ${w[0]} ${"• ".repeat(Math.max(0,w.length-2))}${w[w.length-1]}`;
};
$("#spellCheck").onclick=()=>{
  const target=lesson().vocab[state.spellIndex%lesson().vocab.length][0];
  const val=$("#spellInput").value.trim().toLowerCase();
  if(!val){$("#spellFeedback").textContent="請先輸入拼字。";return}
  if(val===target.toLowerCase()){
    const s=getStore(),k=String(lesson().day);s.stats.spelling++;s.completed[k].spelling=true;setStore(s);
    $("#spellFeedback").textContent=`Correct — ${target}`;renderStats();updateProgress();
  }else $("#spellFeedback").textContent="Not yet. Listen again and try one more time.";
};
$("#spellNext").onclick=()=>{state.spellIndex=(state.spellIndex+1)%lesson().vocab.length;resetSpell();speak(lesson().vocab[state.spellIndex][0],.78)};
$("#answerSave").onclick=()=>{
  const val=$("#answerInput").value.trim();
  if(!val){toast("請先寫 2–3 句英文");return}
  const s=getStore(),k=String(lesson().day);s.answers[k]=val;s.stats.answers++;s.completed[k].answer=true;setStore(s);renderStats();updateProgress();toast("Answer saved")
};
$("#modelShow").onclick=()=>$("#modelAnswer").classList.toggle("hidden");
$("#modelPlay").onclick=()=>speak(lesson().model,.84);
$("#nextDay").onclick=()=>{state.lessonIndex=(state.lessonIndex+1)%lessons.length;saveLessonIndex();render();window.scrollTo({top:0,behavior:"smooth"})};
$("#prevDay").onclick=()=>{state.lessonIndex=(state.lessonIndex-1+lessons.length)%lessons.length;saveLessonIndex();render();window.scrollTo({top:0,behavior:"smooth"})};
$("#resetProgress").onclick=()=>{if(confirm("確定要清除所有學習紀錄嗎？")){localStorage.removeItem("idInterviewEnglishState");ensureStore();render();toast("Progress reset")}};
fetch("data/lessons.json").then(r=>r.json()).then(data=>{
  lessons=data;ensureStore();render();
  if("serviceWorker" in navigator)navigator.serviceWorker.register("service-worker.js").catch(()=>{});
}).catch(()=>{$("#title").textContent="Unable to load lesson data";$("#subtitle").textContent="Please open the app through a local or web server.";});


(function(){
  const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
  const standalone=window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const help=document.getElementById('installHelp');
  if(help && isIOS && !standalone && localStorage.getItem('hideInstallHelp')!=='1'){
    help.classList.remove('hidden');
  }
  const dismiss=document.getElementById('dismissInstall');
  if(dismiss) dismiss.addEventListener('click',()=>{
    help.classList.add('hidden');
    localStorage.setItem('hideInstallHelp','1');
  });

  // Preload voices on iOS Safari when available.
  if('speechSynthesis' in window){
    window.speechSynthesis.getVoices();
  }
})();
