import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const glowRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.left = `${e.clientX}px`;
            glowRef.current.style.top = `${e.clientY}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
    <div ref={glowRef} className="cursor-glow" />
  );
}
