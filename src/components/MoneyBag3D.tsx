import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Coins, DollarSign, Sparkles, TrendingUp, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export const MoneyBag3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeStat, setActiveStat] = useState<'25M' | '5M' | '1927'>('5M');
  const rainCoinsTriggerRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate-900

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff1b5, 2.8);
    dirLight.position.set(4, 8, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const rimBlue = new THREE.PointLight(0x002d62, 4, 15);
    rimBlue.position.set(-5, 2, -2);
    scene.add(rimBlue);

    const rimGold = new THREE.PointLight(0xf59e0b, 5, 15);
    rimGold.position.set(5, -1, 3);
    scene.add(rimGold);

    // Main Group
    const bagGroup = new THREE.Group();
    scene.add(bagGroup);

    // 1. Build 3D Money Bag
    // Bag Base (Squashed sphere)
    const bodyGeom = new THREE.SphereGeometry(1.2, 32, 24);
    bodyGeom.scale(1.1, 1.0, 1.0);
    const bagMat = new THREE.MeshStandardMaterial({
      color: 0x92400e, // Warm canvas burlap / brown leather
      roughness: 0.8,
      metalness: 0.1,
    });
    const bagBody = new THREE.Mesh(bodyGeom, bagMat);
    bagBody.position.y = -0.3;
    bagBody.castShadow = true;
    bagGroup.add(bagBody);

    // Bag Neck (Cylinder constriction)
    const neckGeom = new THREE.CylinderGeometry(0.55, 0.8, 0.5, 24);
    const neckMesh = new THREE.Mesh(neckGeom, bagMat);
    neckMesh.position.y = 0.65;
    bagGroup.add(neckMesh);

    // Rope Tie around neck
    const ropeGeom = new THREE.TorusGeometry(0.58, 0.08, 12, 24);
    ropeGeom.rotateX(Math.PI / 2);
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.6 });
    const ropeMesh = new THREE.Mesh(ropeGeom, ropeMat);
    ropeMesh.position.y = 0.65;
    bagGroup.add(ropeMesh);

    // Bag Flared Top (Ruffle)
    const topGeom = new THREE.ConeGeometry(0.9, 0.65, 24, 1, true);
    topGeom.rotateX(Math.PI);
    const topMesh = new THREE.Mesh(topGeom, bagMat);
    topMesh.position.y = 1.15;
    bagGroup.add(topMesh);

    // Golden Dollar / Currency Emblem on the bag front
    const emblemGeom = new THREE.TorusGeometry(0.42, 0.06, 16, 32);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });
    const emblem = new THREE.Mesh(emblemGeom, goldMat);
    emblem.position.set(0, -0.3, 1.22);
    bagGroup.add(emblem);

    // Vertical line through emblem
    const barGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 12);
    const barMesh = new THREE.Mesh(barGeom, goldMat);
    barMesh.position.set(0, -0.3, 1.23);
    bagGroup.add(barMesh);

    // 2. Floating 3D Gold Coins around the bag
    const coinGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.05, 24);
    coinGeom.rotateX(Math.PI / 2);

    const coins: { mesh: THREE.Mesh; orbitSpeed: number; angle: number; radius: number; yBase: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const coin = new THREE.Mesh(coinGeom, goldMat);
      coin.castShadow = true;
      const angle = (i / 14) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.9;
      const yBase = -0.8 + Math.random() * 1.8;
      coin.position.set(Math.cos(angle) * radius, yBase, Math.sin(angle) * radius);
      coin.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(coin);
      coins.push({
        mesh: coin,
        orbitSpeed: 0.015 + Math.random() * 0.02,
        angle,
        radius,
        yBase,
      });
    }

    // 3. Floating 1926 Bonds ("Bono Empréstito $5,000,000 USD")
    const bondGeom = new THREE.BoxGeometry(0.8, 0.45, 0.02);
    const bondMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      metalness: 0.1,
      roughness: 0.5,
    });

    const bonds: { mesh: THREE.Mesh; angle: number; radius: number; speed: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const bond = new THREE.Mesh(bondGeom, bondMat);
      const angle = (i / 4) * Math.PI * 2;
      const radius = 2.4;
      bond.position.set(Math.cos(angle) * radius, 0.4 + (i % 2) * 0.5, Math.sin(angle) * radius);
      scene.add(bond);
      bonds.push({ mesh: bond, angle, radius, speed: 0.008 });
    }

    // Rain coins particle burst
    rainCoinsTriggerRef.current = () => {
      soundEngine.playChime();
      coins.forEach((c) => {
        c.mesh.position.y = 3.5 + Math.random() * 2;
      });
    };

    // Mouse Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      bagGroup.rotation.y += dx * 0.01;
      bagGroup.rotation.x = Math.max(-0.4, Math.min(0.4, bagGroup.rotation.x + dy * 0.01));
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch
    let prevTouchX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouchX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevTouchX;
      prevTouchX = e.touches[0].clientX;
      bagGroup.rotation.y += dx * 0.01;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    canvasEl.addEventListener('touchstart', onTouchStart, { passive: true });
    canvasEl.addEventListener('touchmove', onTouchMove, { passive: true });
    canvasEl.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        bagGroup.rotation.y += 0.008;
      }

      // Gentle floating bob
      bagGroup.position.y = Math.sin(elapsed * 2) * 0.08;

      // Coins Orbit and Spin
      coins.forEach((c) => {
        c.angle += c.orbitSpeed;
        c.mesh.position.x = Math.cos(c.angle) * c.radius;
        c.mesh.position.z = Math.sin(c.angle) * c.radius;

        // If rain was triggered and coin is falling
        if (c.mesh.position.y > c.yBase) {
          c.mesh.position.y -= 0.06;
        } else {
          c.mesh.position.y = c.yBase + Math.sin(elapsed * 3 + c.angle) * 0.12;
        }

        c.mesh.rotation.x += 0.02;
        c.mesh.rotation.y += 0.03;
      });

      // Bonds Orbit
      bonds.forEach((b) => {
        b.angle += b.speed;
        b.mesh.position.x = Math.cos(b.angle) * b.radius;
        b.mesh.position.z = Math.sin(b.angle) * b.radius;
        b.mesh.rotation.y = -b.angle + Math.PI / 2;
        b.mesh.rotation.z = Math.sin(elapsed + b.angle) * 0.15;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasEl.removeEventListener('touchstart', onTouchStart);
      canvasEl.removeEventListener('touchmove', onTouchMove);
      canvasEl.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            Visualizador Económico 3D · Empréstitos y Bonos
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Bolsa de Dinero 3D: Los Recursos del Empréstito (1926–1927)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              rainCoinsTriggerRef.current();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Lluvia de Bonos y Monedas
          </button>
          <button
            onClick={() => {
              setIsRotating(!isRotating);
              soundEngine.playClick();
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Pausar o reanudar rotación"
          >
            <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full h-[360px] sm:h-[400px] bg-slate-950 cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Legend */}
        <div className="absolute top-3 right-4 pointer-events-none text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded backdrop-blur border border-slate-800">
          Arrastra para rotar la bolsa 360°
        </div>

        {/* Dynamic Card Display */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 shadow-2xl">
          {activeStat === '25M' && (
            <div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
                Dato de Apoyo #2 del Documento
              </div>
              <div className="text-xl font-extrabold text-amber-400 tabular-nums">
                $25,000,000 USD
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                El gobierno de Vásquez buscó este empréstito para consolidar y pagar la deuda dejada por el gobierno Militar y realizar nuevas inversiones públicas.
              </p>
            </div>
          )}

          {activeStat === '5M' && (
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Dato de Apoyo #3 & Pregunta 6
              </div>
              <div className="text-xl font-extrabold text-amber-400 tabular-nums">
                $5,000,000 USD en Bonos
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                A finales de 1926 se aprobaron nuevos empréstitos y se emitieron los primeros cinco millones en bonos, activando la circulación de dinero y la construcción.
              </p>
            </div>
          )}

          {activeStat === '1927' && (
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                Consecuencia Económica
              </div>
              <div className="text-xl font-extrabold text-emerald-400">
                Prosperidad de 1927
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                La combinación de mayor circulación monetaria, empleo en obras públicas y aumento de artículos de exportación generó el auge de 1927.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 border-t border-slate-800 bg-slate-950/90 divide-x divide-slate-800">
        <button
          onClick={() => {
            setActiveStat('25M');
            soundEngine.playClick();
          }}
          className={`p-3 text-center transition-colors ${
            activeStat === '25M' ? 'bg-slate-800/80 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-xs text-slate-400">Meta del Empréstito</div>
          <div className="text-sm font-bold tabular-nums">$25,000,000 USD</div>
        </button>
        <button
          onClick={() => {
            setActiveStat('5M');
            soundEngine.playClick();
          }}
          className={`p-3 text-center transition-colors ${
            activeStat === '5M' ? 'bg-slate-800/80 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-xs text-slate-400">Emisión Bonos 1926</div>
          <div className="text-sm font-bold tabular-nums">$5,000,000 USD</div>
        </button>
        <button
          onClick={() => {
            setActiveStat('1927');
            soundEngine.playClick();
          }}
          className={`p-3 text-center transition-colors ${
            activeStat === '1927' ? 'bg-slate-800/80 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-xs text-slate-400">Resultado Económico</div>
          <div className="text-sm font-bold">Prosperidad 1927</div>
        </button>
      </div>
    </div>
  );
};
