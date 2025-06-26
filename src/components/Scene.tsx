
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'three';

const Model = ({ mtlUrl, objUrl, position, scale = [0.1, 0.1, 0.1] }: { mtlUrl: string, objUrl: string, position: [number, number, number], scale?: [number, number, number] }) => {
  try {
    const materials = useLoader(MTLLoader, mtlUrl);
    const obj = useLoader(OBJLoader, objUrl, (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });

    // Clone the object to avoid sharing between instances
    const clonedObj = obj.clone();
    
    return <primitive object={clonedObj} position={position} scale={scale} />;
  } catch (error) {
    console.error('Error loading model:', error);
    return null;
  }
};

const Scene = ({ opacity }: { opacity: number }) => {
  return (
    <Canvas 
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, opacity }}
      camera={{ position: [5, 5, 5], fov: 75 }}
      gl={{ antialias: true }}
    >
      {/* Improved lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} />
      
      <Suspense fallback={null}>
        {/* Table - center piece */}
        <Model 
          mtlUrl="/models/tabel.mtl" 
          objUrl="/models/tabel.obj" 
          position={[0, -1, 0]} 
          scale={[0.2, 0.2, 0.2]} 
        />
        
        {/* Chair - positioned near the table */}
        <Model 
          mtlUrl="/models/chair.mtl" 
          objUrl="/models/chair.obj" 
          position={[1.5, -1, 0.5]} 
          scale={[0.2, 0.2, 0.2]} 
        />
        
        {/* PC - on the table */}
        <Model 
          mtlUrl="/models/pc.mtl" 
          objUrl="/models/pc.obj" 
          position={[-0.5, -0.2, 0]} 
          scale={[0.15, 0.15, 0.15]} 
        />
        
        {/* Bookshelf - against the wall */}
        <Model 
          mtlUrl="/models/bookshelf.mtl" 
          objUrl="/models/bookshelf.obj" 
          position={[-3, -1, -1]} 
          scale={[0.2, 0.2, 0.2]} 
        />
      </Suspense>
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={15}
        minDistance={2}
      />
    </Canvas>
  );
};

export default Scene;
