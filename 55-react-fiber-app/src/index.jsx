import './style.css'
import ReactDOM from 'react-dom/client'

import {Canvas} from '@react-three/fiber'
import Experience from './Experience.jsx'

import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))


root.render(
    <Canvas
        // orthographic
        dpr={0.01} // pixel ratio
        gl={{ // changing renderer propertys 
            antialias:  true,// default is true we can remove this
            toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.LinearSRGBColorSpace
        }}
        camera={{
            fov: 45,
            // zoom: 100,  
            near: 0.1, // we can put all the camera setting in varia ble 
            far: 200,
            position: [3,2,6]
        }}
    >
        <Experience/>
    </Canvas>
)