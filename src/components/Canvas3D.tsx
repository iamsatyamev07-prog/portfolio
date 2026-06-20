import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Canvas3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const testCanvas = document.createElement('canvas');
    const testCtx = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!testCtx) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Main starfield — small white points
    const starGeo = new THREE.BufferGeometry();
    const starCount = 6000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 120;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.018, color: 0xffffff, transparent: true, opacity: 0.85 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Subtle gold dust — sparse larger points with gold tint
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 400;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPos[i] = (Math.random() - 0.5) * 80;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ size: 0.06, color: 0xf5a623, transparent: true, opacity: 0.35 });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    camera.position.z = 5;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0001;
      dust.rotation.y -= 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(camera.position, {
        x: (e.clientX - window.innerWidth / 2) * 0.004,
        y: -(e.clientY - window.innerHeight / 2) * 0.004,
        duration: 2.5,
      });
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas3d"
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
