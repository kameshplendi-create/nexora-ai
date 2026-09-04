import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Activity, ShieldCheck, Cpu } from 'lucide-react';

interface RobotViewer3DProps {
  className?: string;
}

export const RobotViewer3D: React.FC<RobotViewer3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'sensors' | 'vision' | 'kinematics'>('sensors');
  const [telemetry, setTelemetry] = useState({
    jointTemp: '36.4°C',
    latency: '1.8ms',
    hz: '120 FPS',
    powerDraw: '48W'
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // High-tech Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.15
    });

    const visorGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8
    });

    const circuitLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    // 1. Robot Head (Chiseled Cyber Helmet)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.6, 0);
    robotGroup.add(headGroup);

    // Cranium
    const craniumGeo = new THREE.BoxGeometry(1.1, 0.9, 1.0);
    const cranium = new THREE.Mesh(craniumGeo, chassisMat);
    headGroup.add(cranium);

    // Face Plate / Visor
    const visorGeo = new THREE.BoxGeometry(0.9, 0.25, 0.3);
    visorGeo.translate(0, 0.05, 0.42);
    const visor = new THREE.Mesh(visorGeo, visorGlowMat);
    headGroup.add(visor);

    // Secondary Vision Sensors (Stereo Ocular Lenses)
    const lensGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
    lensGeo.rotateX(Math.PI / 2);
    const leftLens = new THREE.Mesh(lensGeo, new THREE.MeshBasicMaterial({ color: 0x7dd3fc }));
    leftLens.position.set(-0.25, 0.05, 0.58);
    const rightLens = leftLens.clone();
    rightLens.position.x = 0.25;
    headGroup.add(leftLens);
    headGroup.add(rightLens);

    // Ear Sensor Cowlings
    const earGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 16);
    earGeo.rotateZ(Math.PI / 2);
    const leftEar = new THREE.Mesh(earGeo, accentMat);
    leftEar.position.set(-0.62, 0, 0);
    const rightEar = leftEar.clone();
    rightEar.position.x = 0.62;
    headGroup.add(leftEar);
    headGroup.add(rightEar);

    // 2. Neck Joint with Hydraulic Piston
    const neckGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.45, 20);
    const neck = new THREE.Mesh(neckGeo, accentMat);
    neck.position.set(0, 0.05, 0);
    robotGroup.add(neck);

    // 3. Torso / Shoulder Collar Assembly
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.9, 0);
    robotGroup.add(torsoGroup);

    const chestGeo = new THREE.BoxGeometry(2.0, 1.2, 1.1);
    const chest = new THREE.Mesh(chestGeo, chassisMat);
    torsoGroup.add(chest);

    // Chest Central Reactor / Core
    const coreTorusGeo = new THREE.TorusGeometry(0.28, 0.04, 16, 32);
    const coreTorusMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const chestCore = new THREE.Mesh(coreTorusGeo, coreTorusMat);
    chestCore.position.set(0, 0.1, 0.56);
    torsoGroup.add(chestCore);

    // 4. Floating Holographic LiDAR Halo
    const lidarRingGeo = new THREE.TorusGeometry(1.2, 0.015, 8, 48);
    lidarRingGeo.rotateX(Math.PI / 2);
    const lidarRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const lidarRing = new THREE.Mesh(lidarRingGeo, lidarRingMat);
    lidarRing.position.set(0, 1.35, 0);
    robotGroup.add(lidarRing);

    // Subtle Animated Circuit Lines
    const circuitPoints = [
      new THREE.Vector3(-0.5, 0.4, 0.52),
      new THREE.Vector3(-0.2, 0.1, 0.52),
      new THREE.Vector3(0.2, 0.1, 0.52),
      new THREE.Vector3(0.5, 0.4, 0.52),
    ];
    const circuitGeo = new THREE.BufferGeometry().setFromPoints(circuitPoints);
    const circuitMesh = new THREE.Line(circuitGeo, circuitLineMat);
    torsoGroup.add(circuitMesh);

    // Lighting
    const amb = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(amb);

    const blueSpot = new THREE.PointLight(0x38bdf8, 4, 12);
    blueSpot.position.set(3, 4, 3);
    scene.add(blueSpot);

    const purpleBack = new THREE.PointLight(0x818cf8, 3, 10);
    purpleBack.position.set(-3, 2, -3);
    scene.add(purpleBack);

    // Interactive mouse drag and hover tracking
    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx * 0.7;
      targetY = ny * 0.4;
    };
    container.addEventListener('mousemove', handlePointerMove);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      currX += (targetX - currX) * 0.05;
      currY += (targetY - currY) * 0.05;

      if (!prefersReducedMotion) {
        // Natural articulated head look-around
        headGroup.rotation.y = currX + Math.sin(t * 0.8) * 0.06;
        headGroup.rotation.x = currY + Math.cos(t * 1.1) * 0.03;
        
        // Gentle breathing torso movement
        torsoGroup.position.y = -0.9 + Math.sin(t * 1.5) * 0.02;
        robotGroup.position.y = Math.sin(t * 1.2) * 0.04;

        // LiDAR spin
        lidarRing.rotation.y = t * 1.2;
        lidarRing.rotation.x = Math.PI / 2 + Math.sin(t * 2) * 0.05;

        // Visor pulse
        const pulse = 0.8 + Math.sin(t * 4) * 0.2;
        visorGlowMat.color.setRGB(0.22 * pulse, 0.74 * pulse, 0.97 * pulse);
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
      container.removeEventListener('mousemove', handlePointerMove);

      craniumGeo.dispose();
      chassisMat.dispose();
      accentMat.dispose();
      visorGeo.dispose();
      visorGlowMat.dispose();
      lensGeo.dispose();
      earGeo.dispose();
      neckGeo.dispose();
      chestGeo.dispose();
      coreTorusGeo.dispose();
      coreTorusMat.dispose();
      lidarRingGeo.dispose();
      lidarRingMat.dispose();
      circuitGeo.dispose();
      circuitLineMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* 3D Canvas */}
      <div 
        ref={containerRef} 
        className="w-full h-72 sm:h-88 md:h-96 cursor-crosshair flex items-center justify-center select-none"
      />

      {/* Interactive Mode Switches */}
      <div className="w-full max-w-sm px-4 mt-2">
        <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur-md">
          <button
            onClick={() => {
              setActiveMode('sensors');
              setTelemetry({ jointTemp: '36.4°C', latency: '1.8ms', hz: '120 FPS', powerDraw: '48W' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeMode === 'sensors' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>LiDAR Array</span>
          </button>
          <button
            onClick={() => {
              setActiveMode('vision');
              setTelemetry({ jointTemp: '38.1°C', latency: '1.2ms', hz: '240 FPS', powerDraw: '54W' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeMode === 'vision' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Optic Vision</span>
          </button>
          <button
            onClick={() => {
              setActiveMode('kinematics');
              setTelemetry({ jointTemp: '35.9°C', latency: '2.1ms', hz: '90 FPS', powerDraw: '42W' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeMode === 'kinematics' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Kinematics</span>
          </button>
        </div>

        {/* Live Telemetry Bar */}
        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="block text-[10px] text-slate-400 font-mono">LATENCY</span>
            <span className="text-xs font-mono font-semibold text-cyan-300">{telemetry.latency}</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="block text-[10px] text-slate-400 font-mono">CYCLE</span>
            <span className="text-xs font-mono font-semibold text-emerald-400">{telemetry.hz}</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="block text-[10px] text-slate-400 font-mono">CORE TEMP</span>
            <span className="text-xs font-mono font-semibold text-sky-300">{telemetry.jointTemp}</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="block text-[10px] text-slate-400 font-mono">POWER</span>
            <span className="text-xs font-mono font-semibold text-indigo-300">{telemetry.powerDraw}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
