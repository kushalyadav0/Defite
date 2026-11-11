import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, RoundedBox } from '@react-three/drei';

// One shape per product so each has its own identity in 3D.
const GEOMETRY = {
  verso: <torusGeometry args={[1, 0.38, 48, 128]} />,
  nivao: <sphereGeometry args={[1.15, 96, 96]} />,
  rivao: <torusKnotGeometry args={[0.8, 0.26, 200, 32, 2, 3]} />,
  teraa: <octahedronGeometry args={[1.3, 0]} />,
  leadgen: <icosahedronGeometry args={[1.2, 1]} />,
};

export const ProductMesh = ({ slug, color, scale = 1, spin = 0.4, distort = 0.25 }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    // The torus spins around its own hole so it never turns edge-on.
    ref.current.rotation[slug === 'verso' ? 'z' : 'y'] += delta * spin;
  });

  if (slug === 'arvok') {
    return (
      <RoundedBox ref={ref} args={[1.25, 2.1, 0.22]} radius={0.12} smoothness={6} scale={scale}>
        <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.2} clearcoat={1} />
      </RoundedBox>
    );
  }

  const geometry = GEOMETRY[slug] || GEOMETRY.leadgen;
  const flat = slug === 'teraa' || slug === 'leadgen';

  return (
    <mesh ref={ref} scale={scale} rotation={[0.55, 0, 0.15]}>
      {geometry}
      {flat ? (
        <meshPhysicalMaterial color={color} metalness={0.4} roughness={0.15} clearcoat={1} flatShading />
      ) : (
        <MeshDistortMaterial color={color} distort={distort} speed={1.6} metalness={0.35} roughness={0.15} />
      )}
    </mesh>
  );
};
