// 儲存格只在這個瀏覽器使用。遇到封鎖或滿額仍保留本次工作階段。
const memory = new Map();
const prefix = 'github-adventure-v1:';

export function read(key, fallback) {
  if (memory.has(key)) return memory.get(key);
  try {
    const value = localStorage.getItem(prefix + key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(prefix + key, JSON.stringify(value));
    memory.delete(key);
    return true;
  } catch {
    memory.set(key, value);
    return false;
  }
}

export function completed() {
  const saved = read('completed', []);
  return new Set(Array.isArray(saved) ? saved.filter(id => Number.isInteger(id) && id >= 1 && id <= 12) : []);
}

export const badges = [
  { name: '啟程旅人', ids: [1], description: '完成第 1 堂' },
  { name: '基礎建造師', ids: [1, 2, 3, 4], description: '完成 4 堂基礎課' },
  { name: '遊戲工匠', ids: [5, 6, 7, 8], description: '完成 4 堂進階課' },
  { name: '協作探險家', ids: [9, 10, 11, 12], description: '完成 4 堂高階課' },
  { name: '程式冒險大師', ids: Array.from({ length: 12 }, (_, i) => i + 1), description: '完成全部 12 堂課' }
];
