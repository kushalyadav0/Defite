import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Line, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { ProductMesh } from './ProductShape';
import { selectProduct } from './selectProduct';

// Central "Defite core" with the products orbiting it. Click a product to jump to its details.
const Core = ({ calm }) => (
  <Float speed={calm ? 0 : 1.4} rotationIntensity={0.4} floatIntensity={0.6}>
    <mesh>
      <icosahedronGeometry args={[1.35, 8]} />
      <MeshDistortMaterial
        color="#6366f1"
        emissive="#312e81"
        emissiveIntensity={0.4}
        distort={calm ? 0.15 : 0.38}
        speed={calm ? 0 : 1.8}
        metalness={0.5}
        roughness={0.1}
      />
    </mesh>
    <mesh scale={1.85}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.18} />
    </mesh>
  </Float>
);

const Orbit = ({ radius, tilt }) => {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2)
        .getPoints(128)
        .map((p) => [p.x, 0, p.y]),
    [radius]
  );
  return (
    <group rotation={tilt}>
      <Line points={points} color="#818cf8" lineWidth={1} transparent opacity={0.25} />
    </group>
  );
};

const ORBITS = [
  { radius: 3, tilt: [0.35, 0, -0.2] },
  { radius: 3.6, tilt: [0.1, 0, 0.2] },
];

const Satellite = ({ product, index, total, calm, showLabels }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const radius = ORBITS[index % 2].radius;
  const tilt = index % 2 ? ORBITS[1].tilt : ORBITS[0].tilt;
  const perOrbit = Math.ceil(total / 2);
  const offset = (Math.floor(index / 2) / perOrbit) * Math.PI * 2 + (index % 2) * 0.6;
  const speed = 0.14 + (index % 3) * 0.03;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = calm ? offset : offset + clock.getElapsedTime() * speed;
    ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
    const target = hovered ? 1.35 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
  });

  return (
    <group rotation={tilt}>
      <group
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectProduct(product.slug);
        }}
      >
        <ProductMesh slug={product.slug} color={product.accent} scale={0.32} spin={calm ? 0 : 0.6} distort={0.2} />
        {(showLabels || hovered) && (
          <Html center distanceFactor={7} position={[0, 0.75, 0]} style={{ pointerEvents: 'none' }}>
            <span
              className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur"
              style={{ background: `${product.accent}cc` }}
            >
              {product.name}
            </span>
          </Html>
        )}
      </group>
    </group>
  );
};

// Gently turns the whole scene toward the pointer.
const Rig = ({ children, calm }) => {
  const ref = useRef();
  useFrame(({ pointer }, delta) => {
    if (!ref.current || calm) return;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * 0.35, 3, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -pointer.y * 0.2, 3, delta);
  });
  return <group ref={ref}>{children}</group>;
};

const HeroScene = ({ products, active, calm, showLabels }) => (
  <Canvas
    dpr={[1, 1.75]}
    camera={{ position: [0, 1.4, 10.5], fov: 45 }}
    frameloop={active ? 'always' : 'never'}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 6, 4]} intensity={1.6} />
    <pointLight position={[-6, -3, -4]} intensity={40} color="#ec4899" />
    <pointLight position={[6, 2, 3]} intensity={30} color="#3b82f6" />
    <Rig calm={calm}>
      <Core calm={calm} />
      {ORBITS.map((o) => (
        <Orbit key={o.radius} radius={o.radius} tilt={o.tilt} />
      ))}
      {products.map((product, i) => (
        <Satellite
          key={product.slug}
          product={product}
          index={i}
          total={products.length}
          calm={calm}
          showLabels={showLabels}
        />
      ))}
    </Rig>
    {!calm && <Sparkles count={80} scale={[14, 8, 8]} size={2.2} speed={0.3} color="#c4b5fd" />}
  </Canvas>
);

export default HeroScene;
