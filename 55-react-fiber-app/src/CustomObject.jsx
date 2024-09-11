import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export default function CustomObject() {
  const geometryRef = useRef();
  const vertecesCount = 10 * 3;

  const positions = useMemo(() => {
    const position = new Float32Array(vertecesCount * 3);
    for (let i = 0; i < vertecesCount * 3; i++) {
      position[i] = (Math.random() - 0.5) * 3;
    }
    return position; // Added return here
  }, [vertecesCount]);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.computeVertexNormals();
    }
  }, [positions]);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={vertecesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}
