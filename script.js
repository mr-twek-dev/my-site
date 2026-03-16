const container = document.getElementById("bg-canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#05070f");
scene.fog = new THREE.Fog("#05070f", 20, 120);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const particlesCount = 1200;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  const i3 = i * 3;
  positions[i3] = (Math.random() - 0.5) * 180;
  positions[i3 + 1] = (Math.random() - 0.5) * 120;
  positions[i3 + 2] = (Math.random() - 0.5) * 120;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: "#d7ecff",
  size: 0.35,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const glowGeometry = new THREE.TorusGeometry(28, 0.28, 16, 180);
const glowMaterial = new THREE.MeshBasicMaterial({ color: "#7cf5d6", transparent: true, opacity: 0.25 });
const ring = new THREE.Mesh(glowGeometry, glowMaterial);
ring.rotation.x = Math.PI * 0.68;
scene.add(ring);

const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();

  particles.rotation.y = t * 0.02;
  particles.rotation.x = Math.sin(t * 0.22) * 0.08;

  ring.rotation.z = t * 0.1;
  ring.position.y = Math.sin(t * 0.45) * 1.4;

  camera.position.x = Math.sin(t * 0.15) * 2.2;
  camera.position.y = Math.cos(t * 0.12) * 1.6;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
});

animate();
