// 課程內容與版面分離。每題依序為題目、選項、正解索引、回饋。
export const lessons = [
  {
    "id": 1,
    "title": "認識 GitHub 與 GitHub Desktop",
    "intro": "替你的第一個專案找到一個家。",
    "goals": [
      "說出 Git、GitHub 和 GitHub Desktop 各自的用途。",
      "建立 GitHub 帳號與第一個 Repository。"
    ],
    "tools": [
      "瀏覽器",
      "GitHub 帳號",
      "電子郵件"
    ],
    "steps": [
      [
        "認識三個工具",
        "Git 記錄檔案的版本，像遊戲存檔。GitHub 是放遠端 Git 專案和合作的網站。GitHub Desktop 讓你用按鈕執行常用 Git 操作。"
      ],
      [
        "分清楚六個動作",
        "Repository 是專案和它的版本紀錄。Commit 把選定的變更存進本機歷史，Push 把本機提交送到遠端，Pull 把遠端更新抓回並整合，Clone 則從遠端建立本機副本。"
      ],
      [
        "開通 GitHub 帳號",
        "開啟 GitHub，按 Sign up 並完成信箱驗證。依 GitHub 的年齡規定，未滿 13 歲的學生由老師使用教學帳號示範。不要把真實姓名、班級、照片或密碼寫進練習檔。"
      ],
      [
        "建立第一座存檔庫",
        "登入後按右上角 ＋ → New repository，名稱填 github-practice，選 Private 作為個人練習，勾選 Add a README file，再按 Create repository。"
      ]
    ],
    "flow": [
      "Sign up",
      "New repository",
      "Add a README",
      "Create repository"
    ],
    "filename": "README.md",
    "code": "# 我的程式冒險\n\n這是我的第一個 GitHub Repository。\n我的目標是做出一個能在手機玩的網頁遊戲。",
    "error": [
      "我做完 Commit 卻看不到網站上的更新",
      "Commit 只會寫入本機歷史。確認有遠端後，再按 Push origin。"
    ],
    "task": "在 GitHub 建立 github-practice。打開 README，向同學解釋 Clone 和 Pull 有什麼不同。",
    "prompt": "扮演 GitHub 教練，用遊戲存檔比喻 Git、GitHub、Commit、Push、Pull、Clone。出一個情境題，每次只給我一個提示。",
    "quiz": [
      [
        "哪個動作首次把遠端專案下載成一份本機 Git 專案？",
        [
          "Commit",
          "Clone",
          "Push"
        ],
        1,
        "Clone 會建立一份本機副本和版本歷史。"
      ],
      [
        "Commit 後，版本先存在哪裡？",
        [
          "我的電腦",
          "公開網頁",
          "瀏覽器書籤"
        ],
        0,
        "Commit 先寫入本機。Push 才會上傳提交。"
      ],
      [
        "哪個工具提供遠端儲存庫與多人合作功能？",
        [
          "Windows 檔案總管",
          "記事本",
          "GitHub"
        ],
        2,
        "GitHub 託管遠端儲存庫，也提供 Issue 和 Pull Request。"
      ]
    ]
  },
  {
    "id": 2,
    "title": "建立第一個 Repository",
    "intro": "從本機第一筆存檔，走到 GitHub 上的第一份作品。",
    "goals": [
      "用 GitHub Desktop 建立本機 Repository。",
      "新增 README.md 與 index.html，提交後發布到 GitHub。"
    ],
    "tools": [
      "GitHub Desktop",
      "GitHub 帳號",
      "文字編輯器"
    ],
    "steps": [
      [
        "安裝並登入",
        "從 desktop.github.com 下載 Windows 版。開啟 GitHub Desktop，選 Sign in to GitHub.com，在瀏覽器完成授權，回到 Desktop 檢查 File → Options → Accounts。"
      ],
      [
        "新增本機專案",
        "按 File → New repository，名稱填 my-first-website，選擇容易找到的 Local path，勾選 Initialize this repository with a README，再按 Create repository。"
      ],
      [
        "新增首頁並存檔",
        "選 Repository → Show in Explorer，用編輯器建立 index.html，確認副檔名不是 .html.txt。雙擊預覽，再到 Changes 勾選檔案，Summary 填「新增首頁」，按 Commit to main。"
      ],
      [
        "發布 Repository",
        "按 Publish repository。練習可保留 Keep this code private。發布後按 Repository → View on GitHub，確認 README.md 與 index.html 都出現。"
      ]
    ],
    "flow": [
      "File",
      "New repository",
      "Changes",
      "Commit to main",
      "Publish repository"
    ],
    "filename": "index.html",
    "code": "<!doctype html>\n<html lang=\"zh-Hant\">\n<meta charset=\"utf-8\">\n<title>我的第一個網站</title>\n<h1>你好，GitHub！</h1>\n<p>這是我的程式冒險起點。</p>\n</html>",
    "error": [
      "GitHub Desktop 找不到 index.html",
      "在檔案總管的「檢視 → 顯示」開啟「副檔名」，確認檔案位於 Show in Explorer 打開的資料夾內。"
    ],
    "task": "建立 my-first-website，做一次 Commit 和 Publish。從 GitHub 網頁打開 index.html，確認與本機內容一致。",
    "prompt": "幫我設計只有 h1、p、ul 和一張相對路徑圖片的繁體中文首頁。加上初學者註解，再列出用 GitHub Desktop 提交的步驟。",
    "quiz": [
      [
        "Summary 要填什麼？",
        [
          "GitHub 密碼",
          "這次修改的簡短說明",
          "完整 HTML"
        ],
        1,
        "用短句說明這一筆 Commit 做了什麼。"
      ],
      [
        "剛建立的本機儲存庫第一次送到 GitHub，要按哪個按鈕？",
        [
          "Fetch origin",
          "History",
          "Publish repository"
        ],
        2,
        "Publish repository 用來建立對應的遠端儲存庫。"
      ],
      [
        "可當靜態首頁的正確檔名是哪個？",
        [
          "index.html",
          "index.html.txt",
          "Index.zip"
        ],
        0,
        "用小寫 index.html，並確認實際副檔名。"
      ]
    ]
  },
  {
    "id": 3,
    "title": "大量上傳圖片與音效",
    "intro": "把散落的素材分好類，整批提交與同步。",
    "goals": [
      "用 Windows 檔案總管批次整理專案。",
      "練習 Changes → Commit → Push，辨認大檔與忽略規則。"
    ],
    "tools": [
      "Windows 檔案總管",
      "GitHub Desktop",
      "圖片、音效和模型"
    ],
    "steps": [
      [
        "準備資料夾",
        "按 Repository → Show in Explorer。建立 assets/images、assets/audio、assets/models，並另外建立 css、js、data。"
      ],
      [
        "整批複製",
        "按 Ctrl 選取個別檔案，或用 Shift 選一段，按 Ctrl+C/Ctrl+V。把圖片放 images、MP3 放 audio、GLB 放 models、JSON 放 data、CSS 和 JS 放各自資料夾。"
      ],
      [
        "核對 Changes",
        "回 GitHub Desktop 檢查新增清單，先把暫存檔或私密檔拿掉。在根目錄建立 .gitignore；它可排除尚未追蹤的檔案，已追蹤的檔案還要另行處理。"
      ],
      [
        "提交與同步",
        "在 Summary 寫「加入遊戲素材」後按 Commit to main，再按 Push origin。一般 Git 單檔超過 50 MiB 會收到警告，超過 100 MiB 會被 GitHub 阻擋，GitHub Desktop 也不能解除限制。"
      ]
    ],
    "flow": [
      "Show in Explorer",
      "assets/",
      "Changes",
      "Commit",
      "Push origin"
    ],
    "filename": ".gitignore",
    "code": "# 忽略個人環境設定與本機暫存檔\n.env\n.env.local\nThumbs.db\n*.tmp\nnode_modules/",
    "error": [
      "把素材放進專案，瀏覽器卻找不到",
      "比對實際檔名大小寫與資料夾。若 index.html 在根目錄，寫 ./assets/images/hero.webp。再確認素材有 Commit 和 Push。"
    ],
    "task": "完成下方 Demo 的 Commit、Push 與分類。接著用真正的檔案總管把三種素材放進練習儲存庫。",
    "prompt": "設計給初學者的網頁遊戲資料夾樹，分類 WebP、MP3、GLB、JSON、CSS、JavaScript，並檢查 HTML 引用是否都是相對路徑。",
    "quiz": [
      [
        "120 MiB 的單檔可直接用一般 Git 推到 GitHub 嗎？",
        [
          "可以，改用 GitHub Desktop",
          "可以，只要改副檔名",
          "會被 GitHub 阻擋"
        ],
        2,
        "大於 100 MiB 的一般 Git 檔案會被阻擋。"
      ],
      [
        ".gitignore 對尚未追蹤並符合規則的檔案有什麼作用？",
        [
          "讓 Git 忽略它",
          "自動壓縮它",
          "將它從遠端刪除"
        ],
        0,
        "忽略規則可避免把符合規則的未追蹤檔案加入 Git。"
      ],
      [
        "推送一批新素材的順序是？",
        [
          "Push → Changes → Commit",
          "Changes → Commit → Push",
          "Commit → Push → Changes"
        ],
        1,
        "先確認變更並做本機提交，再將提交推上去。"
      ]
    ]
  },
  {
    "id": 4,
    "title": "GitHub Pages 發布網站",
    "intro": "把你的 index.html 變成大家打得開的網址。",
    "goals": [
      "從 main 分支根目錄發布純靜態網站。",
      "判斷首頁 404 與素材路徑問題。"
    ],
    "tools": [
      "GitHub 網站",
      "含 index.html 的已推送儲存庫",
      "有 Pages 設定權限的帳號"
    ],
    "steps": [
      [
        "確認網站入口",
        "在 GitHub 儲存庫的 Code 頁籤切換到 main，檢查根目錄是否有小寫 index.html。免費個人帳號練習可用公開儲存庫，公開前先移除個資。"
      ],
      [
        "選擇發布來源",
        "點儲存庫的 Settings，左側找 Pages。在 Build and deployment 的 Source 選 Deploy from a branch，Branch 選 main，再選 /(root)，按 Save。"
      ],
      [
        "等候發布與測試",
        "在 Actions 觀察 Pages 工作流程結果。成功後回 Settings → Pages，點 Visit site。專案網站通常是 https://使用者名稱.github.io/Repository名稱/，用無痕視窗及手機測一次。"
      ],
      [
        "排查 404 和壞圖片",
        "先對照網址、儲存庫名稱、分支和資料夾。再檢查 Actions 的部署結果、index.html 的大小寫與 Push 狀態。首頁能開卻沒有樣式時，從 Network 找 404，檢查 ./css/style.css 等附件路徑。"
      ]
    ],
    "flow": [
      "Settings",
      "Pages",
      "Deploy from a branch",
      "main",
      "/(root)",
      "Save"
    ],
    "filename": "index.html 的相對路徑",
    "code": "<link rel=\"stylesheet\" href=\"./css/style.css\">\n<img src=\"./assets/images/hero.webp\" alt=\"我的遊戲角色\">\n<script src=\"./js/app.js\" defer></script>",
    "error": [
      "CSS 在本機可用，上線後卻消失",
      "/css/style.css 會從網域根目錄尋找；專案頁要從 Repository 子路徑找 CSS。將連結改成 ./css/style.css，再推送。"
    ],
    "task": "發布練習網站，從無痕視窗開啟專案網址。確認手機也能看到首頁、CSS 與圖片。",
    "prompt": "幫我檢查純靜態專案部署到 GitHub Pages 子路徑會出錯的 URL。只修改失效的 HTML、CSS、JS 資源引用，附上測試清單。",
    "quiz": [
      [
        "從分支根目錄發布，要選哪一組設定？",
        [
          "Actions → releases",
          "main → /(root)",
          "main → /assets"
        ],
        1,
        "根目錄有 index.html 時，選 main 與 /(root)。"
      ],
      [
        "專案名為 my-site，通常應開啟哪個網址？",
        [
          "https://帳號.github.io/my-site/",
          "https://github.com/my-site/",
          "https://帳號.github.io/css/"
        ],
        0,
        "專案網站 URL 會含 Repository 名稱。"
      ],
      [
        "相對於首頁同層的 css 資料夾要怎麼連？",
        [
          "C:/css/style.css",
          "/css/style.css",
          "./css/style.css"
        ],
        2,
        "./ 讓連結保留目前的專案子路徑。"
      ]
    ]
  },
  {
    "id": 5,
    "title": "AI 生成互動遊戲",
    "intro": "與 Codex 一步步做出金幣收集遊戲。",
    "goals": [
      "區分 HTML 結構、CSS 外觀與 JavaScript 規則。",
      "寫出可測試的 Codex 提示詞並試玩。"
    ],
    "tools": [
      "Codex",
      "文字編輯器",
      "瀏覽器",
      "GitHub Desktop"
    ],
    "steps": [
      [
        "先玩範例",
        "按「開始遊戲」，用方向鍵、WASD 或畫面方向鍵找金幣。分數到 5 後過關；按重新開始檢查分數有沒有歸零。"
      ],
      [
        "定義檔案與規則",
        "index.html 放遊戲區、分數與按鈕。style.css 畫地圖和角色。game.js 保存座標、處理按鍵、判斷碰撞與更新分數。"
      ],
      [
        "請 Codex 做最小版本",
        "開啟自己的練習資料夾，貼上下方提示詞。先檢查三個檔案各自做什麼，再請 Codex 一次修改一個規則。"
      ],
      [
        "驗證後提交",
        "測試四個方向、邊界、五枚金幣、重玩與觸控。修好再 Commit 和 Push，從 Pages 重測。"
      ]
    ],
    "flow": [
      "HTML",
      "CSS",
      "JavaScript",
      "瀏覽器測試",
      "Commit"
    ],
    "filename": "game.js",
    "code": "// 碰到金幣才加分\nif (player.x === coin.x && player.y === coin.y) {\n  score += 1;\n  if (score === 5) finish();\n  else placeCoin();\n}",
    "error": [
      "按方向鍵時整頁也在捲動",
      "先把焦點移到遊戲區。只在遊戲獲得焦點且該鍵屬於遊戲控制時呼叫 event.preventDefault()。"
    ],
    "task": "完成一次五枚金幣挑戰，再把自己的勝利目標從 5 改成 8，測試並提交。",
    "prompt": "在目前的資料夾用 HTML、CSS、JavaScript 做一個繁體中文 7×5 金幣收集遊戲。支援方向鍵、WASD 和手機按鍵。收滿 5 枚勝利，能重玩，金幣不生成在玩家位置。檔案分開、使用相對路徑，附測試步驟。",
    "quiz": [
      [
        "哪一種程式碼處理角色移動與加分？",
        [
          "CSS",
          "JavaScript",
          "README"
        ],
        1,
        "JavaScript 維護遊戲狀態並回應操作。"
      ],
      [
        "辨認角色踩到金幣時，最直接比對什麼？",
        [
          "兩者的 x 與 y",
          "網頁背景色",
          "GitHub 使用者名稱"
        ],
        0,
        "兩者座標同時相同，表示在同一格。"
      ],
      [
        "Codex 修改程式後應先怎麼做？",
        [
          "直接發布",
          "刪掉舊紀錄",
          "在瀏覽器驗證規則"
        ],
        2,
        "先測試核心流程，再提交與發布。"
      ]
    ]
  },
  {
    "id": 6,
    "title": "英語問答與音效系統",
    "intro": "聽一個英文單字，把它拼出來。",
    "goals": [
      "用 JSON 題庫分開保存單字和提示。",
      "用 Web Speech API 朗讀，實作回饋、分數與切題。"
    ],
    "tools": [
      "瀏覽器",
      "文字編輯器",
      "JSON 題庫"
    ],
    "steps": [
      [
        "準備題目",
        "建立 questions.json。每題有 word、tip、chunks，讓學生從提示和字母拼出單字。JSON 的欄位與字串要用雙引號。"
      ],
      [
        "增加讀音",
        "點「播放英文」後建立 SpeechSynthesisUtterance，lang 設成 en-US，再呼叫 speechSynthesis.speak。若裝置缺少語音，用拼讀提示繼續練習。"
      ],
      [
        "檢查答案",
        "用 trim() 去掉前後空白、toLowerCase() 統一大小寫。答錯提供可重試提示；答對只加一次分並啟用下一題。"
      ],
      [
        "擴充題庫與驗收",
        "在 JSON 加入 dog 和 fish，保留逗號規則。透過本機 HTTP 伺服器或 Pages 開啟，測試播放、拼錯、答對和最後得分。"
      ]
    ],
    "flow": [
      "JSON",
      "播放英文",
      "輸入答案",
      "檢查",
      "下一題"
    ],
    "filename": "questions.json",
    "code": "[\n  { \"word\": \"cat\", \"tip\": \"會喵喵叫的動物\", \"chunks\": [\"c\", \"a\", \"t\"] },\n  { \"word\": \"ship\", \"tip\": \"水上交通工具\", \"chunks\": [\"sh\", \"i\", \"p\"] }\n]",
    "error": [
      "JSON 題庫讀取失敗",
      "確認 JSON 檔在同一層，沒有多一個尾端逗號。用 HTTP 預覽，直接雙擊 file:// 可能因瀏覽器安全規則而擋下 fetch。"
    ],
    "task": "玩完 Phonics 範例，加入兩題新字，測試重試、讀音和切題。",
    "prompt": "用獨立 JSON 題庫製作三題 Phonics 拼字遊戲。點擊按鈕後透過 Web Speech API 唸 en-US，語音失敗要保留文字提示。答對才切題，同題只計一次分。",
    "quiz": [
      [
        "哪個檔案適合存放題庫？",
        [
          "style.css",
          "questions.json",
          "logo.webp"
        ],
        1,
        "JSON 容易閱讀和擴充結構化題庫。"
      ],
      [
        "朗讀英文使用哪個瀏覽器物件？",
        [
          "localStorage",
          "File",
          "SpeechSynthesisUtterance"
        ],
        2,
        "建立 utterance 並設定 en-US，再交給 speechSynthesis。"
      ],
      [
        "怎樣避免同一題一直加分？",
        [
          "第一次答對後鎖住該題",
          "去掉下一題按鈕",
          "把每次分數寫成 100"
        ],
        0,
        "以答對狀態鎖住檢查按鈕，進入下一題再解除。"
      ]
    ]
  },
  {
    "id": 7,
    "title": "Three.js 3D 模型網站",
    "intro": "拖動鏡頭，探索你親手搭建的海底世界。",
    "goals": [
      "辨認場景、相機、光源與渲染器。",
      "載入 GLB，讓模型旋轉並支援滑鼠和觸控。"
    ],
    "tools": [
      "支援 WebGL 2 的瀏覽器",
      "Three.js",
      "GLB 模型",
      "本機 HTTP 伺服器"
    ],
    "steps": [
      [
        "建立 3D 舞台",
        "在 JavaScript 建立 Scene、PerspectiveCamera、WebGLRenderer。把相機設在 (5, 3, 7) 並看向場景中心，把 canvas 放進容器。"
      ],
      [
        "打光與放物件",
        "加 HemisphereLight 和 DirectionalLight。先放 BoxGeometry 確認舞台能顯示，再用 GLTFLoader 拉入 ./submarine.glb，將 gltf.scene 放到場景。"
      ],
      [
        "加入鏡頭與旋轉",
        "用 OrbitControls 讓滑鼠拖曳、滾輪縮放或手機雙指縮放。每幀只轉一點模型，提供停止旋轉按鈕並尊重減少動態效果設定。"
      ],
      [
        "在網頁核對模型",
        "用 HTTP 預覽。若只有海底地板，打開 Network 搜尋 .glb：404 先檢查路徑；載入成功但太小可調整模型比例和相機距離。"
      ]
    ],
    "flow": [
      "Scene",
      "Camera + Light",
      "GLTFLoader",
      "OrbitControls",
      "Render"
    ],
    "filename": "ocean.js",
    "code": "const loader = new GLTFLoader();\nloader.load('./submarine.glb', (gltf) => {\n  const model = gltf.scene;\n  model.scale.setScalar(0.8);\n  scene.add(model);\n});",
    "error": [
      "畫布沒有顯示，而頁面說 WebGL 2 無法使用",
      "在支援 WebGL 2 的瀏覽器啟用硬體加速，或換設備。先看課程的靜態示意，再用可執行的裝置操作。"
    ],
    "task": "載入海底範例，旋轉、縮放、暫停。換一個你有授權可用的 GLB，讓同學從兩個角度找到它。",
    "prompt": "用 Three.js 建一個海底世界，包含相機、半球光、地面、GLTFLoader 載入相對路徑的 GLB、OrbitControls 和停止旋轉按鈕。模型載入失敗時顯示可讀提示。",
    "quiz": [
      [
        "把 GLB 模型載入 Three.js 用什麼工具？",
        [
          "GLTFLoader",
          "localStorage",
          "CSS Grid"
        ],
        0,
        "GLTFLoader 支援 glTF 與二進位 GLB。"
      ],
      [
        "哪個元件決定玩家從哪裡看？",
        [
          "場景名稱",
          "相機",
          "檔名"
        ],
        1,
        "相機的位置、朝向、視角都會影響畫面。"
      ],
      [
        "OrbitControls 的用途是？",
        [
          "壓縮音效",
          "提交版本",
          "在模型周圍轉動和縮放鏡頭"
        ],
        2,
        "OrbitControls 為滑鼠與觸控提供鏡頭操控。"
      ]
    ]
  },
  {
    "id": 8,
    "title": "Git 版本管理與復原",
    "intro": "看懂存檔時間軸，安全修正已分享的錯誤。",
    "goals": [
      "用 History 查看差異，區分 Fetch、Pull 和 Revert。",
      "知道哪些方式會重寫歷史，以及為何不要任意強制推送。"
    ],
    "tools": [
      "GitHub Desktop",
      "已提交多次的練習 Repository"
    ],
    "steps": [
      [
        "查看版本",
        "點 History，選一筆 Commit，右側可選檔案看紅色移除、綠色新增。每筆 Commit 都有識別碼。"
      ],
      [
        "抓更新再整合",
        "按 Fetch origin 更新遠端追蹤資訊，手上的檔案不會被合併。接著 Pull origin 才把新提交整合進目前分支。"
      ],
      [
        "用分支做實驗",
        "按 Current branch → New branch，取名 experiment。改背景色後提交，再切回 main 比對兩個版本。未提交的變更要先依 Desktop 提示保留或帶到新分支。"
      ],
      [
        "撤銷已推送的提交",
        "在工作樹乾淨時，從 History 右鍵選 Revert changes in commit；它會新增反向提交並保留歷史。如有衝突先解決差異。Amend、rebase 與把分支 reset 回舊提交會改變分支歷史，別對共享分支任意強制 Push。"
      ]
    ],
    "flow": [
      "History",
      "選一筆 Commit",
      "看 Diff",
      "Revert",
      "驗證新提交"
    ],
    "filename": "認識行差異",
    "code": "- background: red;\n+ background: #81c9ff;\n# Revert 會新增一筆反向變更，原紀錄仍可查看。",
    "error": [
      "我只想查看舊內容，不想修改專案",
      "在 History 選 Commit，再選變更檔案看 Diff。查看歷史和 Fetch 都不會把工作檔案改成舊版。"
    ],
    "task": "用版本時間軸找出改壞標題的版本並 Revert，確認原始提交仍在。",
    "prompt": "用三筆提交示範 diff 和 revert，展示撤銷後的第四筆提交。解釋為什麼共用分支應保留原始歷史。",
    "quiz": [
      [
        "Fetch 和 Pull 的差別是？",
        [
          "Fetch 立刻覆蓋工作檔案",
          "Pull 只看紀錄",
          "Fetch 抓更新資訊，Pull 還會整合分支"
        ],
        2,
        "Fetch 不合併到目前分支；Pull 會做整合。"
      ],
      [
        "想撤銷已分享的提交並保留紀錄，應使用？",
        [
          "Revert",
          "強制 Push",
          "刪除 GitHub 帳號"
        ],
        0,
        "Revert 透過新提交記錄反向變更。"
      ],
      [
        "紅、綠兩種差異通常表示什麼？",
        [
          "同步成功與失敗",
          "舊內容移除與新內容加入",
          "檔案公開與私密"
        ],
        1,
        "Diff 標出被移除與加入的行。"
      ]
    ]
  },
  {
    "id": 9,
    "title": "多人開發與 Pull Request",
    "intro": "用 Issue 分工，讓隊友一起把好關。",
    "goals": [
      "走過 Issue、分支、PR、Review 和 Merge。",
      "遇到合併衝突時能選擇並測試正確的內容。"
    ],
    "tools": [
      "GitHub",
      "GitHub Desktop",
      "同組同學或課堂模擬器"
    ],
    "steps": [
      [
        "用 Issue 寫清楚工作",
        "開啟 Issues → New issue，說明要修哪個問題與完成條件。指派同學後每人建自己的功能分支，例如 feature/coin-score。"
      ],
      [
        "開啟 Pull Request",
        "本機改完先 Commit 和 Push 分支。在 GitHub 點 Compare & pull request。確認 base 是 main、compare 是自己的分支，描述變更、測試和對應 Issue。"
      ],
      [
        "用 Review 找問題",
        "隊友到 Files changed 看差異，留下具體測試結果。修正後推送到同一個分支，PR 會自動帶入新提交。"
      ],
      [
        "解衝突與合併",
        "若兩邊改了同一行，和隊友決定應保留或組合哪個版本。刪除衝突標記後測試，提交解法。Review 通過後按 Merge pull request，各人切回 main 並 Pull。"
      ]
    ],
    "flow": [
      "Issue",
      "Branch",
      "Pull Request",
      "Review",
      "解 Conflict",
      "Merge"
    ],
    "filename": "PR 描述模板",
    "code": "## 修改原因\n金幣數量更新後，畫面應立即反映分數。\n\n## 測試\n- [x] 取得金幣後加 1\n- [x] 重新開始後分數歸零\n\nCloses #12",
    "error": [
      "PR 選錯 base 分支",
      "在 PR 頂端用 Edit 確認 base 設為團隊約定的 main，並核對 Files changed 是否只有想合併的檔案。"
    ],
    "task": "完成小組模擬。再請一位同學 Review 你的練習分支，記下他怎麼測試。",
    "prompt": "請擔任同組 Reviewer。依我提供的 diff 檢查是否符合 Issue 的完成條件，回覆重現步驟與建議，再等我修正。",
    "quiz": [
      [
        "Pull Request 主要用來做什麼？",
        [
          "提議把某分支的變更合併並請人審查",
          "新增檔案資料夾",
          "壓縮 GLB"
        ],
        0,
        "PR 讓團隊在合併前看差異、討論與驗證。"
      ],
      [
        "兩位同學同時改到同一段造成衝突，先做什麼？",
        [
          "刪掉遠端 main",
          "忽略衝突直接發布",
          "核對兩邊修改並討論保留方式"
        ],
        2,
        "先理解兩邊的修改，再提交測試過的解法。"
      ],
      [
        "隊友最後怎樣拿到合併完成的 main？",
        [
          "打開圖片",
          "切到 main 後 Pull",
          "按 New issue"
        ],
        1,
        "Pull 會把遠端 main 的新提交整合到本機 main。"
      ]
    ]
  },
  {
    "id": 10,
    "title": "Git LFS 與大量素材最佳化",
    "intro": "把資源變小，讓玩家在手機上也能快速載入。",
    "goals": [
      "辨認一般 Git 檔案門檻與 LFS 指標。",
      "壓縮 WebP、MP3、GLB，判斷哪些檔案不該上傳。"
    ],
    "tools": [
      "檔案總管",
      "圖片與音訊編輯器",
      "模型匯出工具",
      "本機檔案檢查器"
    ],
    "steps": [
      [
        "先量大小",
        "將檔案拖入檢查器。1 MiB = 1,048,576 bytes。一般 Git 單檔大於 50 MiB 會警告，大於 100 MiB 會被阻擋。這裡只讀取本機檔案名稱與大小。"
      ],
      [
        "整理與壓縮",
        "圖片調到實際顯示需要的解析度，再匯出 WebP。剪掉音效空白，測試 96–128 kbps 的 MP3。GLB 可簡化多邊形與縮小貼圖，再檢查模型是否仍清楚。"
      ],
      [
        "認識 Git LFS",
        "Git LFS 讓 Git 歷史裡存放指標，實體放在 LFS 儲存空間。用 git lfs track 指定需要管理的原始素材，並提交 .gitattributes。追蹤規則不會自動改寫已提交的歷史。"
      ],
      [
        "選擇網站用的素材",
        "GitHub Pages 不直接支援由 Git LFS 供應網站素材。將網頁需要的壓縮版用一般 Git 追蹤。別上傳密碼、.env、含個資檔案、快取或 node_modules。"
      ]
    ],
    "flow": [
      "看 MiB",
      "匯出最佳化版本",
      "檢查品質",
      "推送",
      "在 Pages 試用"
    ],
    "filename": "僅給原始素材的 Git LFS 設定",
    "code": "# 先安裝並初始化 Git LFS\n# 將大尺寸原始檔與網站輸出分開\ngit lfs install\ngit lfs track \"source-models/*.glb\"\ngit add .gitattributes\n# Pages 使用 assets/models/ 下以普通 Git 保存的輕量 GLB",
    "error": [
      "我已 Commit 超大檔但 Push 失敗",
      "只再加一筆刪除提交，舊提交仍包含大檔。若大檔只在最後一筆未推送提交，從索引移除後修正該提交，再檢查歷史；較舊或共用的歷史先請老師協助。"
    ],
    "task": "用檢查器比較素材原檔與壓縮版。找出可作為網站素材的版本，親自試播或顯示。",
    "prompt": "幫我為 WebP 圖片、MP3 音效和 GLB 模型訂出體積預算和畫質驗收方式。把網站需要的小檔與原始素材分開，不依賴 LFS 供應 Pages 網頁。",
    "quiz": [
      [
        "單檔正好 50 MiB 時，有超過一般 Git 的警告門檻嗎？",
        [
          "有",
          "沒有，門檻是大於 50 MiB",
          "只看檔名才知道"
        ],
        1,
        "恰好 50 MiB 沒有超過這個警告門檻。"
      ],
      [
        "Git 歷史裡，LFS 管理的大檔通常記錄什麼？",
        [
          "可執行腳本",
          "完整大檔",
          "指向 LFS 物件的小型指標"
        ],
        2,
        "Git LFS 讓 Git 追蹤指標，實體放在 LFS 儲存空間。"
      ],
      [
        "要給 GitHub Pages 顯示一張圖，適合怎麼做？",
        [
          "壓成小圖並以一般 Git 存放",
          "只提交 LFS 指標",
          "把圖藏在 .env"
        ],
        0,
        "Pages 不直接供應 Git LFS 的網站素材。"
      ]
    ]
  },
  {
    "id": 11,
    "title": "GitHub Actions 自動部署",
    "intro": "讓每次推送都能自動建置與發布。",
    "goals": [
      "理解 Workflow、Build、Deploy 的關係。",
      "設定 Vite 的 Pages 子路徑，讀懂一份 Actions YAML。"
    ],
    "tools": [
      "GitHub Actions",
      "Node.js",
      "Vite",
      "TypeScript"
    ],
    "steps": [
      [
        "分清楚開發與發布",
        "TypeScript 為程式加上型別提示。Vite 把開發用的 TS 與其他檔案建成瀏覽器能使用的 dist/。在本機執行 npm create vite@latest my-site -- --template vanilla-ts，進入目錄後 npm install。"
      ],
      [
        "設定 base 與檢查建置",
        "在 vite.config.ts 匯出 defineConfig({ base: '/my-site/' })，Repository 叫 github_tutorial 時用 '/github_tutorial/'。先用 npm run build 和 npm run preview，並提交 package-lock.json，讓 npm ci 能重現安裝。"
      ],
      [
        "設定 Pages 與 Workflow",
        "在 Vite 專案的 Settings → Pages → Source 選 GitHub Actions。取用下方 YAML，存於 .github/workflows/pages.yml。它先建置與上傳 dist，再用 Pages 部署。"
      ],
      [
        "追蹤部署",
        "Push 到 main。打開 Actions 選最新工作流程，查看 checkout、npm ci、build、upload、deploy。部署成功後從輸出網址測試子路徑上的 JS、CSS 與圖片。"
      ]
    ],
    "flow": [
      "Push main",
      "npm ci",
      "npm run build",
      "上傳 dist",
      "Deploy Pages"
    ],
    "filename": ".github/workflows/pages.yml",
    "code": "name: Deploy Vite site\non:\n  push:\n    branches: [main]\n  workflow_dispatch:\npermissions:\n  contents: read\n  pages: write\n  id-token: write\nconcurrency:\n  group: pages\n  cancel-in-progress: false\njobs:\n  publish:\n    runs-on: ubuntu-latest\n    environment:\n      name: github-pages\n      url: ${{ steps.deployment.outputs.page_url }}\n    steps:\n      - uses: actions/checkout@v6\n      - uses: actions/setup-node@v6\n        with:\n          node-version: '24'\n          cache: npm\n      - uses: actions/configure-pages@v5\n      - run: npm ci\n      - run: npm run build\n      - uses: actions/upload-pages-artifact@v4\n        with:\n          path: dist\n      - id: deployment\n        uses: actions/deploy-pages@v4",
    "error": [
      "Workflow 顯示成功，網站卻空白",
      "打開 Console 或 Network 看資源 404。Vite 專案部署在 /儲存庫名稱/ 時，檢查 base 設定和大小寫，重新 build 再部署。"
    ],
    "task": "建立一個 vanilla-ts 練習網站，讓 Workflow 自動發布。記下成功部署的提交和網址。",
    "prompt": "在 Vite + TypeScript 專案加入 GitHub Pages 自動部署。用實際儲存庫名稱設定 base，npm ci 後建置並部署 dist，保留 build 和部署的檢查步驟。",
    "quiz": [
      [
        "Vite 預設的建置輸出是哪個目錄？",
        [
          "node_modules",
          "dist",
          "assets/raw"
        ],
        1,
        "發布的是已建置的 dist 內容。"
      ],
      [
        "Repository 名為 github_tutorial，Vite 的 base 通常是？",
        [
          "/github_tutorial/",
          "C:/github_tutorial/",
          "https://github.com/"
        ],
        0,
        "專案網站的路徑前綴是 /Repository名稱/。"
      ],
      [
        "npm ci 需要哪一份已提交的檔案？",
        [
          "README.md",
          "favicon.svg",
          "package-lock.json"
        ],
        2,
        "npm ci 使用鎖定檔重現依賴版本。"
      ]
    ]
  },
  {
    "id": 12,
    "title": "學生作品發表會",
    "intro": "整理作品集和 QR Code，邀請同學試玩。",
    "goals": [
      "寫出有封面、玩法、網址和來源的 README。",
      "用手機驗證 Pages，製作 QR Code 並回顧成果。"
    ],
    "tools": [
      "已部署的 GitHub Pages 作品",
      "手機與相機",
      "README 編輯器"
    ],
    "steps": [
      [
        "寫 README",
        "在專案根目錄建立 README.md，寫作品名、玩法、鍵盤與觸控方式、上線連結與素材來源。用一張自己製作的封面替代含同學資料的照片。"
      ],
      [
        "做封面並分享",
        "將封面存為 assets/images/cover.webp，README 使用相對路徑。複製 Settings → Pages 的作品公開網址，在下方工具產生 QR Code。"
      ],
      [
        "用手機檢查",
        "用手機相機掃描 QR Code，在無痕視窗確認網址、直向版面、字體、按鈕、音效和遊戲。請一位同學看過後告訴你哪一步最難懂。"
      ],
      [
        "整理你的作品集",
        "回首頁「學生作品展示」加入作品卡。在 GitHub 建立作品集 Repository，把課程作品、封面與公開連結寫進 README。發表時說明你用 Commit、Pages 和 Codex 解決了什麼問題。"
      ]
    ],
    "flow": [
      "README",
      "封面",
      "公開網址",
      "QR Code",
      "手機實測",
      "作品發表"
    ],
    "filename": "作品 README.md",
    "code": "# 金幣探險隊\n\n![遊戲地圖封面](./assets/images/cover.webp)\n\n- 玩法：方向鍵或觸控移動，收滿 5 枚金幣。\n- 試玩：https://username.github.io/coin-game/\n- 素材：原創像素美術，音效自製。\n- 回顧：下次想加入可調整難度。",
    "error": [
      "我能打開連結，同學掃碼卻找不到",
      "確認 QR Code 使用公開 Pages 網址，開頭為 https://，結尾含 Repository 子路徑。在離開登入狀態下再試一次。"
    ],
    "task": "加入一張自己的作品卡。產生 QR Code 後用另一台裝置掃描，再寫下這 12 堂課最想保留的一個技巧。",
    "prompt": "用我的作品名稱、玩法、網址、封面相對路徑與素材來源整理一份繁體中文 README。缺少的資訊用問題向我確認，不要猜測作品內容。",
    "quiz": [
      [
        "分享 QR Code 時應放哪種網址？",
        [
          "C:/Users/student/index.html",
          "已部署的公開 Pages 網址",
          "GitHub Desktop 設定畫面"
        ],
        1,
        "公開 Pages 網址能讓別人在自己的裝置開啟。"
      ],
      [
        "作品 README 裡適合放什麼？",
        [
          "玩法、封面、上線網址和素材來源",
          "登入密碼",
          "同學住址"
        ],
        0,
        "README 應幫讀者找到、理解和試玩作品。"
      ],
      [
        "哪種方式最能驗證同學能玩？",
        [
          "只看 Windows 資料夾",
          "截圖顯示程式碼",
          "用手機掃碼並在無痕視窗試玩"
        ],
        2,
        "實際在未登入的手機上測試，能確認網址與版面。"
      ]
    ]
  }
];
