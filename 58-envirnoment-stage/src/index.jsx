import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

/**
 * to add background color in iu page there are 4 way's to do it
 * 1. in css
 * 2. in renderer in setClearColor method once the scene is ready
 * 3. in scene
 * 4. R3F one
 * **/ 

// const onCreated = ({gl}) => {
//     gl.setClearColor("red");

// }
// const onCreated = ({scene}) => {
//     scene.background = new THREE.Color("red");

// }


root.render(
    <Canvas
        shadows={false}
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
        // onCreated={onCreated}
    >
        <color args={['ivory']} attach="background"/> {/*  this is a way to change the color in scnene */}
        
        <Experience />
    </Canvas>
)