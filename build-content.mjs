import fs from 'node:fs';
import {topics,commonGlossary,extraGlossary} from './interview-content.js';
const rows=JSON.parse(fs.readFileSync(new URL('./henry-data.json',import.meta.url)));
const followups=`Which part of design do you enjoy most?|你最喜歡設計的哪一部分？|I enjoy turning an early idea into a product that can be made.|我喜歡把早期想法變成能製造的產品。
What could you bring to our team?|你能為團隊帶來什麼？|I could bring experience with materials, samples, and production.|我能帶來材料、樣品與量產經驗。
What are you looking for next?|你下一步追求什麼？|I want to take responsibility for design decisions and keep learning.|我想承擔設計決策責任，也持續學習。
Can you name one example?|能舉一個例子嗎？|The fragrance mouse shows how I connect design with material testing.|香氛滑鼠展現我如何連結設計與材料測試。
How would you build that skill?|你會如何培養這項能力？|I would join technical reviews earlier and learn from engineers.|我會更早參與技術評審，向工程師學習。
Why do you use physical samples?|你為何使用實體樣品？|They help me check comfort and fit beyond what I see on a screen.|它們能讓我確認螢幕以外的舒適度與合適程度。
Was that a large user study?|那是大型使用者研究嗎？|No, it was internal feedback, and I would want broader testing.|不是，那是內部回饋，我會希望有更廣泛的測試。
How does research affect your design?|研究如何影響設計？|It helps me define a clear product direction before choosing details.|它幫助我在選擇細節前，先定義清楚的產品方向。
What needed careful testing?|哪些部分需要仔細測試？|We checked oils and materials for compatibility with the product parts.|我們確認精油及材料與產品零件的相容性。
What evidence would you want next?|接下來你想取得什麼證據？|I would want to know whether people keep using the scent feature.|我想知道人們是否持續使用香氛功能。
What was the main user need?|主要使用需求是什麼？|We focused on carrying comfort, weight balance, and laptop protection.|我們重視背負舒適度、重量平衡與筆電保護。
Was the final result your work alone?|最終成果是你獨力完成的嗎？|No, the final product was a team effort with product managers and suppliers.|不是，最終產品是與產品經理及供應商共同努力的成果。
Did you design the electronics?|你負責電子設計嗎？|My role was industrial design and related product details.|我的角色是工業設計及相關產品細節。
How did the bags stay connected?|這些包款如何維持系列感？|They shared a design language while meeting different needs.|它們共用設計語言，同時滿足不同需求。
When did you join the project?|你在什麼階段加入？|I joined during later development and revised the existing design.|我在後期開發加入，修改既有設計。
When should cost be discussed?|什麼時候應該討論成本？|I would discuss it early, while there is still room to adjust the design.|我會及早討論，趁設計還能調整時處理。
Why not judge color from a rendering?|為何不只用渲染圖判斷顏色？|A physical sample shows color and texture more clearly.|實體樣品能更清楚呈現顏色與質感。
Would one model fit every user?|一個模型適合所有使用者嗎？|No, different users may need different sizes or adjustments.|不一定，不同使用者可能需要不同尺寸或調整。
What would you try to protect?|你會保留什麼？|I would protect the main user benefit while exploring other solutions.|我會保留主要使用價值，同時探索其他解法。
What if the team chooses another option?|若團隊選擇其他方案呢？|I would support the decision and keep track of remaining design risks.|我會支持決策，並追蹤剩餘設計風險。
Would you accept every suggestion?|每項建議你都會接受嗎？|I would compare each suggestion with the project goals and explain any trade-off.|我會對照專案目標，說明各項建議的取捨。
Was the original design your mistake?|原設計是你的失誤嗎？|No, I joined later, so I would use another real example for a personal mistake.|不是，我後來才加入；若問個人失誤，我會用另一個真實例子。
What would you do about conflicting deadlines?|期限衝突時怎麼辦？|I would raise the issue early and confirm priorities with the team lead.|我會及早提出，與主管確認優先順序。
Was this a formal management role?|這是正式的人事管理職嗎？|I led project work and workshops; that is the experience I can describe.|我帶領專案工作與工作坊，這是我能說明的經驗。
How would you support other designers?|你會如何支持其他設計師？|I would share what I have learned from materials and production reviews.|我會分享從材料與量產評審學到的經驗。
Can an AI image go straight into production?|AI 圖像能直接量產嗎？|No, it still needs design judgment, 3D development, and physical testing.|不能，仍需要設計判斷、3D 開發與實體測試。
Do awards prove business success?|獎項能證明商業成功嗎？|No, I would also want user feedback and business results.|不能，我也希望了解使用者回饋與商業成果。
What if you do not understand a comment?|如果聽不懂某個意見呢？|I would ask for clarification and confirm my understanding in writing.|我會請對方說清楚，再用文字確認理解。
Would this plan stay the same?|這份計畫會保持不變嗎？|I would adjust it after learning the team's priorities.|了解團隊優先事項後，我會調整計畫。
Which question would you ask first?|你會先問哪一題？|I would start with the main design problem this role should help solve.|我會先問這個職位需要協助解決的主要設計問題。`.split('\n').map(s=>s.split('|'));
const pool=[...new Map(topics.flatMap(t=>t.vocab).map(v=>[v[0],v])).values()];
const dict={...commonGlossary,...extraGlossary};
const phrases={};
for(const [i,t] of rows.entries()){
 [t.follow,t.followzh,t.reply,t.replyzh]=followups[i];
 phrases[t.id]=t.phrasezh; delete t.phrasezh;
 const words=new Set(t.advanced.toLowerCase().match(/[a-z]+/g));
 t.vocab=pool.filter(v=>words.has(v[0])).slice(0,5);
 for(const v of pool.filter(v=>['design','material','prototype','production','team','experience','designer','contribute'].includes(v[0])))if(t.vocab.length<5&&!t.vocab.some(x=>x[0]===v[0]))t.vocab.push(v);
 if(t.vocab.length!==5)throw Error(t.id);
}
const needs=rows.find(t=>t.id==='henry07');
needs.basic='I look at how people use the product. On ERGO AIR, we checked carrying comfort and laptop protection. Internal feedback helped us improve the design, but it was not a large user study.';
phrases[needs.id]=['我觀察人們如何使用產品。','在 ERGO AIR，我們確認背負舒適度與筆電保護。','內部回饋幫助改善設計，但這不是大型使用者研究。'];
needs.basiczh=phrases[needs.id].join('');
const glossary=Object.fromEntries(fs.readFileSync(new URL('./henry-glossary.txt',import.meta.url),'utf8').trim().split('|').map(x=>{const i=x.indexOf(':');return [x.slice(0,i),x.slice(i+1)];}));
const meanings={...dict,...glossary,...Object.fromEntries(pool.map(v=>[v[0],v[1]]))};
const vocabulary=new Set([...pool.map(v=>v[0]),...'industrial experience computers mice bags gaming chairs mobile accessories fragrance mouse backpack senior electronics materials prototypes production opportunity grateful responsibility design decisions strength user sample testing scent feature laptop mockups technical engineering process models physical comfort fit research competitor features size market compact desktop concepts hand-fit compatibility plastic personal evidence value hiking lighter protection planning contribution development family four styles language purpose mold revised cost appearance colors finishes texture usability fingerprint disagreement goal solution timing criteria feedback identity expected initial challenge deadlines risks tooling priority workshops knowledge generative handheld visual limits successful quality business global visuals simple options writing line second relationships third progress important problem person designers involved early'.split(' ')]);
for(const w of 'brand product color rendering samples tasks project sample compare support understand review test models role concept manager engineer needs plan learning'.split(' '))vocabulary.add(w);
for(const t of rows){
 const sentences=t.basic.match(/[^.!?]+[.!?]+|[^.!?]+$/g).map(s=>s.trim());
 const chosen=[];
 for(const word of t.basic.toLowerCase().match(/[a-z]+(?:[-'][a-z]+)*/g)||[]){
  if(chosen.some(v=>v[0]===word)||!vocabulary.has(word)||!meanings[word])continue;
  const i=sentences.findIndex(s=>(s.toLowerCase().match(/[a-z]+(?:[-'][a-z]+)*/g)||[]).includes(word));
  chosen.push([word,meanings[word],sentences[i],phrases[t.id][i]]);
 }
 if(chosen.length<5)throw Error(`Need vocabulary for ${t.id}: ${chosen.map(v=>v[0])}`);
 t.vocab=chosen.slice(0,5);
}
fs.writeFileSync(new URL('./henry-interview-content.js',import.meta.url),`// Based on Henry Mao's resume and 30-question practice draft.\nexport const henryTopics = ${JSON.stringify(rows,null,2)};\nexport const henryPhrases = ${JSON.stringify(phrases,null,2)};\nexport const henryGlossary = ${JSON.stringify(glossary,null,2)};\n`);
