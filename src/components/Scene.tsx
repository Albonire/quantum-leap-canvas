
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const Model = ({ mtlUrl, objUrl, position, scale = [1, 1, 1] }: { mtlUrl: string, objUrl: string, position: [number, number, number], scale?: [number, number, number] }) => {
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
    // Return a placeholder box if model fails to load
    return (
      <mesh position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  }
};

const Scene = ({ opacity }: { opacity: number }) => {
  return (
    <Canvas 
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, opacity }}
      camera={{ position: [10, 10, 10], fov: 50 }}
      gl={{ antialias: true }}
    >
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
      <hemisphereLight args={[0xffffff, 0x444444, 0.6]} />
      
      <Suspense fallback={
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      }>
        {/* Table - center piece with larger scale */}
        <Model 
          mtlUrl="/models/tabel.mtl" 
          objUrl="/models/tabel.obj" 
          position={[0, -2, 0]} 
          scale={[0.5, 0.5, 0.5]} 
        />
        
        {/* Chair - positioned near the table */}
        <Model 
          mtlUrl="/models/chair.mtl" 
          objUrl="/models/chair.obj" 
          position={[3, -2, 1]} 
          scale={[0.5, 0.5, 0.5]} 
        />
        
        {/* PC - on the table */}
        <Model 
          mtlUrl="/models/pc.mtl" 
          objUrl="/models/pc.obj" 
          position={[-1, 0, 0]} 
          scale={[0.3, 0.3, 0.3]} 
        />
        
        {/* Bookshelf - against the wall */}
        <Model 
          mtlUrl="/models/bookshelf.mtl" 
          objUrl="/models/bookshelf.obj" 
          position={[-6, -2, -2]} 
          scale={[0.5, 0.5, 0.5]} 
        />

        {/* Add a floor plane for reference */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f0f0f0" transparent opacity={0.3} />
        </mesh>
      </Suspense>
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={20}
        minDistance={3}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
};

export default Scene;
