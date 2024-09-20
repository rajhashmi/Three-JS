import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
// import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Model from './Model.js'


//  importing models using drei


export default function Experience()
{

    // const model = useLoader(GLTFLoader, "./hamburger.glb");
    // const model = useLoader(
    //     GLTFLoader,
    //     './FlightHelmet/glTF/FlightHelmet.gltf',
    //     (loader) =>
    //     {
    //         const dracoLoader = new DRACOLoader()
    //         dracoLoader.setDecoderPath('./draco/')
    //         loader.setDRACOLoader(dracoLoader)
    //     }
    // )
    // const model2 = useLoader(
    //     GLTFLoader,
    //     './hamburger-draco.glb',
    //     (loader) =>
    //     {
    //         console.log(loader)
    //     }
    // )

    // const model = useLoader(
    //     GLTFLoader,
    //     './hamburger-draco.glb',
    //     (loader) =>
    //     {
    //         const dracoLoader = new DRACOLoader()
    //         dracoLoader.setDecoderPath('./draco/')
    //         loader.setDRACOLoader(dracoLoader)
    //     }
    // )

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
 

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Suspense  // we can add fallback mean we can show omething to user that there will be a model
        fallback={
            <mesh position-y={0.5} scale={[2, 3, 2]}>

                <boxGeometry args={[1,1,1,2,2,2]}/>
                <meshBasicMaterial wireframe color='red'/>
            </mesh>
        }
        > 
        <Model/>
        </Suspense>
        
    </>
}


//  models is to expensive and taking to much time to load but we can you lazy loading with this we'll make our webpage interactive even the model is load or not by using suspense