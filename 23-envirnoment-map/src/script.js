import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'

import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js'
/**
 * Base
 */
// Debug
const gui = new GUI()

/***
 * GLTFLoader
 */ 
const gltfLoader = new GLTFLoader();

// environmentmap loader 
const cubeEnvironmentMap = new THREE.CubeTextureLoader();


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 1,
        color: 0xaaaaaa
    })
)
torusKnot.position.y = 4
torusKnot.position.x = -4
scene.add(torusKnot)



const torus = new THREE.Mesh(
    new THREE.TorusGeometry(8,0.5),
    new THREE.MeshBasicMaterial({color: new THREE.Color(10,4,2)})
);
torus.layers.enable(1);
torus.position.y = 3.5
scene.add(torus)

//  Cube render Target

const torusRenderer = new THREE.WebGLCubeRenderTarget(256,
    {
        type: THREE.HalfFloatType, // this is uses only 16 bits and good for performace cuz defaulf WebGLCubeRenderTarget don't use hdr an we want that we have upper version of this call THREE.Float uses 32 bits
        // type: THREE.FloatType 
    }
)

scene.environment = torusRenderer.texture // we use in scene.enviroment// after creating thiswe need camera for this renderer so  we use cube camera
const cubeCamera = new THREE.CubeCamera(0.1,100,torusRenderer)
cubeCamera.layers.set(1)

/**
 * models
 * */ 

gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>{
        gltf.scene.scale.set(10,10,10)
        scene.add(gltf.scene) 
    }
)

/**
 * environementmap loader
 * LDR cude texture
 * */ 
// const environementMap = cubeEnvironmentMap.load([
//     '/environmentMaps/0/px.png',
//     '/environmentMaps/0/nx.png',
//     '/environmentMaps/0/py.png',
//     '/environmentMaps/0/ny.png',
//     '/environmentMaps/0/pz.png',
//     '/environmentMaps/0/nz.png',
// ]); 

// // about a decade a ago in old video game whenever the environment have to loaded they make huge big cude and give them texture side by side

// scene.background = environementMap 
// scene.environment = environementMap // adding enviroment to all mesh in the scene
// scene.environmentIntensity = 1 // intensity of enviroment 
// scene.backgroundBlurriness = 0 // background blurriness of scene
// scene.backgroundIntensity = 1 // this is for scene

gui.add(scene, "environmentIntensity").min(0).max(10).step(0.001);
gui.add(scene, "backgroundBlurriness").min(0).max(1).step(0.001);
gui.add(scene, "environmentIntensity").min(0).max(10).step(0.001);
gui.add(scene, "backgroundIntensity").min(0).max(10).step(0.001);
gui.add(scene.backgroundRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('backgroundRotationY')
gui.add(scene.environmentRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('environmentRotationY')



// // for hdr loader
// const rgbLoader = new RGBELoader();
// rgbLoader.load('/environmentMaps/2/2k.hdr', (environmentMap)=>{
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     scene.environment = environmentMap

// })



// Ground projeected envrionement map

// const rgbLoader = new RGBELoader();
// rgbLoader.load('/environmentMaps/2/2k.hdr', (environmentMap)=>{
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     scene.environment = environmentMap

//     const skybox = new GroundedSkybox(environmentMap, 15, 70)
//     skybox.position.y = 15
//     scene.add(skybox)
// })

/**
 * Realtime enviromnent maps
 * **/ 
const textureLoader = new THREE.TextureLoader()
const enviromentMaps = textureLoader.load(
  '/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg'
)
enviromentMaps.mapping = THREE.EquirectangularReflectionMapping
enviromentMaps.colorSpace = THREE.SRGBColorSpace
scene.background = enviromentMaps


/**
 *
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
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // realtime enviroment map

    if(torus){
        torus.rotation.x = Math.sin(elapsedTime) * 2
        cubeCamera.update(renderer, scene)
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()