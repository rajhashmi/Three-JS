import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useHelper, BakeShadows, SoftShadows,  AccumulativeShadows, RandomizedLight,ContactShadows, Sky, Environment} from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three' //🟢
import { useControls } from 'leva'  
/**
 * Importing light helper Sign 🟢
 * imoport useHelperMethod
 * **/ 

/**
 * baked shadow 
 * means static shadow
 * */ 
 

export default function Experience()
{

    const lightRef = useRef(); // 🟢
    useHelper(lightRef, THREE.DirectionalLightHelper)// 🟢
    
    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })
    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#1d8f75',
        opacity: { value: 0.4, min: 0, max: 1 },
        blur: { value: 2.8, min: 0, max: 10 },
    
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [ 1, 2, 3 ] }
    })

    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 }
    })
    const scene = useThree(state => state.scene)
    useEffect(() =>
{
    scene.environmentIntensity = envMapIntensity
}, [ envMapIntensity ])
    return <>
    {/* <BakeShadows/> // this will only show us static shadow even the object is moving */}
    {/* <SoftShadows size={ 25 } samples={ 10 } focus={ 0 } /> */}
    <Environment
    background
        files={[
            './environmentMaps/2/px.jpg',
            './environmentMaps/2/nx.jpg',
            './environmentMaps/2/py.jpg',
            './environmentMaps/2/ny.jpg',
            './environmentMaps/2/pz.jpg',
            './environmentMaps/2/nz.jpg',
        ]}
     
     />
    <ContactShadows 
        position={ [ 0, - 0.99, 0 ] }
        scale={ 10 }
        resolution={ 512 }
        far={ 5 }
        color={ color }
        opacity={ opacity }
        blur={ blur }
        frames={ 1 }
    />

        <Perf position="top-left" />

        <OrbitControls makeDefault />
{/* 
        <directionalLight 
        ref={ lightRef }
        position={ sunPosition}
        intensity={ 4.5 }
        castShadow
        shadow-mapSize={ [ 1024, 1024 ] }
        // shadow-camera-near={ 1 }
        // shadow-camera-far={ 10 }
        // shadow-camera-top={ 2 }
        // shadow-camera-right={ 2 }
        // shadow-camera-bottom={ - 2 }
        // shadow-camera-left={ - 2 }
        
        />// 🟢 */}
        {/* <ambientLight intensity={ 1.5 } /> */}

        {/* <AccumulativeShadows
       position={ [ 0, - 0.99, 0 ] }
       scale={ 10 }
       color="#316d39"
       opacity={ 0.8 }
       frames={ Infinity }
       temporal
       blend={ 100 }
         >
             <RandomizedLight
                amount={ 8 }
                radius={ 1 }
                ambient={ 0.5 }
                intensity={ 3 }
                position={ [ 1, 2, 3 ] }
                bias={ 0.001 }
    />

        </AccumulativeShadows> */}
        {/* <Sky sunPosition={sunPosition}/> */}

        <mesh position-x={ - 2 } castShadow >
            <sphereGeometry />
            <meshStandardMaterial color="orange"  envMapIntensity={envMapIntensity}/>
        </mesh>

        <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } castShadow >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity}/>
        </mesh>

        <mesh position-y={ - 1 }   rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity}/>
        </mesh>

    </>
}

// Accumulative Shadows (shadows from all sides but costly)


//  learn about contact shdow