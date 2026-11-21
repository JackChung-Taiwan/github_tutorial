const id = name => document.getElementById(name);
const counter = id('counter');
const input = id('answer');
const feedback = id('feedback');
const speechStatus = id('speech-status');
const speak = id('speak');
const check = id('check');
const next = id('next');
const restart = id('restart');

let questions = [];
let index = 0;
let score = 0;
let answered = false;
let speaking;

function stopSpeech() {
  speaking = undefined;
  window.speechSynthesis?.cancel();
}

function loadQuestion(focus = false) {
  stopSpeech();
  const { tip, chunks } = questions[index];
  counter.textContent = `第 ${index + 1} / ${questions.length} 題 · 分數 ${score}`;
  id('tip').textContent = tip;
  id('chunks').textContent = chunks.join(' · ');
  input.value = '';
  feedback.textContent = '';
  speechStatus.textContent = '';
  answered = false;
  input.disabled = check.disabled = speak.disabled = false;
  next.disabled = true;
  next.textContent = index + 1 === questions.length ? '查看結果' : '下一題';
  restart.hidden = true;
  if (focus) input.focus();
}

// 語音播報需要使用者主動觸發。無語音時仍可閱讀拼讀線索。
speak.addEventListener('click', () => {
  if (!('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window)) {
    speechStatus.textContent = '這個瀏覽器不支援語音，請用拼讀線索。';
    return;
  }
  stopSpeech();
  const word = new SpeechSynthesisUtterance(questions[index].word);
  word.lang = 'en-US';
  word.rate = 0.82;
  word.onerror = () => {
    if (speaking === word) speechStatus.textContent = '英文語音無法播放，請用拼讀線索。';
  };
  word.onend = () => {
    if (speaking === word) speechStatus.textContent = '播放完成。';
  };
  speaking = word;
  speechStatus.textContent = '播放英文中…';
  window.speechSynthesis.speak(word);
});

id('spelling').addEventListener('submit', event => {
  event.preventDefault();
  if (answered || !questions.length) return;
  if (input.value.trim().toLowerCase() !== questions[index].word) {
    feedback.textContent = '再試一次。照著拼讀線索，把字母拼在一起。';
    input.focus();
    return;
  }
  answered = true;
  score += 1;
  feedback.textContent = '答對了！加 1 分。';
  counter.textContent = `第 ${index + 1} / ${questions.length} 題 · 分數 ${score}`;
  input.disabled = check.disabled = true;
  next.disabled = false;
  next.focus();
});

next.addEventListener('click', () => {
  if (!answered) return;
  index += 1;
  if (index < questions.length) {
    loadQuestion(true);
    return;
  }
  stopSpeech();
  speechStatus.textContent = '';
  speak.disabled = next.disabled = true;
  counter.textContent = '挑戰完成';
  id('tip').textContent = '';
  id('chunks').textContent = '—';
  feedback.textContent = `恭喜！總分 ${score} / ${questions.length}。`;
  restart.hidden = false;
  restart.focus();
});
restart.addEventListener('click', () => {
  index = score = 0;
  loadQuestion(true);
});

async function start() {
  try {
    const response = await fetch('./questions.json');
    if (!response.ok) throw new Error('題庫未找到');
    const items = await response.json();
    if (!Array.isArray(items) || !items.length || !items.every(item =>
      typeof item?.word === 'string' && /^[a-z]+$/.test(item.word) &&
      typeof item.tip === 'string' && Array.isArray(item.chunks) && item.chunks.every(chunk => typeof chunk === 'string'))) {
      throw new Error('題庫格式錯誤');
    }
    questions = items;
    loadQuestion();
  } catch {
    counter.textContent = '無法讀取題庫。請確認 questions.json 在同一層，並以 HTTP 預覽開啟。';
  }
}

start();
