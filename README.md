# Industrial Design Interview English App

這是一個可安裝成手機 App 的 PWA 原型。

## 功能
- 每日工業設計面試英文
- 5 個單字 + 中文 + 例句
- 單字發音 / 例句發音（瀏覽器 Speech Synthesis）
- 3 個專業面試片語
- 單字複習 / 句子複習
- 拼字練習
- Shadowing 跟讀
- 面試回答輸入與 Model Answer
- LocalStorage 保存進度
- History 學習統計
- PWA 離線快取
- Day 21–30 內建課程

## 本機執行
不要直接雙擊 index.html，請用 local server：

### Python
python3 -m http.server 8000

然後瀏覽：
http://localhost:8000

### VS Code
使用 Live Server 開啟此資料夾。

## iPhone 安裝
部署到 Vercel / Netlify / GitHub Pages 後，用 Safari 打開網址：
分享 → 加入主畫面

## 每日更新
目前 App 會依日期自動選擇內建課程，也可用 Previous / Next 切換。
若要真正每天由 AI 自動新增新課程，需要接後端（例如 Supabase/Firebase + OpenAI API）或由排程每天寫入 lessons.json。

## 建議下一階段
1. Supabase 登入與跨裝置同步
2. AI 自動批改面試回答
3. 麥克風錄音 + 發音評分
4. SRS 間隔重複
5. 每天自動生成新課程
6. 作品集面試題庫
