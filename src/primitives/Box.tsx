// src/Box.tsx
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import { useRef, useState, useEffect, useMemo } from 'react';
import { ReactNode } from 'react';

interface BoxProps extends React.ComponentProps<'mesh'> {
  color?: THREE.ColorRepresentation;
  colors?: string[];
  selected?: boolean;
  children?: ReactNode;
  position: [number, number, number];
  scale: [number, number, number];
  useRandomColors?: boolean;
  onClick?: () => void;
}

export const Box: React.FC<BoxProps> = (props) => {
  const { color, colors, selected, position, scale, useRandomColors, onClick, ...meshProps } = props;
  const ref = useRef<THREE.Mesh>(null);
  const [pulseScale, setPulseScale] = useState(scale);
  const pulseSpeed = 10;
  const pulseIntensity = 0.1;
  const [hovered, setHovered] = useState(false);

  const boxMaterial = useMemo(() => {
    if (useRandomColors && colors) {
      return colors.map(color => 
        new THREE.MeshStandardMaterial({ color })
      );
    } else {
      return [new THREE.MeshStandardMaterial({ color })];
    }
  }, [color, colors, useRandomColors]);

  useEffect(() => {
    if (ref.current && !selected) {
      setPulseScale(scale);
    }
  }, [selected, scale]);

  useFrame((state) => {
    if (ref.current && selected) {
      const time = state.clock.getElapsedTime();
      const scaleFactor = 1 + pulseIntensity * Math.sin(time * pulseSpeed);
      setPulseScale([scale[0] * scaleFactor, scale[1] * scaleFactor, scale[2] * scaleFactor]);
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  return (
    <mesh
      position={position}
      scale={pulseScale}
      {...meshProps}
      ref={ref}
      castShadow
      material={useRandomColors ? boxMaterial : boxMaterial[0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
};
