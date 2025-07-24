"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Plane } from "@react-three/drei";
import { Suspense } from "react";

interface Scene3DProps {
  children: React.ReactNode;
}

export default function Scene3D({ children }: Scene3DProps) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <Suspense fallback={null}>
        {/* Sunset environment */}
        <Environment preset="sunset" />

        {/* Ambient and directional lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />

        {/* Background plane */}
        <Plane args={[50, 50]} position={[0, 0, -10]} rotation={[0, 0, 0]}>
          <meshBasicMaterial color="#2a2a2a" transparent opacity={0.3} />
        </Plane>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
        />
        {children}
      </Suspense>
    </Canvas>
  );
}
