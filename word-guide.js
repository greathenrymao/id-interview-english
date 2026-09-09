// Authored offline examples and explicit inflections; never infer grammar from suffix alone.
const entries=new Map();
function add(forms,entry){for(const form of forms.split('|'))entries.set(form,{...entry,form});}
const nouns=[
['decision','decisions','決策、決定','We make design decisions together.','我們一起做設計決策。'],
['object','objects','物件','These objects are easy to hold.','這些物件容易握住。'],
['product','products','產品','This product saves space.','這個產品節省空間。'],
['designer','designers','設計師','The designer shares a new idea.','這位設計師分享一個新想法。'],
['user','users','使用者','We listen to our users.','我們聆聽使用者的意見。'],
['engineer','engineers','工程師','An engineer checks the model.','一位工程師檢查模型。'],
['team','teams','團隊','Our team works well together.','我們的團隊合作良好。'],
['idea','ideas','想法','Please share your ideas.','請分享你的想法。'],
['model','models','模型','The model shows the shape.','這個模型呈現造型。'],
['prototype','prototypes','原型','We test two prototypes today.','我們今天測試兩個原型。'],
['material','materials','材料','We compare two materials.','我們比較兩種材料。'],
['concept','concepts','概念','This concept is easy to explain.','這個概念容易說明。'],
['problem','problems','問題','We solve one problem at a time.','我們一次解決一個問題。'],
['question','questions','問題','Please ask a question.','請提出一個問題。'],
['skill','skills','技能','Sketching is a useful skill.','畫草圖是一項實用技能。'],
['option','options','選項、方案','We discuss three options.','我們討論三個方案。'],
['detail','details','細節','Small details improve the product.','小細節能改善產品。'],
['part','parts','零件、部分','These parts fit together.','這些零件可以組合在一起。'],
['surface','surfaces','表面','The surface feels smooth.','這個表面摸起來很平滑。'],
['requirement','requirements','需求條件','We check the requirements first.','我們先檢查需求條件。'],
['constraint','constraints','限制條件','Cost is a design constraint.','成本是一項設計限制。'],
['result','results','結果','The results support our idea.','結果支持我們的想法。'],
['assumption','assumptions','假設','We test our assumptions early.','我們及早驗證假設。'],
['component','components','零組件','This component is easy to replace.','這個零組件容易更換。'],
['supplier','suppliers','供應商','We ask the supplier for samples.','我們向供應商索取樣品。'],
['sample','samples','樣品','The sample feels strong.','這個樣品感覺很堅固。'],
['process','processes','流程、製程','Our process starts with research.','我們的流程從研究開始。'],
['person','people','人','Two people test the handle.','兩個人測試把手。'],
['criterion','criteria','標準','We agree on the criteria.','我們就標準達成共識。'],
['trade-off','trade-offs','取捨','Every design has trade-offs.','每個設計都有取捨。'],
['sketch','sketches','草圖','These sketches show three options.','這些草圖呈現三個方案。'],
['task','tasks','任務','We finish the main tasks first.','我們先完成主要任務。'],
['action','actions','行動、操作','This action saves time.','這個操作節省時間。'],
['solution','solutions','解決方案','We need a simple solution.','我們需要簡單的解決方案。'],
['direction','directions','方向','We choose a clear direction.','我們選擇明確的方向。'],
['month','months','月','The project took two months.','這個專案花了兩個月。'],
['day','days','天','We test the model for two days.','我們測試模型兩天。'],
['week','weeks','週','We have three weeks left.','我們還有三週。'],
['image','images','圖片','These images explain the concept.','這些圖片說明概念。'],
['photo','photos','照片','The photos show the details.','這些照片呈現細節。'],
['gap','gaps','間隙','This gap is too wide.','這個間隙太寬了。'],
['section','sections','剖面、部分','This section shows the wall thickness.','這個剖面呈現壁厚。'],
['effect','effects','影響、效果','The change has a clear effect.','這項改變有明顯的效果。'],
['condition','conditions','條件','We test under different conditions.','我們在不同條件下測試。'],
['pattern','patterns','模式','We look for patterns in feedback.','我們尋找回饋中的模式。'],
['proportion','proportions','比例','The proportions look balanced.','這些比例看起來很均衡。'],
['concern','concerns','疑慮','Please share your concerns.','請說出你的疑慮。']
];
for(const [base,plural,zh,en,translation] of nouns)add(base+'|'+plural,{base,zh,en,translation,kind:'noun',plural});
const verbs=[
['develop','developed','developed','developing','develops','開發、發展','We developed a simple tool.','我們開發了一個簡單的工具。'],
['make','made','made','making','makes','製作、使','We made a small model.','我們製作了一個小模型。'],
['build','built','built','building','builds','建立、製作','We built a working prototype.','我們製作了可運作的原型。'],
['choose','chose','chosen','choosing','chooses','選擇','We chose a lighter material.','我們選擇了較輕的材料。'],
['test','tested','tested','testing','tests','測試','We tested the handle yesterday.','我們昨天測試了把手。'],
['learn','learned','learned','learning','learns','學習','I learned from the feedback.','我從回饋中學習。'],
['use','used','used','using','uses','使用','I use sketches to share ideas.','我用草圖分享想法。'],
['work','worked','worked','working','works','工作、運作','I work with a small team.','我與一個小團隊合作。'],
['design','designed','designed','designing','designs','設計','We design tools for everyday use.','我們設計日常使用的工具。'],
['explain','explained','explained','explaining','explains','解釋','Please explain your design choice.','請解釋你的設計選擇。'],
['understand','understood','understood','understanding','understands','理解','I understand the main problem.','我理解主要問題。'],
['find','found','found','finding','finds','發現、找到','We found a better solution.','我們找到了更好的方案。'],
['teach','taught','taught','teaching','teaches','教導','The project taught me patience.','這個專案讓我學會耐心。'],
['take','took','taken','taking','takes','拿取、花費','Testing takes time.','測試需要時間。'],
['spend','spent','spent','spending','spends','花費','We spent a day testing.','我們花了一天測試。'],
['come','came','come','coming','comes','來、來自','Good ideas come from observation.','好想法來自觀察。'],
['draw','drew','drawn','drawing','draws','畫','I draw before making models.','我在製作模型前先畫圖。'],
['see','saw','seen','seeing','sees','看見','We saw a problem early.','我們及早發現一個問題。'],
['say','said','said','saying','says','說','Please say it clearly.','請清楚地說出來。'],
['tell','told','told','telling','tells','告訴','Tell me about your project.','請告訴我你的專案。'],
['feel','felt','felt','feeling','feels','感覺','The handle feels comfortable.','這個把手握起來很舒服。'],
['hold','held','held','holding','holds','握住、持有','Hold the model with both hands.','用雙手拿住模型。'],
['bring','brought','brought','bringing','brings','帶來','I bring sketches to meetings.','我帶草圖參加會議。'],
['leave','left','left','leaving','leaves','離開、留下','Leave space for the cable.','留出電線的空間。'],
['begin','began','begun','beginning','begins','開始','We begin with user research.','我們從使用者研究開始。'],
['cut','cut','cut','cutting','cuts','切割、刪減','We cut unnecessary features.','我們刪減不必要的功能。'],
['have','had','had','having','has','有','We have a clear plan.','我們有明確的計畫。'],
['do','did','done','doing','does','做','We do research before designing.','我們在設計前做研究。']
];
const regular=[
['help','幫助','I help the team solve problems.','我幫助團隊解決問題。'],
['ask','詢問','I ask users about their needs.','我詢問使用者的需求。'],
['compare','比較','We compare the two models.','我們比較這兩個模型。'],
['change','改變','We change one detail at a time.','我們一次改變一個細節。'],
['check','檢查','Please check the dimensions.','請檢查尺寸。'],
['discuss','討論','We discuss ideas before testing.','我們在測試前討論想法。'],
['share','分享','I share my sketches early.','我及早分享草圖。'],
['look','看、看起來','The design looks simple.','這個設計看起來簡潔。'],
['need','需要','We need a stronger material.','我們需要更堅固的材料。'],
['want','想要','I want to learn more.','我想學習更多。'],
['like','喜歡','I like solving practical problems.','我喜歡解決實際問題。'],
['join','加入','I want to join your team.','我想加入你們的團隊。'],
['connect','連結','This part connects the two sides.','這個零件連接兩側。'],
['value','重視','Our team values clear communication.','我們的團隊重視清楚的溝通。'],
['select','選擇','We select materials carefully.','我們仔細選擇材料。'],
['support','支持','The results support this choice.','結果支持這個選擇。'],
['observe','觀察','I observe how people use tools.','我觀察人們如何使用工具。'],
['explore','探索','We explore different shapes.','我們探索不同造型。'],
['create','創造','We create tools that save time.','我們創造節省時間的工具。'],
['review','檢視','We review the results together.','我們一起檢視結果。'],
['clarify','釐清','Please clarify the main goal.','請釐清主要目標。'],
['define','定義','We define the problem first.','我們先定義問題。'],
['document','記錄','I document each design change.','我記錄每次設計變更。'],
['adjust','調整','We adjust the handle angle.','我們調整把手角度。'],
['open','打開','The lid opens easily.','這個蓋子容易打開。'],
['assume','假設','Do not assume everyone agrees.','不要假設每個人都同意。'],
['solve','解決','This design solves a real problem.','這個設計解決了實際問題。'],
['require','需要','This task requires careful planning.','這項任務需要仔細規劃。'],
['intend','打算','We intend to test it again.','我們打算再次測試它。'],
['remain','保持','The main goal remains the same.','主要目標保持不變。'],
['balance','平衡','We balance cost and quality.','我們平衡成本與品質。'],
['include','包括','The report includes test results.','報告包括測試結果。'],
['confirm','確認','Please confirm the material choice.','請確認材料選擇。'],
['request','要求','We request a new sample.','我們要求新的樣品。'],
['defend','捍衛','I defend ideas with evidence.','我用證據支持想法。'],
['agree','同意','We agree on the next step.','我們同意下一個步驟。'],
['preserve','保留','We preserve the original shape.','我們保留原本的造型。'],
['start','開始','We start with a quick sketch.','我們從快速草圖開始。'],
['reduce','減少','This change reduces waste.','這個改變減少浪費。'],
['recommend','推薦','I recommend testing both options.','我建議測試兩個方案。'],
['protect','保護','The cover protects the screen.','這個外蓋保護螢幕。'],
['affect','影響','Material choice affects the cost.','材料選擇影響成本。'],
['matter','重要','Small details matter to users.','小細節對使用者很重要。'],
['approve','核准','The team approved the sample.','團隊核准了樣品。'],
['realize','意識到','I realized the handle was too small.','我發現把手太小。'],
['align','對齊','Please align the two parts.','請對齊這兩個零件。'],
['argue','爭論','We discuss facts instead of arguing.','我們討論事實而非爭吵。'],
['refine','精修','I refine the shape after testing.','我在測試後精修造型。'],
['miss','遺漏','We missed a small detail.','我們漏掉了一個小細節。'],
['repeat','重複','We repeat the test to confirm.','我們重複測試以確認。'],
['invest','投入','We invest time in research.','我們投入時間研究。'],
['prevent','預防','Testing helps prevent mistakes.','測試有助於預防錯誤。'],
['identify','找出','We identify risks early.','我們及早找出風險。'],
['prioritize','排定優先','We prioritize the main tasks.','我們優先處理主要任務。'],
['simplify','簡化','We simplify the assembly process.','我們簡化組裝流程。'],
['communicate','溝通','I communicate clearly with engineers.','我與工程師清楚溝通。'],
['propose','提出','I propose a simpler solution.','我提出較簡單的方案。'],
['remove','移除','We remove unnecessary parts.','我們移除不必要的零件。'],
['evaluate','評估','We evaluate the design together.','我們一起評估設計。'],
['involve','使參與','We involve users in testing.','我們讓使用者參與測試。'],
['face','面對','We face a tight deadline.','我們面臨緊迫的期限。'],
['add','增加','We add a soft grip.','我們加上柔軟的握把。'],
['prepare','準備','I prepare sketches before meetings.','我在開會前準備草圖。'],
['contribute','貢獻','I contribute ideas to the team.','我為團隊貢獻想法。']
];
// Rules operate only on an explicitly authored verb list.
for(const [base,zh,en,translation] of regular){
 const past=/[^aeiou]y$/.test(base)?base.slice(0,-1)+'ied':base.endsWith('e')?base+'d':base+'ed';
 const ing=base.endsWith('e')&&!base.endsWith('ee')?base.slice(0,-1)+'ing':base+'ing';
 const third=/[^aeiou]y$/.test(base)?base.slice(0,-1)+'ies':/(s|sh|ch|x|z|o)$/.test(base)?base+'es':base+'s';
 verbs.push([base,past,past,ing,third,zh,en,translation]);
}
for(const [base,past,participle,ing,third,zh,en,translation] of verbs)add([base,past,participle,ing,third].join('|'),{kind:'verb',base,past,participle,ing,third,zh,en,translation});
add('am|is|are|was|were|be|been|being',{kind:'special',base:'be',zh:'是、成為',note:'be 的變化：現在式 am／is／are；過去式 was／were；過去分詞 been；現在分詞 being。',en:'The model is ready.',translation:'模型準備好了。'});
add('engineering',{kind:'special',base:'engineering',note:'此處是名詞「工程」，不是看到 -ing 就判定為進行式。',en:'Engineering helps turn ideas into products.',translation:'工程協助將想法轉化為產品。'});
add('interested',{kind:'special',base:'interested',note:'常作形容詞：be interested in 表示「對……感興趣」。也可作 interest 的過去式／過去分詞。',en:'I am interested in sustainable design.',translation:'我對永續設計感興趣。'});
const simple=[
['important','This detail is important.','這個細節很重要。'],['useful','This tool is useful at work.','這個工具在工作中很實用。'],
['research','Research helps us understand users.','研究幫助我們理解使用者。'],['feedback','Your feedback helps our team.','你的回饋幫助我們的團隊。'],
['experience','I learn from every experience.','我從每次經驗中學習。'],['development','Development takes time and teamwork.','開發需要時間與團隊合作。'],
['manufacturing','Manufacturing requires careful planning.','製造需要仔細規劃。'],['portfolio','My portfolio shows how I solve problems.','我的作品集呈現我如何解決問題。'],
['i','I enjoy working with engineers.','我喜歡與工程師合作。'],['a','We need a new tool.','我們需要一個新工具。'],
['the','Please check the model.','請檢查這個模型。'],['with','I test ideas with my team.','我與團隊一起測試想法。'],
['and','We compare cost and quality.','我們比較成本與品質。'],['to','I want to learn more.','我想學習更多。'],
['in','I work in a design team.','我在設計團隊工作。'],['for','This tool is for children.','這個工具是給兒童使用的。'],
['of','This is part of my project.','這是我專案的一部分。'],['my','My team supports this idea.','我的團隊支持這個想法。']
];
for(const [word,en,translation] of simple)add(word,{kind:'special',base:word,note:'此例句中的用法；不根據字尾推測詞形。',en,translation});
export function wordGuide(word){
 const e=entries.get(word.toLowerCase());if(!e)return null;
 let note=e.note;
 if(e.kind==='noun')note=e.form===e.plural?'名詞複數；單數是 '+e.base+'。':'名詞單數；複數是 '+e.plural+'。';
 if(e.kind==='verb')note='動詞原形：'+e.base+'\n過去式：'+e.past+'\n過去分詞：'+e.participle+'\n現在分詞：'+e.ing+'\n第三人稱單數：'+e.third+'\n分詞的用法須配合句子判斷。';
 return {...e,note};
}
