import React, { useRef, useEffect } from 'react';
import * as THREE_LIB from 'three';

const ContactBackground = () => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    let isMounted = true;
    let frameId = null;

    // --- SCENE SETUP ---
    const scene = new THREE_LIB.Scene();
    scene.background = new THREE_LIB.Color(0x0B0B0C);
    const camera = new THREE_LIB.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 800;

    const renderer = new THREE_LIB.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance",
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- 3D PARTICLE SYSTEM ---
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5
      });
    }

    const particleGeometry = new THREE_LIB.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE_LIB.BufferAttribute(positions, 3));

    const particleMaterial = new THREE_LIB.PointsMaterial({
      color: 0xD4A373,
      size: 2,
      transparent: true,
      opacity: 0.6,
      blending: THREE_LIB.AdditiveBlending
    });

    const particleSystem = new THREE_LIB.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- 3D GROUND PLANE ---
    const planeGeometry = new THREE_LIB.PlaneGeometry(3000, 3000, 30, 30);
    const planeMaterial = new THREE_LIB.MeshBasicMaterial({
      color: 0xA1A1AA,
      wireframe: true,
      transparent: true,
      opacity: 0.03,
      side: THREE_LIB.DoubleSide
    });
    const groundPlane = new THREE_LIB.Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = Math.PI / 2.5;
    groundPlane.position.y = -600;
    scene.add(groundPlane);

    // --- LIGHTING ---
    const ambientLight = new THREE_LIB.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const goldLight = new THREE_LIB.PointLight(0xD4A373, 1.2, 1500);
    goldLight.position.set(-500, 500, 200);
    scene.add(goldLight);

    // --- DYNAMIC CONNECTIONS ---
    const maxLines = 600;
    const lineGeometry = new THREE_LIB.BufferGeometry();
    const linePositions = new Float32Array(maxLines * 6);
    lineGeometry.setAttribute('position', new THREE_LIB.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE_LIB.LineBasicMaterial({
      color: 0xD4A373,
      transparent: true,
      opacity: 0.1,
      blending: THREE_LIB.AdditiveBlending
    });
    const lines = new THREE_LIB.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // --- INTERACTION ---
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!isMounted) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    const animate = () => {
      if (!isMounted) return;
      
      const positionAttr = particleSystem.geometry.attributes.position;
      let lineIdx = 0;

      for (let i = 0; i < particleCount; i++) {
        positionAttr.array[i * 3] += velocities[i].x;
        positionAttr.array[i * 3 + 1] += velocities[i].y;
        positionAttr.array[i * 3 + 2] += velocities[i].z;

        if (Math.abs(positionAttr.array[i * 3]) > 1000) velocities[i].x *= -1;
        if (Math.abs(positionAttr.array[i * 3 + 1]) > 1000) velocities[i].y *= -1;
        if (Math.abs(positionAttr.array[i * 3 + 2]) > 1000) velocities[i].z *= -1;
      }
      positionAttr.needsUpdate = true;

      camera.position.x += (mouse.current.x * 150 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.current.y * 150 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      groundPlane.rotation.z += 0.0003;

      lineIdx = 0;
      for (let i = 0; i < particleCount; i += 15) {
        for (let j = i + 1; j < i + 10 && j < particleCount; j++) {
          if (lineIdx >= maxLines * 6) break;
          const xd = positionAttr.array[i * 3] - positionAttr.array[j * 3];
          const yd = positionAttr.array[i * 3 + 1] - positionAttr.array[j * 3 + 1];
          const zd = positionAttr.array[i * 3 + 2] - positionAttr.array[j * 3 + 2];
          const dist = xd*xd + yd*yd + zd*zd;
          if (dist < 90000) { // 300^2
            linePositions[lineIdx++] = positionAttr.array[i * 3];
            linePositions[lineIdx++] = positionAttr.array[i * 3 + 1];
            linePositions[lineIdx++] = positionAttr.array[i * 3 + 2];
            linePositions[lineIdx++] = positionAttr.array[j * 3];
            linePositions[lineIdx++] = positionAttr.array[j * 3 + 1];
            linePositions[lineIdx++] = positionAttr.array[j * 3 + 2];
          }
        }
      }
      lines.geometry.attributes.position.needsUpdate = true;
      lines.geometry.setDrawRange(0, lineIdx / 3);

      try {
        renderer.render(scene, camera);
      } catch (err) {
        console.error("Three.js render error:", err);
        isMounted = false;
      }
      frameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      isMounted = false;
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      renderer.domElement?.remove();
      
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] opacity-80" />
    </div>
  );
};

export default ContactBackground;
