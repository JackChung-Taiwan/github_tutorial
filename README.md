# GitHub 程式冒險學院

從 GitHub Desktop 到 AI 遊戲開發，12 堂繁體中文互動課。適合國小高年級與國中。由社團法人台灣資訊教育發展協會提供課程入口。

[開啟 GitHub Pages](https://jackchung-taiwan.github.io/github_tutorial/)

## 開始使用

網站採用純 HTML、CSS 與 JavaScript，開發及發布都不需要打包、後端、帳號或 API Key。課堂中的 GitHub、GitHub Desktop 與 Codex 操作可依需要另開各工具。

1. 選擇課程階段，或用工具名稱搜尋課程。
2. 依課程的操作步驟與範例實作。有模擬器的課程需通過互動練習。
3. 勾選完成實作並答對三題，按「完成課程」，進度和徽章會更新。
4. 課程完成紀錄和自行新增的作品卡存在此瀏覽器的 localStorage。按「成就徽章 → 清除學習進度」可清除完成紀錄。清除進度不會刪除作品卡。

## 本機預覽

使用電腦已安裝的 Python 3，在儲存庫根目錄執行：

```sh
python -m http.server 8000 --bind 127.0.0.1
```

在瀏覽器開啟 [本機預覽](http://127.0.0.1:8000/)。Windows 若使用 Python Launcher，可將 `python` 改為 `py -3`。編輯器的本機靜態伺服器也可使用。主站使用 JavaScript 模組，拼字範例使用 HTTP 讀取 JSON，3D 範例使用 HTTP 讀取 GLB。請以 HTTP 預覽，並在支援 WebGL 2 的瀏覽器執行 3D 範例。英文語音由裝置提供，沒有可用語音時可照拼讀線索作答。

若要本機驗證專案子路徑，將儲存庫資料夾命名為 `github_tutorial`，在其上一層啟動伺服器，再開啟 [子路徑預覽](http://127.0.0.1:8000/github_tutorial/)。

## 課程

| 基礎 | 進階 | 高階 |
| --- | --- | --- |
| 1. 認識 GitHub 與 Desktop | 5. AI 生成互動遊戲 | 9. 多人開發與 Pull Request |
| 2. 建立第一個 Repository | 6. 英語問答與音效系統 | 10. Git LFS 與大量素材最佳化 |
| 3. 大量上傳圖片與音效 | 7. Three.js 3D 模型網站 | 11. GitHub Actions 自動部署 |
| 4. GitHub Pages 發布網站 | 8. Git 版本管理與復原 | 12. 學生作品發表會 |

每課有目標、工具、操作示意、程式或設定範例、Codex 提示詞、排解方法、實作任務及測驗。第 3、8、9、10、12 課另有瀏覽器內練習。

## 範例結構

```text
index.html          首頁與課程容器
css/style.css       響應式版面及方塊圖形
js/lessons.js       12 堂課資料
js/app.js           導覽、渲染、剪貼簿與作品集
js/progress.js      瀏覽器儲存及徽章規則
js/quiz.js          三題測驗與回饋
js/practice.js      模擬器、檔案檢查及 QR Code
assets/             原創像素插圖、圖示及 QR Code 函式庫
examples/           四個可獨立執行的範例
downloads/          與範例資料夾對應的 ZIP
```

- [第一個網站](./examples/first-website/) 與 [ZIP](./downloads/first-website.zip)
- [金幣收集遊戲](./examples/coin-game/) 與 [ZIP](./downloads/coin-game.zip)
- [Phonics 拼字](./examples/phonics-game/) 與 [ZIP](./downloads/phonics-game.zip)
- [Three.js 海底世界](./examples/threejs-ocean/) 與 [ZIP](./downloads/threejs-ocean.zip)

更新範例後，將對應資料夾內的檔案重新打包成同名 ZIP。解壓縮後可以從範例的資料夾啟動 HTTP 伺服器。Phonics 的題庫在 `questions.json`。Three.js 例題的原創模型放在 `submarine.glb`，載入路徑設在 `ocean.js`。學生輸入的 QR Code 網址和本機檔案檢查資料皆在瀏覽器端處理。

## 啟用 GitHub Pages

1. 將網站提交並推到 `main` 的根目錄，確認 GitHub 的 Code 頁可直接看到 `index.html`。
2. 到儲存庫 **Settings → Pages → Build and deployment**。
3. **Source** 選 **Deploy from a branch**，**Branch** 選 **main** 和 **/(root)**，按 **Save**。
4. 到 **Actions** 確認 Pages 工作流程成功。再回 **Settings → Pages** 按 **Visit site**。
5. 從手機或無痕視窗測試首頁、任一課程深連結與四個範例。若頁面 404，檢查部署狀態和分支來源。若素材 404，核對檔名大小寫與相對路徑。

本儲存庫透過分支根目錄發布。第 11 堂的 YAML 供學生放到自己的 Vite 專案中，並在該專案選擇 GitHub Actions 為發布來源。本網站不需要 Vite。

## 參考資料與授權

- [GitHub Desktop 官方入門](https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop)
- [GitHub 檔案大小限制](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [Git LFS 與 Pages 的限制](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage)
- [GitHub Pages 發布來源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Vite 靜態部署](https://vite.dev/guide/static-deploy.html)
- [Three.js](https://github.com/mrdoob/three.js/tree/r183) 0.183.2，MIT，授權隨 `examples/threejs-ocean/vendor/` 附上。
- [QR Code Generator](https://github.com/kazuhikoarase/qrcode-generator) 2.0.4，MIT，授權隨 `assets/vendor/qrcode/` 附上。
- 方塊風格參考同系列 [MakeCode 教材](https://jackchung-taiwan.github.io/minecraft_makecode/)。本網站使用原創 SVG 橫幅及 GLB 潛水艇。
