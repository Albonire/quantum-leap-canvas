import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const Model = ({ mtlUrl, objUrl, position, scale = [0.1, 0.1, 0.1] }: { mtlUrl: string, objUrl: string, position: [number, number, number], scale?: [number, number, number] }) => {
  const materials = useLoader(MTLLoader, mtlUrl);
  const obj = useLoader(OBJLoader, objUrl, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return <primitive object={obj} position={position} scale={scale} />;
};

const Scene = ({ opacity }: { opacity: number }) => {
  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, opacity }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <Model mtlUrl="/models/tabel.mtl" objUrl="/models/tabel.obj" position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
        <Model mtlUrl="/models/chair.mtl" objUrl="/models/chair.obj" position={[0, 0, 2]} scale={[0.1, 0.1, 0.1]} />
        <Model mtlUrl="/models/pc.mtl" objUrl="/models/pc.obj" position={[0, 1, 0]} scale={[0.1, 0.1, 0.1]} />
        <Model mtlUrl="/models/bookshelf.mtl" objUrl="/models/bookshelf.obj" position={[-3, 0, 0]} scale={[0.1, 0.1, 0.1]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;