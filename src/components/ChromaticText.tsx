"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChromaticTextProps {
  mousePosition: { x: number; y: number };
}

export default function ChromaticText({ mousePosition }: ChromaticTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate mouse-based rotation (subtle)
  const rotateX = (mousePosition.y - 0.5) * 5;
  const rotateY = (mousePosition.x - 0.5) * 5;

  // Animation variants for smooth transitions
  const textVariants = {
    normal: {
      scale: 1,
      rotateX: rotateX,
      rotateY: rotateY,
      filter: "blur(0px) contrast(1) saturate(1) brightness(1)",
    },
    hovered: {
      scale: 1.05,
      rotateX: rotateX,
      rotateY: rotateY,
      filter: "blur(0.8px) contrast(1) saturate(1) brightness(1.1)",
    },
  };

  const shadowVariants = {
    normal: {
      opacity: 0,
      scale: 1,
    },
    hovered: {
      opacity: 1,
      scale: 1.05,
    },
  };

  return (
    <div className="flex items-center justify-center h-screen relative pointer-events-none">
      <div className="relative">
        {/* Chromatic aberration layers */}
        <AnimatePresence>
          {isHovered && (
            <>
              {/* Red shadow */}
              <motion.h1
                className="text-8xl md:text-9xl font-poppins font-bold cursor-pointer select-none absolute inset-0 pointer-events-none"
                style={{
                  color: "rgba(255, 0, 0, 0.7)",
                  transform: "translate(4px, 0px)",
                }}
                variants={shadowVariants}
                initial="normal"
                animate="hovered"
                exit="normal"
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                adigoj
              </motion.h1>

              {/* Cyan shadow */}
              <motion.h1
                className="text-8xl md:text-9xl font-poppins font-bold cursor-pointer select-none absolute inset-0 pointer-events-none"
                style={{
                  color: "rgba(0, 255, 255, 0.7)",
                  transform: "translate(-4px, 0px)",
                }}
                variants={shadowVariants}
                initial="normal"
                animate="hovered"
                exit="normal"
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              >
                adigoj
              </motion.h1>

              {/* Yellow shadow */}
              <motion.h1
                className="text-8xl md:text-9xl font-poppins font-bold cursor-pointer select-none absolute inset-0 pointer-events-none"
                style={{
                  color: "rgba(255, 255, 0, 0.5)",
                  transform: "translate(0px, 4px)",
                }}
                variants={shadowVariants}
                initial="normal"
                animate="hovered"
                exit="normal"
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                adigoj
              </motion.h1>

              {/* Purple shadow */}
              <motion.h1
                className="text-8xl md:text-9xl font-poppins font-bold cursor-pointer select-none absolute inset-0 pointer-events-none"
                style={{
                  color: "rgba(128, 0, 255, 0.5)",
                  transform: "translate(0px, -4px)",
                }}
                variants={shadowVariants}
                initial="normal"
                animate="hovered"
                exit="normal"
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
              >
                adigoj
              </motion.h1>
            </>
          )}
        </AnimatePresence>

        {/* Main text */}
        <motion.h1
          className="text-8xl md:text-9xl font-poppins font-bold cursor-pointer select-none pointer-events-auto relative z-10"
          style={{
            color: "#9d8566",
          }}
          variants={textVariants}
          initial="normal"
          animate={isHovered ? "hovered" : "normal"}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            scale: { duration: 0.5, ease: "easeInOut" },
          }}
          onMouseEnter={(e) => {
            console.log("✅ HOVER ENTERED - Event target:", e.target);
            setIsHovered(true);
          }}
          onMouseLeave={(e) => {
            console.log("❌ HOVER LEFT - Event target:", e.target);
            setIsHovered(false);
          }}
          onMouseOver={(e) => {
            console.log("🟡 MOUSE OVER - Event target:", e.target);
          }}
          onClick={(e) => {
            console.log(
              "🔴 CLICKED - This means the text is clickable!",
              e.target,
            );
          }}
        >
          adigoj
        </motion.h1>
      </div>
    </div>
  );
}
