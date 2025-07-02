import React, { useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { Book } from "lucide-react";


export default function MagnetButton({
  particleCount = 12,
  ...props
}) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    // Initialize particles with random positions around button (range -60 to 60 px)
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }));
  }, [particlesControl, particles]);

  return (
    <button
      type="button"
      className={`btn btn-outline-primary position-relative d-inline-flex align-items-center justify-content-center`}
      style={{
        minWidth: "150px",
        height: "45px",
        overflow: "visible",
        borderRadius: "8px",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: "transparent",  
        color: "#7f3efe",
        border: "1px solid #c4b4ff",
        fontWeight: "bold"
      }}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {/* Particles */}
      {particles.map((_, i) => (
        <motion.span
          key={i}
          custom={i}
          initial={{ x: particles[i].x, y: particles[i].y }}
          animate={particlesControl}
          style={{
            position: "absolute",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: isAttracting ? "#0d6efd" : "#6c757d",
            opacity: isAttracting ? 1 : 0.5,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Button content with icon and text */}
      <motion.span
        style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        animate={{ scale: isAttracting ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
<Book size={18} color={isAttracting ? "#7f3efe" : "#662fd4"} />
        {isAttracting ? "View Notes" : "View Notes"}
      </motion.span>
    </button>
  );
}
