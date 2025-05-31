// src/components/Scene.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from '../primitives/Box';
import { Pyramid } from '../primitives/Pyramid';
import { Primitive } from '../types/primitives';
import { SCENE_CONSTANTS } from '../constants/scene';

interface SceneProps {
  primitives: Primitive[];
  selectedPrimitiveId: string | null;
  selectPrimitive: (id: string) => void;
}

const Scene: React.FC<SceneProps> = ({ primitives, selectedPrimitiveId, selectPrimitive }) => {
  const renderPrimitive = (primitive: Primitive) => {
    const commonProps = {
      key: primitive.id,
      position: primitive.position,
      color: primitive.color,
      colors: primitive.colors,
      scale: primitive.size,
      selected: primitive.id === selectedPrimitiveId,
      useRandomColors: primitive.useRandomColors,
      onClick: () => selectPrimitive(primitive.id),
    };

    switch (primitive.type) {
      case 'box':
        return <Box {...commonProps} />;
      case 'pyramid':
        return <Pyramid {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <Canvas
      camera={{
        position: SCENE_CONSTANTS.CAMERA.POSITION,
        fov: SCENE_CONSTANTS.CAMERA.FOV,
        near: SCENE_CONSTANTS.CAMERA.NEAR,
        far: SCENE_CONSTANTS.CAMERA.FAR,
      }}
    >
      <OrbitControls 
        enableDamping={SCENE_CONSTANTS.CAMERA.CONTROLS.DAMPING}
        dampingFactor={SCENE_CONSTANTS.CAMERA.CONTROLS.DAMPING_FACTOR}
        rotateSpeed={SCENE_CONSTANTS.CAMERA.CONTROLS.ROTATE_SPEED}
        minDistance={SCENE_CONSTANTS.CAMERA.CONTROLS.MIN_DISTANCE}
        maxDistance={SCENE_CONSTANTS.CAMERA.CONTROLS.MAX_DISTANCE}
      />
      <ambientLight intensity={SCENE_CONSTANTS.LIGHTING.AMBIENT.INTENSITY} />
      <directionalLight 
        position={SCENE_CONSTANTS.LIGHTING.DIRECTIONAL.POSITION} 
        intensity={SCENE_CONSTANTS.LIGHTING.DIRECTIONAL.INTENSITY} 
      />
      <gridHelper 
        args={[
          SCENE_CONSTANTS.GRID.SIZE, 
          SCENE_CONSTANTS.GRID.DIVISIONS, 
          SCENE_CONSTANTS.GRID.COLOR, 
          SCENE_CONSTANTS.GRID.COLOR
        ]} 
      />
      <axesHelper args={[SCENE_CONSTANTS.AXES.SIZE]} />
      {primitives.map(renderPrimitive)}
    </Canvas>
  );
};

export default Scene;
