import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroNeuralSphereProps {
  className?: string;
}

export const HeroNeuralSphere: React.FC<HeroNeuralSphereProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group to hold everything
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Core Glass Sphere with Fresnel effect
    const coreGeo = new THREE.SphereGeometry(1.5, 64, 64);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a192f,
      emissive: 0x0284c7,
      emissiveIntensity: 0.15,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.85,
      ior: 1.5,
      thickness: 1.2,
      transparent: true,
      opacity: 0.75,
      wireframe: false
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreSphere);

    // 2. Wireframe / Synaptic Latice
    const wireGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireSphere);

    // 3. Orbiting Neural Nodes
    const nodesCount = 28;
    const nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const altNodeMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });

    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < nodesCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodesCount);
      const theta = Math.sqrt(nodesCount * Math.PI) * phi;
      const radius = 1.68 + (i % 3) * 0.12;

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      const nodeMesh = new THREE.Mesh(nodeGeo, i % 4 === 0 ? altNodeMat : nodeMat);
      nodeMesh.position.copy(pos);
      nodesGroup.add(nodeMesh);
    }
    mainGroup.add(nodesGroup);

    // 4. Subtle Inter-node Synaptic Lines
    const linePositions: number[] = [];
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.1) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const synapticLines = new THREE.LineSegments(lineGeo, lineMat);
    nodesGroup.add(synapticLines);

    // 5. Cloud of floating ambient particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const pCoords = new Float32Array(particleCount * 3);
    const pScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 1.8;

      pCoords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pCoords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pCoords[i * 3 + 2] = r * Math.cos(phi);
      pScales[i] = Math.random() * 0.05 + 0.02;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 6. Realistic Ambient and Directional Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 4.0, 15);
    cyanLight.position.set(4, 3, 4);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x818cf8, 3.5, 15);
    violetLight.position.set(-4, -2, -3);
    scene.add(violetLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(0, 5, 5);
    scene.add(keyLight);

    // Interactive mouse / touch dragging with inertia
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousMouseX = clientX;
        previousMouseY = clientY;
      } else {
        // Subtle tilt on hover when not dragging
        const rect = container.getBoundingClientRect();
        const normX = (clientX - rect.left) / rect.width - 0.5;
        const normY = (clientY - rect.top) / rect.height - 0.5;
        targetRotationY = normX * 0.4;
        targetRotationX = normY * 0.4;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domEl.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerping
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      if (!prefersReducedMotion) {
        // Autonomous gentle rotation + floating
        mainGroup.rotation.y = currentRotationY + elapsedTime * 0.15;
        mainGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.6) * 0.08;
        mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.1;

        // Counter-rotation of internal wireframe & particles
        wireSphere.rotation.y = -elapsedTime * 0.1;
        wireSphere.rotation.z = elapsedTime * 0.05;
        particles.rotation.y = elapsedTime * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer for responsive fluid sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      domEl.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domEl.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      altNodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (domEl.parentNode) {
        domEl.parentNode.removeChild(domEl);
      }
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background soft realistic glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute w-60 h-60 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none -z-10" />

      {/* Interactive 3D Canvas */}
      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[340px] sm:min-h-[420px] md:min-h-[480px] cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Floating Status Pill */}
      <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 transition-opacity duration-300 pointer-events-none ${isInteracting ? 'bg-cyan-950/80 border border-cyan-400/40 text-cyan-300' : 'bg-slate-900/60 border border-slate-800 text-slate-400'}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>{isInteracting ? 'NEURAL AXIS INTERACTING' : 'INTERACTIVE 3D NEURAL SPHERE'}</span>
      </div>
    </div>
  );
};
