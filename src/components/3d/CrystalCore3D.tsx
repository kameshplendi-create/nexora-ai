import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CrystalCore3DProps {
  className?: string;
}

export const CrystalCore3D: React.FC<CrystalCore3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Faceted Octahedral Glass Crystal
    const crystalGeo = new THREE.OctahedronGeometry(1.4, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.2,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 2.1, // Diamond / Quartz refractive index
      thickness: 1.5,
      transparent: true,
      opacity: 0.85,
      flatShading: true
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    group.add(crystalMesh);

    // 2. Internal Floating Glowing Seed (Energy Source)
    const seedGeo = new THREE.IcosahedronGeometry(0.5, 1);
    const seedMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    group.add(seedMesh);

    // 3. Floating Orbital Gyro Rings
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.02, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.0, 0.015, 16, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // 4. Subtle Floating Prismatic Sparkles
    const sparkleCount = 40;
    const sparkleGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.9 + Math.random() * 0.8;
      sPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sPos[i * 3 + 2] = r * Math.cos(phi);
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xe0f2fe,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    group.add(sparkles);

    // Lighting
    const amb = new THREE.AmbientLight(0x0a1128, 2.0);
    scene.add(amb);

    const pLight1 = new THREE.PointLight(0x38bdf8, 5, 10);
    pLight1.position.set(3, 3, 3);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0x818cf8, 4, 10);
    pLight2.position.set(-3, -2, -2);
    scene.add(pLight2);

    // Pointer hover tilt
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
    };
    container.addEventListener('mousemove', onMouseMove);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        crystalMesh.rotation.y = t * 0.4 + mouseX;
        crystalMesh.rotation.x = Math.sin(t * 0.3) * 0.15 + mouseY;
        
        seedMesh.rotation.y = -t * 0.8;
        seedMesh.rotation.z = t * 0.4;

        ring1.rotation.z = t * 0.2;
        ring2.rotation.x = -t * 0.15;
        sparkles.rotation.y = t * 0.08;

        group.position.y = Math.sin(t * 1.5) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onMouseMove);

      crystalGeo.dispose();
      crystalMat.dispose();
      seedGeo.dispose();
      seedMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
      sparkleGeo.dispose();
      sparkleMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Refractive ambient aura */}
      <div className="absolute w-56 h-56 rounded-full bg-cyan-400/15 blur-2xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute w-44 h-44 rounded-full bg-indigo-500/20 blur-xl pointer-events-none -z-10" />

      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[280px] sm:min-h-[320px] cursor-pointer flex items-center justify-center"
      />
    </div>
  );
};
