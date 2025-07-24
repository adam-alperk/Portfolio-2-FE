"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, BufferGeometry, Vector3 } from "three";
import * as THREE from "three";

export default function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null);
  const geometryRef = useRef<BufferGeometry>(null);

  // Create sphere geometry with higher detail for smooth wave animation
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(12, 256, 256);
  }, []);

  // Store original positions for wave calculation
  const originalPositions = useMemo(() => {
    const positions = geometry.attributes.position.array;
    return new Float32Array(positions);
  }, [geometry]);

  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      const time = state.clock.elapsedTime;
      const positions = geometryRef.current.attributes.position
        .array as Float32Array;

      // Create multiple wave frequencies for audio-like effect
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];

        // Calculate distance from origin for radial waves
        const distance = Math.sqrt(x * x + y * y + z * z);

        // Create multiple wave frequencies with smaller amplitudes and more detail
        const wave1 = Math.sin(distance * 30 + time * 3) * 0.004;
        const wave2 = Math.sin(distance * 60 + time * 2.5) * 0.0025;
        const wave3 = Math.sin(distance * 120 + time * 4) * 0.0015;
        const wave4 = Math.sin(distance * 180 + time * 3.5) * 0.001;
        const wave5 = Math.sin(distance * 240 + time * 5) * 0.0008;

        // Add angular variations for more complex surface displacement
        const angle1 = Math.atan2(y, x);
        // const angle2 = Math.atan2(z, x);
        const angularWave1 = Math.sin(angle1 * 8 + time * 2) * 0.02;
        // const angularWave2 = Math.sin(angle2 * 12 + time * 1.8) * 0.015;
        // const angularWave3 =
        // Math.sin(angle1 * 16 + angle2 * 10 + time * 2.2) * 0.012;

        // Combine all waves for complex surface displacement
        const displacement =
          wave1 + wave2 + wave3 + wave4 + wave5 + angularWave1;

        // Apply displacement along the normal (radial direction for sphere)
        const normal = new Vector3(x, y, z).normalize();
        positions[i] = originalPositions[i] + normal.x * displacement;
        positions[i + 1] = originalPositions[i + 1] + normal.y * displacement;
        positions[i + 2] = originalPositions[i + 2] + normal.z * displacement;
      }

      // Update the geometry
      geometryRef.current.attributes.position.needsUpdate = true;
      geometryRef.current.computeVertexNormals();

      // Slow rotation for additional movement
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = time * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -4, -14]}>
      <bufferGeometry ref={geometryRef} {...geometry} />
      <meshStandardMaterial
        color="#4a5568"
        wireframe={false}
        transparent
        opacity={0.6}
        roughness={0.8}
        metalness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
