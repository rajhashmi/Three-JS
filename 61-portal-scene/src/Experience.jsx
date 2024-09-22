import { OrbitControls, useGLTF, useTexture, Center, Sparkles  } from "@react-three/drei";
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;
  return (
    <>
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />

      {/* <mesh scale={ 1.5 }>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}

      <Center>

        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh geometry={ nodes.portalLight.geometry } position={ nodes.portalLight.position } rotation={ nodes.portalLight.rotation }>
    <shaderMaterial />
</mesh>
        <Sparkles
    size={ 6 }
    scale={ [ 4, 2, 4 ] }
    position-y={ 1 }
    speed={ 0.2 }
    count={ 40 }
/>

      </Center>
    </>
  );
}
