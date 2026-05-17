import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { 
  Text, 
  Text3D, 
  Float, 
  Sparkles,
  Environment, 
  Center,
  BakeShadows,
  PerspectiveCamera
} from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { 
  Bloom, 
  EffectComposer, 
  ChromaticAberration, 
  Vignette,
  DepthOfField,
  Noise
} from "@react-three/postprocessing";

export default function Intro3DScene() {
  const { camera } = useThree();
  const welcomeRef = useRef();
  const portfolioRef = useRef();
  const groupRef = useRef();
  const lightSweepRef = useRef();
  const ringRef = useRef();
  
  // Custom font for Text3D
  const fontUrl = "https://cdn.jsdelivr.net/npm/three@0.150.0/examples/fonts/helvetiker_bold.typeface.json";

  useEffect(() => {
    const tl = gsap.timeline();

    // Reset initial states
    gsap.set(camera.position, { z: 30, y: 0.5, x: 0 });
    gsap.set(camera.rotation, { x: 0, y: 0, z: 0 });
    
    gsap.set(welcomeRef.current.position, { y: 2.5, z: 2 });
    gsap.set(welcomeRef.current, { fillOpacity: 0 });
    
    gsap.set(portfolioRef.current.position, { z: -5, opacity: 0 });
    gsap.set(portfolioRef.current.rotation, { x: 0.05, y: -0.05 });
    
    gsap.set(lightSweepRef.current.position, { x: -10 });

    // ULTRA FAST 2.2s Cinematic Sequence
    
    // 1. Initial Reveal (0.4s)
    tl.to(welcomeRef.current, { fillOpacity: 1, duration: 0.5, ease: "power2.out" }, 0.1);
    
    // 2. "MyPortfolio" Materializes (1s)
    tl.to(portfolioRef.current.position, { z: 0, duration: 1.0, ease: "power3.out" }, 0.3);
    tl.to(portfolioRef.current.rotation, { x: 0, y: 0, duration: 1.0, ease: "power2.out" }, 0.3);
    
    // 3. Light Sweep (0.8s)
    tl.to(lightSweepRef.current.position, { x: 10, duration: 1.0, ease: "power2.inOut" }, 0.8);
    
    // 4. Fast Dolly
    tl.to(camera.position, { z: 18, duration: 2.2, ease: "power1.inOut" }, 0);
    tl.to(camera.rotation, { x: -0.02, duration: 2.2, ease: "none" }, 0);

  }, [camera]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <>
      <color attach="background" args={["#050505"]} />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3} color="#F5F5F5" castShadow />
      <spotLight position={[-10, 5, -5]} angle={0.2} penumbra={1} intensity={2} color="#E6C089" />
      <pointLight ref={lightSweepRef} position={[0, 0, 2]} intensity={2} color="#FFFFFF" distance={10} />

      <Environment preset="city" />
      <BakeShadows />

      <group ref={groupRef}>
        <Text ref={welcomeRef} fontSize={0.4} letterSpacing={0.8} color="#E6C089" anchorX="center" anchorY="middle">
          WELCOME TO
        </Text>

        <Center top position={[0, -0.5, 0]}>
          <Text3D
            ref={portfolioRef}
            font={fontUrl}
            size={1.6}
            height={0.4}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.06}
            bevelSize={0.04}
            bevelOffset={0}
            bevelSegments={5}
          >
            MyPortfolio
            <meshPhysicalMaterial 
              color="#F5F5F5" 
              metalness={0.9} 
              roughness={0.1} 
              reflectivity={1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive="#E6C089"
              emissiveIntensity={0.05}
            />
          </Text3D>
        </Center>

        <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshPhysicalMaterial color="#050505" roughness={0.8} metalness={0.2} reflectivity={0.5} />
        </mesh>

        <mesh ref={ringRef} position={[0, 0, -10]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[15, 15.1, 64]} />
          <meshBasicMaterial color="#E6C089" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <Sparkles count={150} scale={20} size={1.5} speed={0.4} color="#E6C089" opacity={0.3} />
      <Sparkles count={80} scale={30} size={2.5} speed={0.2} color="#FFFFFF" opacity={0.2} />

      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.0} radius={0.4} />
        <ChromaticAberration offset={[0.001, 0.001]} />
        <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={1.0} />
        <Vignette darkness={1.1} offset={0.1} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  );
}
