import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const view = document.querySelector('#ocean');
const status = document.querySelector('#status');
const spin = document.querySelector('#spin');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

function start() {
  // 先檢查 WebGL 2。不可用時呈現靜態示意和可理解的提示。
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', { antialias: true });
  if (!context) {
    const image = new Image();
    image.src = './underwater.svg';
    image.alt = '靜態示意：黃色潛水艇停在藍色海床上方。';
    view.append(image);
    status.textContent = '目前瀏覽器無法使用 WebGL 2。畫面顯示海底示意圖。';
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  view.append(canvas);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x196b9b);
  scene.fog = new THREE.Fog(0x196b9b, 10, 26);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 40);
  camera.position.set(5.7, 3.4, 6.4);
  const orbit = new OrbitControls(camera, canvas);
  orbit.target.set(0, 1.03, 0);
  orbit.minDistance = 3.2;
  orbit.maxDistance = 12;
  orbit.maxPolarAngle = Math.PI / 2 - 0.02;
  orbit.enablePan = false;
  orbit.update();

  scene.add(new THREE.HemisphereLight(0xc8f7ff, 0x344771, 2.5));
  const sun = new THREE.DirectionalLight(0xffffff, 2.4);
  sun.position.set(-3, 5, 4);
  scene.add(sun);

  function block(width, height, depth, color, x, y, z) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshStandardMaterial({ color }));
    box.position.set(x, y, z);
    scene.add(box);
    return box;
  }

  block(15, 0.3, 15, 0x97a994, 0, -0.16, 0);
  for (const [x, z] of [[-3, -1], [2.8, -1.6], [-1.8, 2.3], [2, 1.7], [-2, -3]]) {
    block(.75, .28, .65, 0x4c7d8b, x, .14, z);
    const kelp = block(.19, .7, .19, 0x1fa47d, x + .22, .55, z);
    kelp.rotation.z = .22;
    block(.36, .23, .2, 0x80c283, x + .13, .92, z);
  }
  for (const [x, y, z, size] of [[1.3, 2, .7, .1], [1.5, 2.4, .7, .15], [1.35, 2.9, .65, .10]]) {
    const bubble = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 0), new THREE.MeshStandardMaterial({
      color: 0xb3f5ff, transparent: true, opacity: .55
    }));
    bubble.position.set(x, y, z);
    scene.add(bubble);
  }

  let model;
  let rotating = !reduced.matches;
  let error = '';
  function updateSpinButton() {
    spin.setAttribute('aria-pressed', String(!rotating));
    spin.textContent = rotating ? '暫停模型旋轉' : '開始模型旋轉';
  }
  updateSpinButton();
  reduced.addEventListener('change', () => { rotating = !reduced.matches; updateSpinButton(); });

  new GLTFLoader().load('./submarine.glb', gltf => {
    model = gltf.scene;
    model.position.y = 1.2;
    scene.add(model);
    spin.disabled = false;
    status.textContent = 'GLB 模型已載入：探險潛水艇。';
  }, undefined, () => {
    error = 'GLB 載入失敗。請以 HTTP 預覽並確認 submarine.glb 在同一資料夾。';
    status.textContent = error;
  });

  function turn(angle) {
    const offset = camera.position.clone().sub(orbit.target);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    camera.position.copy(orbit.target).add(offset);
    orbit.update();
  }
  for (const [name, angle] of [['left', .25], ['right', -.25]]) {
    const button = document.querySelector('#' + name);
    button.disabled = false;
    button.addEventListener('click', () => turn(angle));
  }
  spin.addEventListener('click', () => { rotating = !rotating; updateSpinButton(); });

  new ResizeObserver(() => {
    const width = view.clientWidth;
    const height = view.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }).observe(view);

  let lastFrame = 0;
  renderer.setAnimationLoop(time => {
    if (lastFrame && model && rotating && !error) model.rotation.y += Math.min((time - lastFrame) / 1000, 0.05) * 0.65;
    lastFrame = time;
    renderer.render(scene, camera);
  });
}

try {
  start();
} catch {
  status.textContent = '無法啟動 3D。請確認瀏覽器允許 WebGL 2 與硬體加速。';
}
