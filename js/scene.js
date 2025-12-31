import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

// Scene setup with futuristic atmosphere
export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a1a);
  scene.fog = new THREE.Fog(0x0a0a1a, 50, 200);
  return scene;
}

// Camera setup
export function createCamera() {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, -10);
  return camera;
}

// Renderer setup
export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

// Lighting setup - Futuristic neon atmosphere
export function setupLighting(scene) {
  const ambient = new THREE.AmbientLight(0x4444ff, 0.4);
  scene.add(ambient);
  
  const dirLight = new THREE.DirectionalLight(0xaaaaff, 0.6);
  dirLight.position.set(10, 20, 10);
  scene.add(dirLight);

  // Cyan accent light
  const accentLight1 = new THREE.PointLight(0x00ffff, 0.3, 50);
  accentLight1.position.set(-10, 10, 20);
  scene.add(accentLight1);

  // Magenta accent light
  const accentLight2 = new THREE.PointLight(0xff00ff, 0.3, 50);
  accentLight2.position.set(10, 10, 20);
  scene.add(accentLight2);
}
