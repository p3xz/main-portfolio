'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WireframeBallProps {
  className?: string;
  color?: string;
  accentColor?: string;
  coreColor?: string;
}

export default function WireframeBall({
  className = '',
  color = '#94a3b8',       // Crisp slate line
  accentColor = '#38bdf8', // Subtle technical sky blue
  coreColor = '#ffffff',   // White vertex nodes
}: WireframeBallProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let animId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    try {
      scene = new THREE.Scene();

      const getWidth = () => container.clientWidth || 400;
      const getHeight = () => container.clientHeight || 400;

      const width = getWidth();
      const height = getHeight();

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 7.5);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });

      const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);

      const canvas = renderer.domElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);

      // Root Sphere Group
      const sphereGroup = new THREE.Group();
      scene.add(sphereGroup);

      // 1. Outer Icosahedron Wireframe
      const mainRadius = isMobile ? 1.9 : 2.3;
      const detail = isMobile ? 2 : 3;
      const icosaGeo = new THREE.IcosahedronGeometry(mainRadius, detail);
      const wireframeGeo = new THREE.WireframeGeometry(icosaGeo);

      const wireMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: isMobile ? 0.35 : 0.45,
        linewidth: 1.2,
      });

      const outerSphere = new THREE.LineSegments(wireframeGeo, wireMaterial);
      sphereGroup.add(outerSphere);

      // 2. Inner Core Geodesic Wireframe
      const innerGeo = new THREE.IcosahedronGeometry(mainRadius * 0.68, 2);
      const innerWireGeo = new THREE.WireframeGeometry(innerGeo);
      const innerMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(accentColor),
        transparent: true,
        opacity: isMobile ? 0.25 : 0.35,
      });
      const innerSphere = new THREE.LineSegments(innerWireGeo, innerMaterial);
      sphereGroup.add(innerSphere);

      // 3. Orbital Latitude Rings
      const ringGroup = new THREE.Group();
      const ringCount = 2;
      const ringMaterials: THREE.LineBasicMaterial[] = [];
      const ringGeometries: THREE.BufferGeometry[] = [];

      for (let i = 0; i < ringCount; i++) {
        const ringRadius = mainRadius * (1.12 + i * 0.16);
        const ringGeo = new THREE.BufferGeometry();
        const segments = 64;
        const positions = new Float32Array((segments + 1) * 3);

        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          positions[j * 3] = Math.cos(theta) * ringRadius;
          positions[j * 3 + 1] = Math.sin(theta) * ringRadius;
          positions[j * 3 + 2] = 0;
        }

        ringGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        ringGeometries.push(ringGeo);

        const ringMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(accentColor),
          transparent: true,
          opacity: 0.2 - i * 0.05,
        });
        ringMaterials.push(ringMat);

        const ring = new THREE.Line(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 4 + (i * Math.PI) / 6;
        ring.rotation.y = (i * Math.PI) / 5;
        ringGroup.add(ring);
      }
      sphereGroup.add(ringGroup);

      // 4. Subtle Vertex Nodes
      const posAttr = icosaGeo.getAttribute('position');
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', posAttr);

      const particleMat = new THREE.PointsMaterial({
        color: new THREE.Color(coreColor),
        size: isMobile ? 0.035 : 0.045,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });

      const vertexParticles = new THREE.Points(particleGeo, particleMat);
      sphereGroup.add(vertexParticles);

      // Mouse tracking (subtle and clamped)
      const handleMouseMove = (e: MouseEvent) => {
        if (isMobile || prefersReducedMotion) return;
        const nx = (e.clientX / (window.innerWidth || 1)) - 0.5;
        const ny = (e.clientY / (window.innerHeight || 1)) - 0.5;
        mouse.targetX = Math.max(-0.15, Math.min(0.15, nx));
        mouse.targetY = Math.max(-0.15, Math.min(0.15, ny));
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Resize Handler
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth || 400;
        const h = container.clientHeight || 400;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      window.addEventListener('resize', handleResize);

      // Render Loop
      const clock = new THREE.Clock();
      let isRunning = true;

      const animate = () => {
        if (!isRunning) return;
        animId = requestAnimationFrame(animate);

        const delta = clock.getDelta();

        if (!prefersReducedMotion) {
          const rotSpeed = isMobile ? 0.18 : 0.25;
          outerSphere.rotation.y += delta * rotSpeed;
          outerSphere.rotation.x += delta * (rotSpeed * 0.3);

          innerSphere.rotation.y -= delta * (rotSpeed * 0.5);
          innerSphere.rotation.z += delta * (rotSpeed * 0.2);

          ringGroup.rotation.z += delta * 0.08;
          ringGroup.rotation.y += delta * 0.06;

          vertexParticles.rotation.copy(outerSphere.rotation);

          mouse.x += (mouse.targetX - mouse.x) * 0.05;
          mouse.y += (mouse.targetY - mouse.y) * 0.05;

          sphereGroup.rotation.y = mouse.x * 0.3;
          sphereGroup.rotation.x = -mouse.y * 0.3;
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };

      animId = requestAnimationFrame(animate);

      return () => {
        isRunning = false;
        if (animId) cancelAnimationFrame(animId);
        resizeObserver.disconnect();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        icosaGeo.dispose();
        wireframeGeo.dispose();
        wireMaterial.dispose();
        innerGeo.dispose();
        innerWireGeo.dispose();
        innerMaterial.dispose();
        ringGeometries.forEach((g) => g.dispose());
        ringMaterials.forEach((m) => m.dispose());
        particleGeo.dispose();
        particleMat.dispose();

        if (renderer) {
          renderer.dispose();
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        }
      };
    } catch {
      return () => {};
    }
  }, [color, accentColor, coreColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
