import { mkdir, writeFile } from "node:fs/promises";

const topics = [
  ["Introduce Yourself", "自我介紹", "designer", "設計師", "product", "產品", "create", "創造", "curious", "好奇的", "team", "團隊", "my design work", "practical and user-focused", "understand my approach"],
  ["Your Favorite Product", "喜愛的產品", "favorite", "最喜愛的", "useful", "實用的", "simple", "簡單的", "detail", "細節", "reason", "原因", "a daily object", "simple to use", "save time"],
  ["Describe a Shape", "描述造型", "shape", "形狀", "round", "圓潤的", "edge", "邊緣", "thin", "薄的", "soft", "柔和的", "the main body", "soft and light", "feel comfortable"],
  ["Color Choice", "色彩選擇", "color", "顏色", "warm", "溫暖的", "calm", "沉穩的", "match", "搭配", "contrast", "對比", "the color palette", "calm and balanced", "understand the controls"],
  ["Material Choice", "材料選擇", "material", "材料", "plastic", "塑膠", "metal", "金屬", "light", "輕的", "strong", "堅固的", "the enclosure", "light but strong", "carry it easily"],
  ["A User Need", "使用者需求", "user", "使用者", "need", "需求", "easy", "容易的", "comfort", "舒適", "daily", "日常的", "the handle", "easy to hold", "use it every day"],
  ["A Design Problem", "設計問題", "problem", "問題", "find", "發現", "fix", "修正", "test", "測試", "better", "更好的", "the first prototype", "hard to open", "use it safely"],
  ["Sketching Ideas", "概念草圖", "sketch", "草圖", "idea", "想法", "draw", "繪製", "quick", "快速的", "option", "方案", "three early ideas", "different from each other", "compare directions"],
  ["Building a Model", "製作模型", "model", "模型", "foam", "泡棉", "size", "尺寸", "hold", "握持", "change", "修改", "a foam model", "close to real size", "check the grip"],
  ["Giving Feedback", "給予回饋", "feedback", "回饋", "agree", "同意", "suggest", "建議", "listen", "聆聽", "respect", "尊重", "the current direction", "almost right", "improve one detail"],
  ["Receiving Feedback", "接受回饋", "comment", "意見", "understand", "理解", "ask", "詢問", "learn", "學習", "improve", "改善", "my presentation", "not clear enough", "explain the idea"],
  ["Working in a Team", "團隊合作", "role", "角色", "share", "分享", "support", "支援", "together", "一起", "goal", "目標", "our design team", "open and organized", "finish on time"],
  ["Managing Time", "時間管理", "time", "時間", "plan", "計畫", "first", "首先", "deadline", "截止日", "finish", "完成", "the weekly plan", "clear and realistic", "protect review time"],
  ["Learning a New Tool", "學習新工具", "tool", "工具", "practice", "練習", "tutorial", "教學", "try", "嘗試", "skill", "技能", "a new CAD tool", "useful for modeling", "work more efficiently"],
  ["A Project You Like", "喜歡的專案", "project", "專案", "goal", "目標", "challenge", "挑戰", "result", "成果", "proud", "自豪的", "a portable device", "small and durable", "solve a real need"],
  ["Researching Users", "使用者研究", "research", "研究", "interview", "訪談", "observe", "觀察", "behavior", "行為", "insight", "洞察", "people at work", "busy and mobile", "find hidden needs"],
  ["Comparing Competitors", "競品比較", "compare", "比較", "competitor", "競品", "feature", "特徵", "difference", "差異", "opportunity", "機會點", "three competing products", "similar in function", "find a new direction"],
  ["Defining the Brief", "定義設計任務", "brief", "任務書", "scope", "範圍", "target", "目標", "requirement", "需求條件", "success", "成功", "the project brief", "focused and measurable", "align the team"],
  ["Choosing a Concept", "選擇概念", "concept", "概念", "criteria", "標準", "evaluate", "評估", "risk", "風險", "select", "選擇", "the final concept", "distinctive and feasible", "meet user needs"],
  ["Testing a Prototype", "測試原型", "prototype", "原型", "task", "任務", "measure", "測量", "confusing", "令人困惑的", "iterate", "迭代", "the working prototype", "easy to understand", "validate the layout"],
  ["Working With Engineers", "與工程師合作", "engineer", "工程師", "space", "空間", "structure", "結構", "clearance", "間距", "solution", "解決方案", "the internal layout", "technically limited", "keep the design intent"],
  ["Balancing Cost", "平衡成本", "cost", "成本", "value", "價值", "reduce", "降低", "process", "製程", "trade-off", "取捨", "the surface finish", "valuable to users", "control production cost"],
  ["Designing for Production", "量產設計", "production", "量產", "supplier", "供應商", "sample", "樣品", "quality", "品質", "approve", "核准", "the production sample", "consistent and clean", "meet the quality target"],
  ["Handling a Failure", "處理失敗", "failure", "失敗", "mistake", "錯誤", "cause", "原因", "recover", "修正復原", "lesson", "教訓", "an early decision", "based on weak evidence", "avoid the same mistake"],
  ["Handling Disagreement", "處理意見分歧", "disagree", "不同意", "evidence", "證據", "discuss", "討論", "priority", "優先順序", "decision", "決策", "two design directions", "both partly valid", "reach a shared decision"],
  ["Presenting Your Portfolio", "介紹作品集", "portfolio", "作品集", "story", "故事", "context", "背景", "contribution", "貢獻", "outcome", "結果", "my strongest project", "relevant to this role", "show my design thinking"],
  ["Explaining Design Strategy", "說明設計策略", "strategy", "策略", "positioning", "定位", "brand", "品牌", "principle", "原則", "consistent", "一致的", "the product family", "recognizable but flexible", "strengthen the brand"],
  ["Leading a Project", "領導專案", "lead", "領導", "align", "對齊", "delegate", "分工", "milestone", "里程碑", "ownership", "責任感", "a cross-functional project", "complex but manageable", "move the team forward"],
  ["Answering a Challenge", "回應追問", "assumption", "假設", "justify", "論證", "alternative", "替代方案", "consequence", "後果", "confidence", "信心", "my design decision", "supported by evidence", "answer difficult questions"],
  ["Your Future Growth", "未來成長", "future", "未來", "strength", "優勢", "develop", "培養", "impact", "影響力", "direction", "方向", "my career plan", "clear and ambitious", "see how I want to grow"]
];

const phases = [
  {
    name: "Foundation", zh: "基礎表達", level: "國小程度 → 國中入門", prefix: "Start Simple",
    support: [
      ["clear", "清楚的", "easy to understand"], ["choose", "選擇", "decide which one you want"],
      ["because", "因為", "used to give a reason"], ["show", "展示", "let someone see something"],
      ["help", "幫助", "make something easier for someone"]
    ],
    phrases: (t) => [
      ["I chose this because…", "我選擇這個是因為…", `I chose this because it makes ${t[12]} ${t[13]}.`],
      ["The main idea is…", "主要想法是…", `The main idea is to make ${t[12]} ${t[13]}.`],
      ["This helps users…", "這能幫助使用者…", `This helps users ${t[14]}.`]
    ],
    question: (t) => `Can you tell me about ${t[12]}?`,
    structure: ["This is…", "I wanted it to be…", "I chose this because…", "It helps users…"],
    model: (t) => `This is ${t[12]}. I wanted it to be ${t[13]}. I made a simple choice because users need to ${t[14]}. I tested the idea and made it better.`,
    shadow: (t) => `I chose this because it helps users ${t[14]}.`
  },
  {
    name: "Development", zh: "完整回答", level: "國中程度", prefix: "Build Your Answer",
    support: [
      ["consider", "考量", "think carefully about something"], ["compare", "比較", "examine differences between options"],
      ["feedback", "回饋", "comments used to improve work"], ["decision", "決策", "a choice made after thinking"],
      ["result", "結果", "what happens because of an action"]
    ],
    phrases: (t) => [
      ["After comparing the options…", "比較各方案後…", `After comparing the options, we refined ${t[12]}.`],
      ["One challenge was…", "其中一個挑戰是…", `One challenge was making it ${t[13]}.`],
      ["As a result…", "因此…", `As a result, users could ${t[14]}.`]
    ],
    question: (t) => `How did you develop and evaluate ${t[12]}?`,
    structure: ["The goal was to…", "One challenge was…", "I compared…", "Based on feedback…", "As a result…"],
    model: (t) => `The goal was to make ${t[12]} ${t[13]}. One challenge was balancing the user need with project limits. I compared several options and discussed them with the team. Based on feedback, I refined the strongest direction. As a result, users could ${t[14]}.`,
    shadow: (t) => `Based on feedback, I refined the design and explained the result.`
  },
  {
    name: "Interview Ready", zh: "面試實戰", level: "國中進階 → 高中程度", prefix: "Defend Your Thinking",
    support: [
      ["constraint", "限制條件", "a limit that affects a solution"], ["validate", "驗證", "test whether an idea is correct"],
      ["prioritize", "排定優先順序", "decide what matters most"], ["trade-off", "取捨", "a balance between competing benefits"],
      ["outcome", "成果", "the final effect of a process"]
    ],
    phrases: (t) => [
      ["The evidence suggested that…", "證據顯示…", `The evidence suggested that ${t[12]} should feel ${t[13]}.`],
      ["The key trade-off was…", "關鍵取捨是…", "The key trade-off was user value versus technical complexity."],
      ["Looking back, I would…", "回頭看，我會…", "Looking back, I would validate the critical assumption earlier."]
    ],
    question: (t) => `What decisions and trade-offs shaped ${t[12]}, and what would you improve?`,
    structure: ["The context was…", "I identified…", "The evidence suggested…", "The key trade-off was…", "I decided to…", "Looking back…"],
    model: (t) => `The context was a need to make ${t[12]} ${t[13]}. I identified the user benefit, technical constraints, and business priority before selecting a direction. Research and prototype evidence suggested that the clearest solution would help users ${t[14]}. The key trade-off was user value versus complexity, so I protected the essential experience and simplified secondary details. The outcome met our main target. Looking back, I would validate the highest-risk assumption earlier.`,
    shadow: () => "I used evidence to prioritize the user benefit and manage the trade-off."
  }
];

function vocabFor(topic, phaseIndex) {
  const topicWords = [[topic[2], topic[3]], [topic[4], topic[5]], [topic[6], topic[7]], [topic[8], topic[9]]];
  const phase = phases[phaseIndex];
  return topicWords.map(([word, zh], i) => {
    const support = phase.support[(i + Math.floor(topics.indexOf(topic) / 6)) % phase.support.length];
    const chosen = phaseIndex === 0 ? [word, zh, `a useful word for talking about ${topic[12]}`] : support;
    const examples = {
      consider: `We considered the user need before developing ${topic[12]}.`,
      compare: `We compared several options for ${topic[12]}.`,
      feedback: `User feedback helped us refine ${topic[12]}.`,
      decision: `This decision made ${topic[12]} more effective.`,
      result: `The result was a clearer solution for ${topic[12]}.`,
      constraint: `A technical constraint affected ${topic[12]}.`,
      validate: `We used a prototype to validate ${topic[12]}.`,
      prioritize: `I prioritized the essential experience of ${topic[12]}.`,
      "trade-off": `The main trade-off involved ${topic[12]}.`,
      outcome: `The outcome strengthened the value of ${topic[12]}.`
    };
    const example = phaseIndex === 0
      ? `I use ${chosen[0]} when I talk about ${topic[12]}.`
      : examples[chosen[0]];
    return [chosen[0], chosen[1], chosen[2], example];
  }).concat([phase.support[(topics.indexOf(topic) + 4) % phase.support.length].concat(
    phaseIndex === 0
      ? `This choice can help users ${topic[14]}.`
      : phaseIndex === 1
        ? "This term helped us explain the project more clearly."
        : "This term helped me explain the recommendation precisely."
  )]);
}

const lessons = [];
for (let p = 0; p < phases.length; p++) {
  for (let i = 0; i < topics.length; i++) {
    const t = topics[i];
    const phase = phases[p];
    const day = p * 30 + i + 1;
    lessons.push({
      day,
      phase: p + 1,
      phase_name: phase.name,
      phase_zh: phase.zh,
      level: phase.level,
      week: Math.ceil(day / 7),
      title: `${phase.prefix}: ${t[0]}`,
      theme_zh: t[1],
      objective_zh: p === 0 ? "用簡單完整句建立口說信心" : p === 1 ? "用原因、過程與結果組成回答" : "用證據、取捨與反思展現設計判斷",
      vocab: vocabFor(t, p),
      phrases: phase.phrases(t),
      question: phase.question(t),
      structure: phase.structure,
      model: phase.model(t),
      shadow: phase.shadow(t)
    });
  }
}

await mkdir(new URL("../data/", import.meta.url), { recursive: true });
await writeFile(new URL("../data/lessons.json", import.meta.url), JSON.stringify(lessons, null, 2) + "\n");
console.log(`Generated ${lessons.length} lessons across ${phases.length} phases.`);
