import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

const EliteContactBackground = ({ isTyping = false, isNearForm = false, focusPos = { x: 0.5, y: 0.5 }, focusIntensity = 0 }) => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Shader Material (Liquid Metal / Aurora) ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uFocus;
      uniform float uFocusIntensity;
      uniform float uNearForm;
      varying vec2 vUv;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        float n = snoise(uv * 2.0 + uTime * 0.05);
        
        // Base Deep Graphite (Neutral)
        vec3 color = vec3(0.03, 0.03, 0.035); 
        
        // Ultra-Subtle Ambient Drift (Low Opacity)
        float drift = snoise(uv * 1.5 - uTime * 0.03) * 0.5 + 0.5;
        vec3 accent = vec3(0.784, 0.663, 0.494); // #C8A97E (Soft Gold)
        
        // Combine for a non-glow ambient shift
        color = mix(color, color * 1.2, drift * 0.1);
        color = mix(color, accent, drift * 0.02); // 2% gold accent max
        
        // Soft Vignette for depth, no hard edges
        float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5));
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uFocus: { value: new THREE.Vector2(0.5, 0.5) },
      uFocusIntensity: { value: 0 },
      uNearForm: { value: 0 }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- Minimalist Particle System ---
    const particlesCount = 20;
    const positions = new Float32Array(particlesCount * 3);
    const opacities = new Float32Array(particlesCount);
    const speeds = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
        positions[i * 3 + 2] = 0;
        opacities[i] = Math.random();
        speeds[i] = Math.random() * 0.001 + 0.0005;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xC8A97E,
        size: 0.005,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // --- Interaction Logic ---
    const handleMouseMove = (e) => {
      targetMouse.current.x = e.clientX / window.innerWidth;
      targetMouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);

    // --- Animation Loop ---
    let frameId;
    const animate = (time) => {
      uniforms.uTime.value = time * 0.001;
      
      // Smooth movement with inertia
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.05;
      uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);

      // React to Props
      uniforms.uFocusIntensity.value += (focusIntensity - uniforms.uFocusIntensity.value) * 0.1;
      uniforms.uFocus.value.set(focusPos.x, 1.0 - focusPos.y);
      uniforms.uNearForm.value += ((isNearForm ? 1 : 0) - uniforms.uNearForm.value) * 0.05;

      // Animate Particles
      const positionsArr = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        positionsArr[i * 3 + 1] += speeds[i];
        if (positionsArr[i * 3 + 1] > 1) positionsArr[i * 3 + 1] = -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [focusIntensity, focusPos, isNearForm]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none select-none bg-[#0B0B0C]"
      style={{ willChange: 'transform' }}
    />
  );
};

export default EliteContactBackground;
