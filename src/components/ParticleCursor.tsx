import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  gold: boolean;
}

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    let animId: number;
    let lastX = -1000;
    let lastY = -1000;

    const spawnParticles = (x: number, y: number) => {
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(Math.floor(speed * 0.15) + 1, 5);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const v = Math.random() * 1.8 + 0.3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * v + dx * 0.05,
          vy: Math.sin(angle) * v + dy * 0.05,
          life: 1,
          size: Math.random() * 2.5 + 0.8,
          gold: Math.random() > 0.55,
        });
      }

      lastX = x;
      lastY = y;
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.98;
        p.life -= 0.022;

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const alpha = Math.pow(p.life, 1.5);
        const r = p.size * p.life;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        if (p.gold) {
          ctx.fillStyle = `rgba(245,166,35,${alpha * 0.85})`;
          if (p.life > 0.7) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(245,166,35,0.6)';
          } else {
            ctx.shadowBlur = 0;
          }
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.55})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      ctx.shadowBlur = 0;
    };

    animate();

    const onMouseMove = (e: MouseEvent) => spawnParticles(e.clientX, e.clientY);
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
