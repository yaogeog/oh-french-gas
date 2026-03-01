# OH French 法語學習 - GAS 版本

這是一個完全建構於 **Google Apps Script (GAS)** 的法語學習單頁應用程式（SPA）。
無需獨立的資料庫或伺服器，所有資料直接存儲於建立此腳本的 Google Spreadsheet 中。前端使用了 Tailwind CSS 與原生 JavaScript，並整合了 Web Speech API 作為內建的語音合成引擎。

## 系統特色

1. **零成本部署**：結合 Spreadsheet 與 Apps Script Web App。
2. **馬卡龍色系 UI**：採用粉藍、粉橘、粉紅、粉紫的 Tailwind CSS 自訂主題。
3. **語音合成引擎**：整合 Web Speech API，提供語音朗讀功能。
3. **三大學習模式**：
   - **瀏覽** (Review)：清單式瀏覽單詞，支援編輯及刪除單字，
   - **卡片** (Flashcards)：翻轉單字卡，用於記憶單字和自我檢測。
   - **考試** (Quiz)：聽讀填空，具備容錯比對（忽略大小寫與標點）。

## 部署教學 (Deployment)

1. **建立資料庫**
   - 前往 Google Drive，建立一個新的 **Google 試算表 (Google Sheets)**。
   - 在選單列點擊 `擴充功能 (Extensions)` > `Apps Script`。

2. **匯入後端程式碼**
   - 系統會開啟一個新的專案，預設有一個 `Code.gs`。
   - 將本專案中 `gas/Code.gs` 的完整內容複製並貼上覆蓋原有的 `程式碼.gs` (或 `Code.gs`)。
   - 按下 `Ctrl + S` 儲存。

3. **匯入前端程式碼**
   - 在 Apps Script 編輯器左側的「檔案」區塊，點擊 `+` 號 > `HTML`。
   - 將檔案命名為 **`Index`** (大小寫需完全一致，不要加 .html 副檔名，系統會自己加)。
   - 將本專案中 `gas/Index.html` 的完整內容複製並覆蓋進去。
   - 按下 `Ctrl + S` 儲存。

4. **發佈為網頁應用程式 (Web App)**
   - 點擊右上角藍色按鈕 `部署 (Deploy)` > `新增部署 (New deployment)`。
   - 點擊左側齒輪圖示 ⚙️，選擇 `網頁應用程式 (Web app)`。
   - **說明**: 輸入 `版本1`
   - **身分執行**: 選擇您的帳號 (Me)
   - **誰可以存取**: 選擇 `所有人 (Anyone)`。
   - 點擊 `部署 (Deploy)`。

5. **授權與使用**
   - 第一次執行時，Google 會要求授權權限（因腳本需要讀寫您的試算表）。
   - 點擊 `審查權限` -> 選擇帳號 -> 點擊 `進階` -> `前往... (不安全)` -> 點擊 `允許`。
   - 最後複製畫面上提供的 **網頁應用程式網址 (Web app URL)**，即可開始使用！

## 本地開發與預覽 (Local Preview)

為了方便在部署前預覽畫面與功能，前端程式碼已經內建了「本地模擬模式 (Local Mock Mode)」。

**啟動本地預覽：**
1. 確認您已經安裝 Python。
2. 打開終端機 (Terminal 或 PowerShell)。
3. 切換到 `gas` 資料夾：`cd gas`
4. 啟動內建的 HTTP 伺服器：`python -m http.server 3000`
5. 打開瀏覽器訪問 `http://localhost:3000/Index.html` 即可看到包含模擬資料的 OH French。

---
*專案由 Antigravity 框架自動生成。*
