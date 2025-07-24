"use client";
import { useState, useCallback } from "react";
import Scene3D from "./Scene3D";
import Text3DComponent from "./Text3D";

export default function InteractiveScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  }, []);

  return (
    <div onMouseMove={handleMouseMove} className="w-full h-full">
      <Scene3D>
        <Text3DComponent mousePosition={mousePosition} />
      </Scene3D>
    </div>
  );
}
