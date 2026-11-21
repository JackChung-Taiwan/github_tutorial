const button = document.querySelector('#theme');
const status = document.querySelector('#theme-status');

// aria-pressed 告訴輔助科技目前是否開啟夜間主題。
button.addEventListener('click', () => {
  const dark = button.getAttribute('aria-pressed') !== 'true';
  document.body.dataset.dark = String(dark);
  button.setAttribute('aria-pressed', String(dark));
  button.textContent = dark ? '關閉夜間主題' : '開啟夜間主題';
  status.textContent = dark ? '目前是夜間主題。' : '目前是白天主題。';
});
