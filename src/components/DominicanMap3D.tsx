import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DOMINICAN_WORKS } from '../data/guideData';
import { InfrastructureWork } from '../types/guide';
import { Compass, RotateCw, ZoomIn, ZoomOut, Eye, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export const DominicanMap3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedWork, setSelectedWork] = useState<InfrastructureWork>(DOMINICAN_WORKS[0]);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const controlsRef = useRef<{
    resetCamera: () => void;
    focusPoint: (coord: { x: number; y: number; z: number }) => void;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1128); // Deep oceanic midnight blue

    // Fog for depth
    scene.fog = new THREE.FogExp2(0x0a1128, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 7.5, 9);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(6, 12, 6);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Blue and Red Dominican rim lights
    const blueRim = new THREE.PointLight(0x002d62, 4, 25);
    blueRim.position.set(-8, 3, -4);
    scene.add(blueRim);

    const redRim = new THREE.PointLight(0xce1126, 4, 25);
    redRim.position.set(8, 3, -4);
    scene.add(redRim);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x1e3a8a, 0x172554);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Root Group for the Dominican Map Island
    const mapGroup = new THREE.Group();
    scene.add(mapGroup);

    // Construct Stylized 3D Topographic Mesh of Dominican Republic
    // Dominican Republic geography shape vertices (custom poly representing Hispaniola eastern 2/3)
    const shape = new THREE.Shape();
    // Starting near Montecristi / Dajabón (Northwest border)
    shape.moveTo(-3.2, 0.4);
    shape.lineTo(-2.2, 1.3); // Luperón / Puerto Plata
    shape.lineTo(-0.8, 1.4); // Cabrera / Río San Juan
    shape.lineTo(0.6, 1.2);  // Nagua
    shape.lineTo(1.8, 1.5);  // Península de Samaná tip (Las Galeras)
    shape.lineTo(1.6, 0.9);  // Bahía de Samaná
    shape.lineTo(2.4, 0.6);  // Miches / Sabana de la Mar
    shape.lineTo(3.4, 0.2);  // Punta Cana / Cabo Engaño
    shape.lineTo(2.8, -0.9); // La Romana / San Pedro
    shape.lineTo(1.2, -0.9); // Santo Domingo coast
    shape.lineTo(0.0, -1.2); // Baní / Punta Salinas
    shape.lineTo(-1.2, -1.8); // Barahona / Pedernales / Bahía de las Águilas
    shape.lineTo(-2.4, -0.9); // Lago Enriquillo / Jimaní border
    shape.lineTo(-2.8, -0.1); // Elías Piña / San Juan border
    shape.closePath();

    const extrudeSettings = {
      depth: 0.6,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    geometry.rotateX(-Math.PI / 2);

    // Gradient-like Dominican Blue with Gold edge material
    const material = new THREE.MeshStandardMaterial({
      color: 0x0f3460,
      metalness: 0.35,
      roughness: 0.45,
    });
    const islandMesh = new THREE.Mesh(geometry, material);
    islandMesh.receiveShadow = true;
    islandMesh.castShadow = true;
    mapGroup.add(islandMesh);

    // Top border outline in gold/cyan
    const wireframeGeom = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 });
    const wireframe = new THREE.LineSegments(wireframeGeom, wireframeMat);
    islandMesh.add(wireframe);

    // Add 3D Mountain Cordilleras (Pico Duarte / Cordillera Central)
    const cordilleraGroup = new THREE.Group();
    const mountainGeom = new THREE.ConeGeometry(0.35, 0.7, 5);
    const mountainMat = new THREE.MeshStandardMaterial({ color: 0x164e63, roughness: 0.7 });
    const m1 = new THREE.Mesh(mountainGeom, mountainMat);
    m1.position.set(-0.8, 0.4, -0.2);
    cordilleraGroup.add(m1);
    const m2 = new THREE.Mesh(mountainGeom, mountainMat);
    m2.position.set(-0.2, 0.45, -0.1);
    cordilleraGroup.add(m2);
    const m3 = new THREE.Mesh(mountainGeom, mountainMat);
    m3.position.set(0.4, 0.35, 0.1);
    cordilleraGroup.add(m3);
    mapGroup.add(cordilleraGroup);

    // Add Interactive 3D Work Beacons & Pins
    const pinMeshes: { mesh: THREE.Group; work: InfrastructureWork }[] = [];

    // Scale positions to fit mapGroup
    const coordMap: Record<string, [number, number, number]> = {
      acueducto: [0.8, 0.4, 0.7],     // Santo Domingo
      carreteras: [0.0, 0.4, 0.0],     // Cruce Autopista Duarte
      puertos: [1.8, 0.4, -0.2],       // Bahía / Puertos
      riego: [-1.4, 0.4, -0.4],        // Valle del Cibao / San Juan
      escuelas: [-0.6, 0.4, 0.4],      // Escuelas
    };

    DOMINICAN_WORKS.forEach((work) => {
      const pinGroup = new THREE.Group();
      const [px, py, pz] = coordMap[work.id] || [0, 0.4, 0];
      pinGroup.position.set(px, py, pz);

      // Pin pole
      const poleGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8 });
      const pole = new THREE.Mesh(poleGeom, poleMat);
      pole.position.y = 0.35;
      pinGroup.add(pole);

      // Pin Head Sphere
      const sphereGeom = new THREE.SphereGeometry(0.16, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: work.id === 'acueducto' ? 0x0284c7 : work.id === 'puertos' ? 0xce1126 : 0xf59e0b,
        emissive: work.id === 'acueducto' ? 0x0284c7 : work.id === 'puertos' ? 0xce1126 : 0xf59e0b,
        emissiveIntensity: 0.5,
      });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      sphere.position.y = 0.75;
      pinGroup.add(sphere);

      // Pulsing Ring at base
      const ringGeom = new THREE.RingGeometry(0.1, 0.25, 16);
      ringGeom.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.y = 0.02;
      pinGroup.add(ring);

      mapGroup.add(pinGroup);
      pinMeshes.push({ mesh: pinGroup, work });
    });

    // Interaction Variables
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      rotationVelocityY = deltaX * 0.005;
      rotationVelocityX = deltaY * 0.005;

      mapGroup.rotation.y += rotationVelocityY;
      mapGroup.rotation.x = Math.max(-0.4, Math.min(0.6, mapGroup.rotation.x + rotationVelocityX));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Wheel zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(5, Math.min(14, camera.position.z + e.deltaY * 0.005));
    };
    canvasEl.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile
    let prevTouchX = 0;
    let prevTouchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevTouchX;
      const deltaY = e.touches[0].clientY - prevTouchY;
      prevTouchX = e.touches[0].clientX;
      prevTouchY = e.touches[0].clientY;

      mapGroup.rotation.y += deltaX * 0.005;
      mapGroup.rotation.x = Math.max(-0.4, Math.min(0.6, mapGroup.rotation.x + deltaY * 0.005));
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    canvasEl.addEventListener('touchstart', onTouchStart, { passive: true });
    canvasEl.addEventListener('touchmove', onTouchMove, { passive: true });
    canvasEl.addEventListener('touchend', onTouchEnd);

    // Controls exposure
    controlsRef.current = {
      resetCamera: () => {
        camera.position.set(0, 7.5, 9);
        camera.lookAt(0, 0, 0);
        mapGroup.rotation.set(0, 0, 0);
      },
      focusPoint: (coords) => {
        // Subtle tilt towards point
        mapGroup.rotation.y = -coords.x * 0.5;
        mapGroup.rotation.x = 0.2;
      },
    };

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (autoRotate && !isDragging) {
        mapGroup.rotation.y += 0.004;
      }

      // Animate pin pulsing
      pinMeshes.forEach(({ mesh }, index) => {
        const ring = mesh.children[2];
        if (ring) {
          const scale = 1 + Math.sin(elapsed * 4 + index) * 0.35;
          ring.scale.set(scale, scale, scale);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasEl.removeEventListener('wheel', onWheel);
      canvasEl.removeEventListener('touchstart', onTouchStart);
      canvasEl.removeEventListener('touchmove', onTouchMove);
      canvasEl.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate]);

  const selectWork = (work: InfrastructureWork) => {
    setSelectedWork(work);
    soundEngine.playClick();
    if (controlsRef.current) {
      controlsRef.current.focusPoint(work.coordinates);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl text-white">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Modelo Digital 3D · Territorio Nacional
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Mapa 3D: Obras Públicas de Horacio Vásquez (1924–1930)
          </h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAutoRotate(!autoRotate);
              soundEngine.playClick();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              autoRotate
                ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            {autoRotate ? 'Rotación Activa' : 'Pausada'}
          </button>
          <button
            onClick={() => {
              controlsRef.current?.resetCamera();
              soundEngine.playClick();
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            Centrar
          </button>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-950 cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Drag Hint Overlay */}
        <div className="absolute top-3 left-4 pointer-events-none text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded backdrop-blur border border-slate-800">
          Arrastra para girar 3D · Scroll para zoom
        </div>

        {/* Selected Work Detail Float */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-sky-400 mb-1 font-semibold uppercase tracking-wider">
            <span>{selectedWork.location}</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Caso Estudiado
            </span>
          </div>
          <h4 className="text-base font-bold text-white">{selectedWork.name}</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedWork.description}</p>
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-xs text-amber-300">
            <strong>Impacto económico:</strong> {selectedWork.impact}
          </div>
        </div>
      </div>

      {/* Work Selector Pills */}
      <div className="p-4 bg-slate-950/90 border-t border-slate-800">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Selecciona una obra para enfocar en el mapa 3D:
        </div>
        <div className="flex flex-wrap gap-2">
          {DOMINICAN_WORKS.map((work) => {
            const isActive = selectedWork.id === work.id;
            return (
              <button
                key={work.id}
                onClick={() => selectWork(work)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <Eye className="w-3 h-3" />
                {work.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
