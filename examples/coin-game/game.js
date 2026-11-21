const width = 7;
const height = 5;
const goal = 5;
const game = document.querySelector('#game');
const scoreLabel = document.querySelector('#score');
const startButton = document.querySelector('#start');
const position = document.querySelector('#position');
const controls = [...document.querySelectorAll('[data-move]')];
const directions = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const keys = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down',
  ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' };
const cells = Array.from({ length: width * height }, () => {
  const cell = document.createElement('span');
  cell.className = 'cell';
  cell.setAttribute('aria-hidden', 'true');
  game.append(cell);
  return cell;
});

let player = { x: 3, y: 2 };
let coin = null;
let score = 0;
let playing = false;

function placeCoin() {
  // 從排除玩家位置的候選格抽一格，不需要反覆重抽。
  const playerIndex = player.y * width + player.x;
  let index = Math.floor(Math.random() * (cells.length - 1));
  if (index >= playerIndex) index += 1;
  coin = { x: index % width, y: Math.floor(index / width) };
}

function render() {
  cells.forEach(cell => { delete cell.dataset.piece; });
  cells[player.y * width + player.x].dataset.piece = 'player';
  if (coin) cells[coin.y * width + coin.x].dataset.piece = 'coin';
  scoreLabel.textContent = `金幣 ${score} / ${goal}`;
  controls.forEach(button => { button.disabled = !playing; });
}

function describe() {
  return `你在第 ${player.y + 1} 列第 ${player.x + 1} 欄，金幣在第 ${coin.y + 1} 列第 ${coin.x + 1} 欄。`;
}

function move(direction) {
  if (!playing) return;
  const [dx, dy] = directions[direction];
  player.x = Math.max(0, Math.min(width - 1, player.x + dx));
  player.y = Math.max(0, Math.min(height - 1, player.y + dy));
  const collected = player.x === coin.x && player.y === coin.y;
  if (collected) {
    score += 1;
    if (score < goal) placeCoin();
    else { coin = null; playing = false; }
  }
  position.textContent = playing ? `${collected ? '拿到一枚！' : ''}${describe()}` : '過關了！你收齊了金幣。';
  render();
  if (!playing) startButton.focus();
}

startButton.addEventListener('click', () => {
  player = { x: 3, y: 2 };
  score = 0;
  playing = true;
  placeCoin();
  startButton.textContent = '重新開始';
  position.textContent = describe();
  render();
  game.focus();
});

game.addEventListener('keydown', event => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (!playing || !Object.hasOwn(keys, key) || event.altKey || event.ctrlKey || event.metaKey) return;
  event.preventDefault();
  move(keys[key]);
});

controls.forEach(button => button.addEventListener('click', () => move(button.dataset.move)));
render();
