import { lessons } from './lessons.js';
import { badges, completed, read, write } from './progress.js';
import { makeQuiz } from './quiz.js';
import { practices } from './practice.js';

const byId = id => document.getElementById(id);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const escape = value => String(value).replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const icon = name => `<svg aria-hidden="true"><use href="./assets/images/icons.svg#${name}"/></svg>`;
const tile = name => `<span class="icon-tile">${icon(name)}</span>`;

const stages = [
  { name: '基礎', title: '基礎 · 建立基地', note: 'GitHub、Desktop、素材、Pages', icon: 'flag' },
  { name: '進階', title: '進階 · 遊戲工坊', note: 'AI、英語、3D、版本管理', icon: 'code' },
  { name: '高階', title: '高階 · 發布之路', note: '協作、最佳化、自動部署、作品集', icon: 'star' }
];
const examples = [
  { id: 2, dir: 'first-website', name: '第一個網站', note: '作品首頁與主題切換', icon: 'globe', tones: ['#36687f', '#448e9e'] },
  { id: 5, dir: 'coin-game', name: '金幣收集遊戲', note: '鍵盤與觸控尋寶', icon: 'star', tones: ['#996019', '#bc8028'] },
  { id: 6, dir: 'phonics-game', name: 'Phonics 拼字', note: '發音、題庫與答題', icon: 'book', tones: ['#684396', '#8153b2'] },
  { id: 7, dir: 'threejs-ocean', name: '3D 海底世界', note: '可旋轉的 GLB 場景', icon: 'box', tones: ['#1953a1', '#2472b6'] }
];
const tools = [
  ['branch', 'GitHub', '管理遠端儲存庫、版本和合作。', 'https://github.com/'],
  ['screen', 'GitHub Desktop', '用圖形介面提交與同步檔案。', 'https://desktop.github.com/'],
  ['globe', 'GitHub Pages', '把靜態專案變成公開網站。', '#pages'],
  ['code', 'Codex', '用自然語言修改程式並協助測試。', 'https://openai.com/codex/']
];
const faq = [
  ['Windows 如何安裝 GitHub Desktop？', '到 desktop.github.com 下載 Windows 安裝程式。執行後從開始功能表開啟。若課堂電腦需要安裝權限，由老師協助。'],
  ['登入後 Desktop 沒顯示帳號？', '到 File → Options → Accounts，按 Sign in。確認瀏覽器登入的是同一個 GitHub 帳號，完成授權後切回 Desktop。'],
  ['Push origin 失敗怎麼辦？', '查看完整錯誤訊息。若遠端更新較新，先 Fetch，再 Pull 並解決衝突。若權限不足，確認 GitHub 帳號與遠端儲存庫的權限。大於 100 MiB 的普通 Git 檔案會被擋下。'],
  ['Pages 為何出現 404？', '確認 Settings → Pages 的來源、目前部署結果、入口檔 index.html 的位置，以及網址是否包含儲存庫名稱。'],
  ['網站上線後圖片或音效消失？', '用瀏覽器的 Network 查看哪個檔案回傳 404。核對大小寫與相對路徑，如 ./assets/audio/coin.mp3，並確認檔案有推到部署分支。']
];

let done = completed();
let stageFilter = -1;
let activeLesson = 0;
let toastTimer;
let gallery = read('portfolio', []);
if (!Array.isArray(gallery)) gallery = [];

function toast(message) {
  clearTimeout(toastTimer);
  byId('toast').textContent = message;
  toastTimer = setTimeout(() => { byId('toast').textContent = ''; }, 3300);
}

function stageIndex(id) {
  return Math.floor((id - 1) / 4);
}

function number(id) {
  return String(id).padStart(2, '0');
}

function updateProgress() {
  document.querySelectorAll('[data-count]').forEach(node => { node.textContent = `${done.size} / 12 堂課`; });
  byId('overall-progress').value = done.size;
  const next = lessons.find(lesson => !done.has(lesson.id));
  document.querySelectorAll('[data-continue]').forEach(link => {
    link.href = next ? `#lesson-${next.id}` : '#achievements';
    const label = next ? (done.size ? '繼續冒險' : '開始冒險') : '查看成就';
    if (link.firstElementChild) link.lastChild.textContent = label;
    else link.textContent = label;
  });
  byId('badge-grid').innerHTML = badges.map(badge => {
    const earned = badge.ids.every(id => done.has(id));
    return `<article class="badge" data-earned="${earned}">${tile('star')}
      <div><h3>${badge.name}</h3><p>${earned ? '已解鎖' : badge.description}</p></div></article>`;
  }).join('');
  renderMap();
  renderLessonNav();
}

function renderMap() {
  const tokens = byId('search').value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const matched = lessons.filter(lesson => {
    const index = stageIndex(lesson.id);
    const searchable = [lesson.id, lesson.title, lesson.intro, stages[index].name,
      ...lesson.goals, ...lesson.tools, ...lesson.flow].join(' ').toLowerCase();
    return (stageFilter === -1 || stageFilter === index) && tokens.every(token => searchable.includes(token));
  });
  const map = byId('lesson-map');
  const display = stages.map((stage, index) => {
    const items = matched.filter(lesson => stageIndex(lesson.id) === index);
    if (!items.length) return '';
    return `<article class="stage stage-${index}">
      <header class="stage-head">${icon(stage.icon)}<div><h3>${stage.title}</h3><p>${stage.note}</p></div></header>
      <ol class="stage-list">${items.map(lesson => `<li><a class="lesson-link" href="#lesson-${lesson.id}">
        <span class="lesson-no">${number(lesson.id)}</span><span class="lesson-name">${lesson.title}</span>
        ${done.has(lesson.id) ? '<span aria-label="已完成">✓</span>' : '<span class="arrow" aria-hidden="true">›</span>'}
      </a></li>`).join('')}</ol></article>`;
  }).filter(Boolean);
  map.dataset.filtered = String(display.length === 1 && stageFilter !== -1);
  map.innerHTML = display.join('');
  byId('map-message').hidden = matched.length !== 0;
}

function renderLessonNav() {
  byId('lesson-nav').innerHTML = lessons.map(lesson =>
    `<a href="#lesson-${lesson.id}"${activeLesson === lesson.id ? ' aria-current="page"' : ''}>
      ${number(lesson.id)} · ${lesson.title}${done.has(lesson.id) ? ' <span aria-label="已完成">✓</span>' : ''}
    </a>`).join('');
}

function panel(title, content) {
  return `<section class="lesson-panel"><h2>${title}</h2><div class="panel-body">${content}</div></section>`;
}

function renderLesson(lesson) {
  const stage = stages[stageIndex(lesson.id)];
  const example = examples.find(item => item.id === lesson.id);
  const previous = lesson.id > 1 ? `<a class="btn btn-light" href="#lesson-${lesson.id - 1}">上一堂課</a>` : '';
  const next = lesson.id < 12 ? `<a class="btn btn-purple" href="#lesson-${lesson.id + 1}">下一堂課</a>`
    : '<a class="btn btn-purple" href="#gallery">前往作品展示</a>';
  const content = byId('lesson-content');
  content.innerHTML = `
    <header class="lesson-banner">
      <strong>第 ${lesson.id} 堂 · ${stage.name}</strong>
      <h1 tabindex="-1">${lesson.title}</h1><p>${lesson.intro}</p>
    </header>
    ${panel('課程目標與必備工具', `<div class="goal-grid">
      <div><h3>課程目標</h3><ul>${lesson.goals.map(value => `<li>${escape(value)}</li>`).join('')}</ul></div>
      <div><h3>必備工具</h3><ul>${lesson.tools.map(value => `<li>${escape(value)}</li>`).join('')}</ul></div>
    </div>`)}
    ${panel('操作步驟', `<div class="steps-grid"><ol>${lesson.steps.map(([title, description]) =>
      `<li><strong>${escape(title)}</strong><p>${escape(description)}</p></li>`).join('')}</ol>
      <figure class="step-diagram"><figcaption>操作路線</figcaption><ol class="flow">
      ${lesson.flow.map(step => `<li>${escape(step)}</li>`).join('')}</ol></figure></div>`)}
    ${panel('範例程式與 Gemini 提示詞', `<h3>${escape(lesson.filename)}</h3><pre><code>${escape(lesson.code)}</code></pre>
      <h3>Gemini 提示詞</h3><pre id="prompt-code" tabindex="0"><code>${escape(lesson.prompt)}</code></pre>
      <div class="actions"><button class="btn btn-gold" id="copy-prompt" type="button">複製 Gemini 提示詞</button>
      ${example ? `<a class="btn btn-purple" href="./downloads/${example.dir}.zip" download>下載完整範例</a>
      <a class="btn btn-light" href="./examples/${example.dir}/">開啟獨立範例</a>` : ''}</div>
      ${example && lesson.id !== 2 ? `<iframe class="demo-frame" title="${example.name}" src="./examples/${example.dir}/" loading="lazy"></iframe>` : ''}`)}
    ${panel('常見錯誤', `<h3>${escape(lesson.error[0])}</h3><p>${escape(lesson.error[1])}</p>`)}
    ${panel('實作任務', `<p>${escape(lesson.task)}</p><div id="practice-boxes"></div>
      <label class="practice-label task-check"><input type="checkbox" id="task-done"> 我已完成本堂實作任務</label>`)}
    ${panel('小測驗', '<div id="quiz"></div>')}
    ${panel('課程完成', `<div class="complete-row"><button class="btn btn-green" type="button" id="mark-complete" disabled>完成課程</button>
      <div class="actions">${previous}${next}</div></div><p class="complete-status" id="complete-status" role="status"></p>`)}
  `;

  const task = byId('task-done');
  const mark = byId('mark-complete');
  const status = byId('complete-status');
  const drills = practices[lesson.id] || [];
  const results = drills.map(() => false);
  let quizPassed = false;

  function checkReady() {
    const finished = done.has(lesson.id);
    const ready = task.checked && quizPassed && results.every(Boolean);
    mark.disabled = finished || !ready;
    mark.textContent = finished ? '課程已完成 ✓' : '完成課程';
    status.textContent = finished ? `已完成第 ${lesson.id} 堂。`
      : ready ? '挑戰通過，可以標記完成。' : '完成實作與互動練習，並答對全部 3 題後即可標記完成。';
  }

  drills.forEach((drill, i) => {
    byId('practice-boxes').append(drill(passed => {
      results[i] = passed;
      checkReady();
    }));
  });
  byId('quiz').append(makeQuiz(lesson.quiz, passed => { quizPassed = passed; checkReady(); }));
  task.addEventListener('change', checkReady);
  mark.addEventListener('click', () => {
    if (mark.disabled) return;
    const nextSet = new Set([...done, lesson.id]);
    const unlocked = badges.filter(badge =>
      badge.ids.every(id => nextSet.has(id)) && !badge.ids.every(id => done.has(id)));
    done = nextSet;
    const saved = write('completed', [...done]);
    updateProgress();
    checkReady();
    status.tabIndex = -1;
    status.focus({ preventScroll: true });
    toast(saved ? (unlocked.length ? `解鎖徽章：${unlocked.map(badge => badge.name).join('、')}` : '進度已儲存')
      : '進度已更新，瀏覽器無法永久儲存。');
  });

  byId('copy-prompt').addEventListener('click', async () => {
    const copied = await copyText(lesson.prompt);
    if (copied) {
      toast('提示詞已複製');
      return;
    }
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(byId('prompt-code'));
    selection.removeAllRanges();
    selection.addRange(range);
    byId('prompt-code').focus();
    toast('已選取提示詞，請按 Ctrl+C 或使用系統複製功能。');
  });
  checkReady();
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // 權限被拒或非 HTTPS 時，嘗試相容的瀏覽器剪貼簿方式。
  }
  const temporary = el('textarea');
  temporary.value = text;
  temporary.style.cssText = 'position:fixed;left:0;top:0;opacity:0';
  temporary.readOnly = true;
  const previous = document.activeElement;
  document.body.append(temporary);
  temporary.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    temporary.remove();
    previous?.focus();
  }
}

function renderGallery() {
  const list = byId('portfolio-list');
  list.replaceChildren();
  for (const entry of gallery) {
    if (!entry || typeof entry.name !== 'string') continue;
    const url = publicUrl(entry.url);
    if (!url) continue;
    const li = el('li');
    const link = el('a', '', entry.name);
    link.href = url;
    const remove = el('button', 'btn btn-light', '移除');
    remove.type = 'button';
    remove.setAttribute('aria-label', `移除 ${entry.name}`);
    remove.addEventListener('click', () => {
      gallery = gallery.filter(item => item !== entry);
      const saved = write('portfolio', gallery);
      byId('portfolio-status').textContent = saved ? '已移除作品。' : '作品已移除，僅在本次工作階段有效。';
      renderGallery();
      byId('portfolio-form').elements.name.focus();
    });
    li.append(link, remove);
    list.append(li);
  }
}

function publicUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password) return url.href;
  } catch {
    // 留給表單顯示可理解的錯誤。
  }
  return '';
}

function closeMenu() {
  byId('menu').setAttribute('aria-expanded', 'false');
  byId('top-nav').dataset.open = 'false';
}

function route(focus = false) {
  const hash = location.hash.slice(1);
  const match = /^lesson-([1-9]|1[0-2])$/.exec(hash);
  const lesson = match ? lessons[Number(match[1]) - 1] : null;
  byId('home').hidden = Boolean(lesson);
  byId('lesson-view').hidden = !lesson;
  if (lesson) {
    if (activeLesson !== lesson.id) {
      activeLesson = lesson.id;
      renderLesson(lesson);
      renderLessonNav();
    }
    document.title = `第 ${lesson.id} 堂 · ${lesson.title} | GitHub 程式冒險學院`;
    if (focus) byId('lesson-content').querySelector('h1').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } else {
    activeLesson = 0;
    document.title = 'GitHub 程式冒險學院';
    const target = byId(hash);
    if (target && (hash === 'home' || !target.closest('[hidden]'))) {
      if (focus) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
      target.scrollIntoView();
    } else window.scrollTo(0, 0);
  }
  closeMenu();
}

document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  byId('main').focus();
  byId('main').scrollIntoView();
});
byId('menu').addEventListener('click', event => {
  const open = event.currentTarget.getAttribute('aria-expanded') !== 'true';
  event.currentTarget.setAttribute('aria-expanded', String(open));
  byId('top-nav').dataset.open = String(open);
});
document.querySelector('.top').addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link?.hash === location.hash && !byId('top-nav').contains(document.activeElement)) closeMenu();
  else if (link?.hash === location.hash) {
    closeMenu();
    byId('menu').focus();
  }
});

const filters = document.querySelector('.filters');
['全部課程', ...stages.map(stage => stage.name)].forEach((label, index) => {
  const button = el('button', '', label);
  button.type = 'button';
  button.setAttribute('aria-pressed', String(index === 0));
  button.addEventListener('click', () => {
    stageFilter = index - 1;
    [...filters.children].forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderMap();
  });
  filters.append(button);
});
byId('search').addEventListener('input', renderMap);
byId('reset-progress').addEventListener('click', () => {
  if (!done.size) {
    toast('目前沒有學習進度。');
    return;
  }
  if (!window.confirm('清除全部課程完成紀錄與徽章？')) return;
  done = new Set();
  const saved = write('completed', []);
  updateProgress();
  toast(saved ? '學習進度已清除。' : '本次進度已清除，瀏覽器無法永久儲存。');
});

byId('portfolio-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const url = publicUrl(form.elements.url.value);
  const status = byId('portfolio-status');
  if (!name || !url) {
    status.textContent = '請填入作品名稱及有效的 HTTPS 網址。';
    return;
  }
  gallery.push({ name, url });
  const saved = write('portfolio', gallery);
  form.reset();
  status.textContent = saved ? '作品已加入這個瀏覽器的作品集。' : '作品已加入，僅在本次工作階段有效。';
  renderGallery();
});

byId('tool-grid').innerHTML = tools.map(([symbol, title, note, url]) =>
  `<a class="tool-card" href="${url}">${tile(symbol)}<h3>${title}</h3><p>${note}</p></a>`).join('');
byId('example-gallery').innerHTML = examples.map(example =>
  `<article class="show-card"><div class="show-art" style="--tile1:${example.tones[0]};--tile2:${example.tones[1]}">
    ${icon(example.icon)}</div><div class="show-body"><h3>${example.name}</h3><p>${example.note}</p>
    <a class="btn btn-green" href="./examples/${example.dir}/">開啟範例<span class="sr-only">：${example.name}</span></a></div></article>`).join('');
byId('downloads').innerHTML = examples.map(example =>
  `<article class="resource"><h3>${example.name}</h3><p>第 ${example.id} 堂 · ZIP 範例</p>
    <a class="btn btn-purple" href="./downloads/${example.dir}.zip" download>下載 ZIP<span class="sr-only">：${example.name}</span></a></article>`).join('');
byId('faq-items').innerHTML = faq.map(([q, a]) =>
  `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join('');

const narrow = matchMedia('(max-width: 740px)');
function setSidebar() { byId('lesson-menu').open = !narrow.matches; }
narrow.addEventListener('change', setSidebar);
byId('lesson-nav').addEventListener('click', event => {
  if (narrow.matches && event.target.closest('a')) byId('lesson-menu').open = false;
});
window.addEventListener('hashchange', () => route(true));
window.addEventListener('storage', event => {
  if (event.key !== 'github-adventure-v1:completed' && event.key !== null) return;
  done = completed();
  updateProgress();
  if (activeLesson) renderLesson(lessons[activeLesson - 1]);
});

renderGallery();
updateProgress();
setSidebar();
route();
