"use client";
import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center, Text } from "@react-three/drei";
import { Mesh } from "three";

interface Text3DComponentProps {
  mousePosition: { x: number; y: number };
}

function Text3DInner({ mousePosition }: Text3DComponentProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation based on mouse movement
      const targetRotationX = (mousePosition.y - 0.5) * 0.1;
      const targetRotationY = (mousePosition.x - 0.5) * 0.1;

      // Smooth interpolation
      meshRef.current.rotation.x +=
        (targetRotationX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y +=
        (targetRotationY - meshRef.current.rotation.y) * 0.05;

      // Subtle floating animation
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        size={1.2}
        height={0.15}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        adigoj
        <meshStandardMaterial
          color="#9d8566"
          roughness={0.6}
          metalness={0.2}
          transparent
          opacity={0.8}
        />
      </Text3D>
    </Center>
  );
}

// Fallback component
function FallbackText({ mousePosition }: Text3DComponentProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const targetRotationX = (mousePosition.y - 0.5) * 0.1;
      const targetRotationY = (mousePosition.x - 0.5) * 0.1;

      meshRef.current.rotation.x +=
        (targetRotationX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y +=
        (targetRotationY - meshRef.current.rotation.y) * 0.05;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Text
      ref={meshRef}
      fontSize={2}
      color="#9d8566"
      anchorX="center"
      anchorY="middle"
    >
      adigoj
    </Text>
  );
}

export default function Text3DComponent({
  mousePosition,
}: Text3DComponentProps) {
  return (
    <Suspense fallback={<FallbackText mousePosition={mousePosition} />}>
      <Text3DInner mousePosition={mousePosition} />
    </Suspense>
  );
}
