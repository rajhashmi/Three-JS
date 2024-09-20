import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useGLTF, Clone } from '@react-three/drei'

export default function Model(){

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
    const model = useGLTF('./hamburger-draco.glb');

    // to clone or I can say multiples instance buy using Clone from drei and replacing with primitive

    // return <primitive object={model.scene} scale={0.35} position-y={-1}/>
    return <>
    <Clone object={model.scene} scale={0.35} position-y={-1}/>
    <Clone object={model.scene} scale={0.35} position-y={1}/>
    <Clone object={model.scene} scale={0.35} position-y={2}/>
    <Clone object={model.scene} scale={0.35} position-y={-2}/>
    
    </>
    
}

// preloading please use only   load models

useGLTF.preload('./hamburger-draco.glb')
