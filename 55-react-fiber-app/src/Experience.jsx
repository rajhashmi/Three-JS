import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import CustomObject from "./CustomObject.jsx";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();

  const Ref = useRef();

  useFrame((state, delta) => {
    let pixelRTION = state.gl.getPixelRatio();
    if(pixelRTION <= 1){
        state.gl.setPixelRatio(pixelRTION += 0.001) 

    }
    /** for camera rotation in circular motion
 * 
 *   let elapsedTime = state.clock.elapsedTime;

        state.camera.position.x = Math.sin(elapsedTime) * 8
        state.camera.position.z = Math.cos(elapsedTime) * 8
        state.camera.lookAt(0, 0, 0);
        
 * **/

    Ref.current.rotation.y += delta;
  });
  return (
    <>
      {/* <OrbitControls a/> */}
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={2.5} />
      <group ref={Ref}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <CustomObject />
    </>
  );
}
