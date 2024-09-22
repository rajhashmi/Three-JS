import { OrbitControls, Text3D, Center, useMatcapTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useEffect, useState } from "react";
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry();
const torusMaterail = new THREE.MeshMatcapMaterial()


export default function Experience() {
    const [ matcapTexture ] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

    useEffect(() =>
        {
            matcapTexture.colorSpace = THREE.SRGBColorSpace
            matcapTexture.needsUpdate = true
            torusMaterail.matcap = matcapTexture
            torusMaterail.needsUpdate = true
        }, [])


    // const [torusGeometry, setTorusGeometry] = useState();
    // const [torusMaterail, setTorusMaterail] = useState();

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
 
      <Center>
        <Text3D font="./fonts/helvetiker_regular.typeface.json"
         size={ 0.75 }
         height={ 0.2 }
         curveSegments={ 12 }
         bevelEnabled
         bevelThickness={ 0.02 }
         bevelSize={ 0.02 }
         bevelOffset={ 0 }
         bevelSegments={ 5 }
        >
          Hello Shahid
          {/* <meshNormalMaterial /> */}
          <meshMatcapMaterial matcap={matcapTexture}/>
        </Text3D>
      </Center>

      {/* <torusGeometry ref={setTorusGeometry}/> */}
      {/* <meshMatcapMaterial ref={setTorusMaterail} matcap={matcapTexture}/> */}
    

    {[...Array(100)].map((el, inx)=>
      <mesh
      key={inx}
      geometry={torusGeometry}
      material={torusMaterail}
        position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ]}
        scale={0.2 + Math.random() * 0.2}
        rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            0
        ]}
      />
    )}
    </>
  );
}
