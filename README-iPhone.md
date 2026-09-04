# ID Interview English — iPhone PWA

這個版本已針對 iPhone Safari / 加入主畫面做優化。

## 最簡單的安裝方式
1. 將整個資料夾部署到任何 HTTPS 靜態網站服務：
   - Netlify
   - Vercel
   - GitHub Pages
2. 在 iPhone 用 Safari 開啟網址。
3. 點「分享」→「加入主畫面」。
4. 主畫面會出現 **ID English** 圖示。
5. 之後直接點圖示即可全螢幕使用。

## 目前已支援
- 每日課程
- 單字 / 例句語音
- 慢速 Shadowing
- 單字複習
- 句子複習
- 拼字練習
- 面試回答
- Model Answer + 語音
- 本機學習紀錄
- PWA 離線快取
- iPhone 安全區與主畫面模式

## 注意
- 語音使用 iPhone Safari 內建英文語音。
- 學習紀錄目前存在 iPhone 的瀏覽器 localStorage。
- 若要跨 iPhone / iPad / Mac 同步，需要下一版加入帳號與雲端資料庫。
- 若要「每天 AI 自動產生新課程」，需要下一版接後端 / OpenAI API，或使用排程每日更新 lessons.json。
