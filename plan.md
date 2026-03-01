# 角色設定
你是一位資深全端工程師，專精於 Python 與 Antigravity 框架。請協助我開發一個法語學習網站。

# 技術與整合
Framework: Antigravity (Python-based)

Database: Google Sheets (經由 gspread 或 API 存取)

Web Speech API: 使用瀏覽器原生 speechSynthesis 處理語音。

Deployment: 支援 GitHub Pages 或 GitHub Actions 自動化部署。

# 視覺規範 (UI/UX)
色彩計畫： 採用柔和馬卡龍色調（Pastel Palette）。

主色：粉藍 (#A2C2E1)、粉橘 (#FFD0A1)、粉紅 (#FFBAB0)、粉紫 (#D4BEE4)

風格： 極簡主義、圓角設計、具有陰影感（Soft Shadow）的卡片式佈局。

# 功能模組詳細規格
1. 單元管理系統
首頁 (Dashboard)： - 顯示所有已建立的課程單元卡片。

提供「＋ 新建單元」的醒目按鈕。

新建單元 (Creation Mode)： - 支援動態表單，使用者可一次新增多組「法文句子」與「英文翻譯」。

資料持久化： 串接 Google Sheets。環境變數需包含 GOOGLE_SHEET_ID 與 GOOGLE_CREDENTIALS。

Sheet 欄位： Unit_ID, Unit_Name, Sentence_ID, FR_Sentence, EN_Translation

2. 核心學習模式
進入單元後，提供三種切換標籤：

瀏覽模式 (Review)：

清單式列出所有句子。

每條句子附帶 TTS 播放按鈕。

進階語音設定： 滑桿調整「語速 (Rate 0.8 - 1.2)」及「語調 (Pitch)」，並可選擇瀏覽器支援的法語女聲/男聲。

記憶模式 (Flashcards)：

翻面卡片設計。正面顯示法文，點擊後觸發 CSS 翻轉動畫顯示英文。

考試模式 (Quiz)：

顯示英文翻譯，提供 Input 框供使用者輸入法文。

即時比對正確性（忽略大小寫與標點符號）。

內建播放按鈕供聽寫輔助。

# 環境變數與部署要求
提供 env.example 模板。

提供 export 功能或腳本，確保前端資源能靜態化部署至 GitHub。

程式碼結構需符合模組化（Separation of Concerns），前後端邏輯清晰。