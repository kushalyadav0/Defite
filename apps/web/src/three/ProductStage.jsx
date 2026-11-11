import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, PresentationControls } from '@react-three/drei';
import { ProductMesh } from './ProductShape';

// Large, draggable 3D object for the selected product.
const ProductStage = ({ product, active, calm }) => (
  <Canvas
    dpr={[1, 1.75]}
    camera={{ position: [0, 0, 5.2], fov: 40 }}
    frameloop={active ? 'always' : 'never'}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.7} />
    <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#c7d2fe" />
    <directionalLight position={[3, 5, 4]} intensity={1.8} />
    <pointLight position={[-4, -2, 2]} intensity={25} color={product.accent} />
    <PresentationControls
      global
      snap
      rotation={[0.1, 0.3, 0]}
      polar={[-0.4, 0.4]}
      azimuth={[-0.8, 0.8]}
      config={{ mass: 1, tension: 170 }}
    >
      <Float speed={calm ? 0 : 1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <ProductMesh key={product.slug} slug={product.slug} color={product.accent} scale={1.05} spin={calm ? 0 : 0.35} />
      </Float>
    </PresentationControls>
    <ContactShadows position={[0, -1.8, 0]} opacity={0.45} scale={8} blur={2.6} far={3} color={product.accent} />
  </Canvas>
);

export default ProductStage;
