const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let particles = [];
const particleCount = 95;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles() {
  particles = Array.from({ length: particleCount }, () => ({
    x: random(0, width),
    y: random(0, height),
    r: random(0.8, 2.8),
    vx: random(-0.22, 0.22),
    vy: random(-0.18, 0.18),
  }));
}

function drawGradientBackground() {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0b1022");
  gradient.addColorStop(0.5, "#0a1b36");
  gradient.addColorStop(1, "#1a0f2f");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 130) {
        const alpha = 1 - dist / 130;
        ctx.strokeStyle = `rgba(124, 245, 214, ${alpha * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
}

function updateParticles() {
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(210, 235, 255, 0.82)";
    ctx.fill();
  }
}

function animate() {
  drawGradientBackground();
  connectParticles();
  updateParticles();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  createParticles();
});

resize();
createParticles();
animate();
