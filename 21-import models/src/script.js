import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from 'lil-gui'
import { mix, threshold } from 'three/examples/jsm/nodes/Nodes.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Models
 * */ 

/**
 * animation for models
 * 1. to add animation we need to add mixer make in global to we can update it in tick funcition
 * */ 
let mixer = null;


// ==========
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/') // draco important
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load(
    '/models/lamp/street_lamp_01_1k.gltf',
    (gltf) =>
        {
            console.log(gltf);
            const model = gltf.scene;
            // model.scale.set(0.025, 0.025, 0.025); // Adjust the scale factors to make the model smaller
            model.position.x = 3
            scene.add(model);


            // mixer = new THREE.AnimationMixer(gltf.scene) // pasing object what we want to aniamtion and keep in mind that in tis object there is a propertty name animate where we'll find the animation

            // window.addEventListener('keypress', (e)=>{
            //     if(e.key === "w"){
            //         const action = mixer.clipAction(gltf.animations[1]);
            //         mixer.stopAllAction();
        
            //         action.reset().play();

            //     }else if(e.key === "r"){
            //         const action = mixer.clipAction(gltf.animations[2]);
            //         mixer.stopAllAction();
        
            //         action.reset().play();
            //     }
            // })


            
        
      
        
        }
)

// gltfLoader.load(
//     '/models/FlightHelmet/glTF/FlightHelmet.gltf',
//     (gltf) =>
//         {
//             // const copyChildren = [...gltf.scene.children];
//             // for(const child of copyChildren){
//             //     scene.add(child)
//             // }

//             //  we can add scene as well 

//             scene.add(gltf.scene)
//         }
// )


// DRACOLoader
// gltfLoader.load(
//     '/models/Duck/glTF-Draco/Duck.gltf',
//     (gltf) =>
//         {
//             // const copyChildren = [...gltf.scene.children];
//             // for(const child of copyChildren){
//             //     scene.add(child)
//             // }

//             //  we can add scene as well 

//             scene.add(gltf.scene)
//         }
// )


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    /***
     * update mixture
     * */ 
    if(mixer !== null){
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()