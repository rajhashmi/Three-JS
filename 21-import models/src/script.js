import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
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
// scene.add(floor)

/**
 * Models
 * */ 

/**
 * Animation for models
 * 1. To add animation, we need to add mixer and make it global so we can update it in the tick function
 * */ 
let mixer = null;

// DRACOLoader setup for GLTF models (if needed)
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/') // draco important
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load(
    '/models/lamp/street_lamp_01_1k.gltf',
    (gltf) => {
        console.log(gltf);
        const model = gltf.scene;
        // model.scale.set(0.025, 0.025, 0.025); // Adjust the scale factors to make the model smaller
        // scene.add(model);

        // Create animation mixer
        mixer = new THREE.AnimationMixer(gltf.scene);
        
        // Add animations (if any)
        gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
        });

        // Optional: Event listener to trigger animations (W key for walking, R for running)
        window.addEventListener('keypress', (e) => {
            if (e.key === "w") {
                const action = mixer.clipAction(gltf.animations[1]); // Walking animation
                mixer.stopAllAction();
                action.reset().play();
            } else if (e.key === "r") {
                const action = mixer.clipAction(gltf.animations[2]); // Running animation
                mixer.stopAllAction();
                action.reset().play();
            }
        });

        scene.add(model);
    }
)

/**
 * Load an FBX model
 */
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('lastTexture.png');
// texture.flipY = false
// const bakedMaterial = new THREE.MeshBasicMaterial({ map: texture })
// texture.colorSpace = THREE.SRGBColorSpace

const fbxLoader = new FBXLoader();
fbxLoader.load(
  'test.fbx',
  (object) => {
    // Log the loaded object and add it to the scene
    console.log("hello");
    
    console.log(object);

    // Optionally, adjust scale
    object.scale.set(0.01,0.01,0.01); // Scale the model if needed

    // Add the FBX object to the scene
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    console.error('An error occurred while loading the FBX model:', error);
  }
);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 400)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8); // Intensity set to 1.8
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(2048, 2048); // Increasing shadow map size for smoother shadows
directionalLight.shadow.camera.far = 50; // Increase the camera far plane to cover larger distances
directionalLight.shadow.camera.left = -20; // Adjust the shadow camera
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.bottom = -20;

// Adjusting position to cover the scene from a more suitable angle
directionalLight.position.set(0, 16, 0); // Higher position for better coverage
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update mixer for animations
    if (mixer !== null) {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render the scene
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();
