const MiB = 1024 * 1024;

function practiceBox(title, body) {
  const root = document.createElement('section');
  root.className = 'practice';
  root.innerHTML = `<h3>${title}</h3>${body}<p class="practice-status" role="status"></p>`;
  return root;
}

function desktop(onPass) {
  const root = practiceBox('GitHub Desktop 流程模擬器', `
    <p>勾選欲提交的變更，填寫 Summary，最後把提交推到模擬遠端。</p>
    <p><b>Changes</b></p>
    <fieldset class="quiz-question">
      <legend>本機新增檔案</legend>
      <label><input type="checkbox" value="hero.webp"> assets/images/hero.webp</label><br>
      <label><input type="checkbox" value="coin.mp3"> assets/audio/coin.mp3</label><br>
      <label><input type="checkbox" value="world.glb"> assets/models/world.glb</label>
    </fieldset>
    <label class="practice-label">Summary<input id="commit-summary" maxlength="72" autocomplete="off" placeholder="例：加入遊戲素材"></label>
    <div class="practice-buttons">
      <button class="btn btn-purple" type="button" data-action="commit">Commit to main</button>
      <button class="btn btn-green" type="button" data-action="push" disabled>Push origin</button>
      <button class="btn btn-light" type="button" data-action="restart">重新練習</button>
    </div>`);
  const status = root.querySelector('[role=status]');
  const summary = root.querySelector('#commit-summary');
  const files = [...root.querySelectorAll('input[type=checkbox]')];
  const commit = root.querySelector('[data-action=commit]');
  const push = root.querySelector('[data-action=push]');
  let pending = [];
  let message = '';

  commit.addEventListener('click', () => {
    const selected = files.filter(file => file.checked);
    if (!selected.length || !summary.value.trim()) {
      status.textContent = '請勾選至少一個檔案並填寫 Summary。';
      return;
    }
    pending = selected.map(file => file.value);
    message = summary.value.trim();
    files.forEach(file => { file.disabled = true; });
    summary.disabled = true;
    commit.disabled = true;
    push.disabled = false;
    status.textContent = `本機提交「${message}」已存檔（${pending.length} 個檔案）。模擬遠端尚未更新。`;
  });

  push.addEventListener('click', () => {
    status.textContent = `推送成功：模擬遠端已收到「${message}」與 ${pending.join('、')}。`;
    push.disabled = true;
    onPass(true);
  });

  root.querySelector('[data-action=restart]').addEventListener('click', () => {
    files.forEach(file => { file.checked = false; file.disabled = false; });
    summary.disabled = false;
    summary.value = '';
    commit.disabled = false;
    push.disabled = true;
    pending = [];
    message = '';
    status.textContent = '已重設模擬器。';
    onPass(false);
    files[0].focus();
  });
  return root;
}

function sortFiles(onPass) {
  const root = practiceBox('虛擬資料夾練習', `
    <p>把每個檔案放到正確的資料夾，再檢查答案。</p>
    <div class="sort-list"></div>
    <button class="btn btn-green" type="button">檢查分類</button>`);
  const folders = [['hero.webp', 'assets/images/'], ['jump.mp3', 'assets/audio/'],
    ['whale.glb', 'assets/models/'], ['questions.json', 'data/'], ['main.css', 'css/'], ['game.js', 'js/']];
  const list = root.querySelector('.sort-list');
  const status = root.querySelector('[role=status]');
  const selects = folders.map(([name]) => {
    const label = document.createElement('label');
    const select = document.createElement('select');
    select.add(new Option('選擇資料夾', ''));
    for (const [, folder] of folders) select.add(new Option(folder, folder));
    select.addEventListener('change', () => {
      status.textContent = '';
      onPass(false);
    });
    label.append(name, select);
    list.append(label);
    return select;
  });
  root.querySelector('button').addEventListener('click', () => {
    const incorrect = folders.filter(([, folder], i) => selects[i].value !== folder);
    status.textContent = incorrect.length
      ? `再看看 ${incorrect.map(([name]) => name).join('、')} 的副檔名。`
      : '六個檔案都放到正確位置！';
    onPass(!incorrect.length);
  });
  return root;
}

function timeline(onPass) {
  const root = practiceBox('互動版本時間軸', `
    <p>選提交查看差異，找出把標題改成「????」的版本，再新增反向提交。</p>
    <div class="practice-buttons" aria-label="提交歷史"></div>
    <pre><code></code></pre>
    <button class="btn btn-purple" type="button" disabled data-revert>Revert 選取的提交</button>`);
  const versions = [
    ['a111', '建立首頁', '+ <h1>我的海底世界</h1>'],
    ['b222', '加入音效', '+ <audio src="./assets/audio/jump.mp3" controls></audio>'],
    ['c333', '測試標題', '- <h1>我的海底世界</h1>\n+ <h1>????</h1>']
  ];
  const history = root.querySelector('.practice-buttons');
  const code = root.querySelector('code');
  const revert = root.querySelector('[data-revert]');
  const status = root.querySelector('[role=status]');
  let current = 0;
  let reverted = false;

  function choose(i) {
    current = i;
    code.textContent = versions[i][2];
    [...history.children].forEach((button, index) => button.setAttribute('aria-pressed', String(index === i)));
    revert.disabled = reverted;
  }

  function addVersion([id, title], i) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-light';
    button.textContent = `${id} ${title}`;
    button.addEventListener('click', () => choose(i));
    history.append(button);
  }
  versions.forEach(addVersion);
  choose(0);

  revert.addEventListener('click', () => {
    if (current !== 2) {
      status.textContent = '這筆沒有改壞標題。再查看其他差異。';
      return;
    }
    reverted = true;
    versions.push(['d444', '撤銷標題修改', '- <h1>????</h1>\n+ <h1>我的海底世界</h1>']);
    addVersion(versions[3], 3);
    choose(3);
    history.lastElementChild.focus();
    status.textContent = '新增 d444，原本的 c333 仍留在版本歷史。';
    onPass(true);
  });
  return root;
}

function teamwork(onPass) {
  const root = practiceBox('小組協作模擬', `
    <p>Issue 任務：在作品首頁加入「開始冒險」，保留手機也看得到的大型按鈕。</p>
    <p data-step></p>
    <div class="practice-buttons">
      <button class="btn btn-light" type="button">建立 Issue</button>
      <button class="btn btn-light" type="button">建立 Branch</button>
      <button class="btn btn-light" type="button">開 Pull Request</button>
      <button class="btn btn-light" type="button">執行 Review</button>
      <button class="btn btn-light" type="button">解決 Conflict</button>
      <button class="btn btn-green" type="button">Merge</button>
    </div>
    <label class="practice-label" hidden>選擇衝突解法
      <select>
        <option value="">選擇做法</option>
        <option value="delete">刪除整個按鈕</option>
        <option value="combine">保留 main 的大按鈕尺寸，換成分支的新文字</option>
        <option value="markers">留下所有衝突標記</option>
      </select>
    </label>`);
  const steps = ['待建立 Issue', 'Issue #12 已建立', 'feature/start-button 已建立',
    'PR 已開啟，目標是 main', 'Review 找到衝突：main 改了尺寸，分支改了文字',
    '衝突已解決，手機測試通過', '功能已合併到 main'];
  const label = root.querySelector('label');
  const select = root.querySelector('select');
  const step = root.querySelector('[data-step]');
  const status = root.querySelector('[role=status]');
  const buttons = [...root.querySelectorAll('button')];
  let stage = 0;
  step.textContent = steps[stage];
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    if (index !== stage) {
      status.textContent = `請先完成「${buttons[stage].textContent}」。`;
      return;
    }
    if (stage === 4 && select.value !== 'combine') {
      status.textContent = '請同時保留手機尺寸和新文字。';
      select.focus();
      return;
    }
    stage += 1;
    step.textContent = steps[stage];
    status.textContent = steps[stage];
    label.hidden = stage !== 4;
    button.disabled = true;
    if (stage === buttons.length) onPass(true);
    (stage === 4 ? select : buttons[stage])?.focus();
  }));
  return root;
}

export function fileLevel(bytes) {
  if (bytes > 100 * MiB) return ['blocked', '超過 100 MiB：一般 Git 推送會被阻擋'];
  if (bytes > 50 * MiB) return ['warn', '超過 50 MiB：GitHub 會警告'];
  return ['', '在 50 MiB 警告門檻內'];
}

function fileCheck(onPass) {
  const root = practiceBox('本機檔案大小檢查器', `
    <p>拖入或選取檔案。只讀取名稱與大小，不會上傳。</p>
    <div class="dropzone"><label>選擇檔案<input type="file" multiple></label></div>
    <div class="actions">
      <button class="btn btn-light" type="button" data-sample>查看範例大小</button>
      <button class="btn btn-light" type="button" data-clear>清除檔案</button>
    </div>
    <ul class="file-results"></ul>`);
  const area = root.querySelector('.dropzone');
  const input = root.querySelector('input');
  const list = root.querySelector('.file-results');
  const status = root.querySelector('[role=status]');
  let depth = 0;

  function show(files, sample = false) {
    list.replaceChildren();
    for (const { name, size } of files) {
      const [style, message] = fileLevel(size);
      const item = document.createElement('li');
      item.className = style;
      item.textContent = `${name} · ${(size / MiB).toFixed(2)} MiB（${size.toLocaleString('zh-TW')} bytes）· ${message}`;
      list.append(item);
    }
    status.textContent = files.length ? `已檢查 ${files.length} 個${sample ? '示範' : '本機'}檔案。` : '尚未選取檔案。';
    onPass(files.length > 0);
  }

  input.addEventListener('change', () => show(input.files));
  area.addEventListener('dragenter', event => {
    event.preventDefault();
    depth += 1;
    area.dataset.drag = 'true';
  });
  area.addEventListener('dragover', event => event.preventDefault());
  area.addEventListener('dragleave', () => {
    depth = Math.max(0, depth - 1);
    area.dataset.drag = String(depth > 0);
  });
  area.addEventListener('drop', event => {
    event.preventDefault();
    depth = 0;
    area.dataset.drag = 'false';
    input.value = '';
    show(event.dataTransfer.files);
  });
  root.querySelector('[data-sample]').addEventListener('click', () => {
    input.value = '';
    show([
      { name: 'cover.webp', size: 920000 },
      { name: 'music.wav', size: 72 * MiB },
      { name: 'original.glb', size: 120 * MiB }
    ], true);
  });
  root.querySelector('[data-clear]').addEventListener('click', () => {
    input.value = '';
    show([]);
  });
  return root;
}

function qrMaker(onPass) {
  const root = practiceBox('作品網址 QR Code 製作器', `
    <form class="qr-form">
      <label>公開的 HTTPS 網址<input name="url" type="url" required maxlength="600" placeholder="https://你的帳號.github.io/作品/"></label>
      <button class="btn btn-green">產生 QR Code</button>
    </form>
    <div class="qr-output"></div>`);
  const form = root.querySelector('form');
  const output = root.querySelector('.qr-output');
  const status = root.querySelector('[role=status]');
  let revision = 0;

  form.elements.url.addEventListener('input', () => {
    revision += 1;
    output.replaceChildren();
    status.textContent = '';
    onPass(false);
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const current = ++revision;
    output.replaceChildren();
    try {
      const url = new URL(form.elements.url.value);
      if (url.protocol !== 'https:' || url.username || url.password) {
        status.textContent = '請輸入不含登入資訊的 HTTPS 網址。';
        return;
      }
      const { default: qrcode } = await import('../assets/vendor/qrcode/qrcode.mjs');
      const qr = qrcode(0, 'M');
      qr.addData(url.href);
      qr.make();
      if (current !== revision) return;
      const img = new Image();
      img.src = qr.createDataURL(5, 20);
      img.alt = `作品的 QR Code：${url.href}`;
      const download = document.createElement('a');
      download.className = 'btn btn-purple';
      download.href = img.src;
      download.download = 'portfolio-qr.gif';
      download.textContent = '下載 QR Code';
      output.append(img, download);
      status.textContent = 'QR Code 已產生，可以用手機相機掃描。';
      onPass(true);
    } catch {
      if (current === revision) status.textContent = '無法產生 QR Code。請確認網址有效，並移除多餘的查詢參數。';
    }
  });
  return root;
}

export const practices = {
  3: [desktop, sortFiles],
  8: [timeline],
  9: [teamwork],
  10: [fileCheck],
  12: [qrMaker]
};
