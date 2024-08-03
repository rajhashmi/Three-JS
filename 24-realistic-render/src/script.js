import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const rgbeLoader = new RGBELoader()
const textureLoader = new THREE.TextureLoader();

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
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child.isMesh)
        {
            child.castShadow = true;
            child.receiveShadow  = true
        }
    })
}

/**
 * Environment map
 */
// Intensity
scene.environmentIntensity = 1
gui
    .add(scene, 'environmentIntensity')
    .min(0)
    .max(10)
    .step(0.001)

// HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

/**
 * Models
 */
// Helmet
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(10, 10, 10)
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)
const floorColorTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg')
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
const floorNormalTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png')
const floorAORoughnessMetalnessTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg')


const planeGeometry = new THREE.Mesh(
    new THREE.PlaneGeometry(8,8),
    new THREE.MeshStandardMaterial({
        map: floorColorTexture,
        normalMap: floorNormalTexture,
        aoMap: floorAORoughnessMetalnessTexture,
        roughnessMap: floorAORoughnessMetalnessTexture,
        metalnessMap: floorAORoughnessMetalnessTexture
    })
);
planeGeometry.rotation.x = - Math.PI * 0.5
scene.add(planeGeometry)

const wallColorTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg')
wallColorTexture.colorSpace = THREE.SRGBColorSpace
const wallNormalTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png')
const wallAORoughnessMetalnessTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg')

const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        normalMap: wallNormalTexture,
        aoMap: wallAORoughnessMetalnessTexture,
        roughnessMap: wallAORoughnessMetalnessTexture,
        metalnessMap: wallAORoughnessMetalnessTexture,
    })
)
wall.position.y = 4
wall.position.z = - 4
scene.add(wall)
/**
 * Directional light
 * */ 

const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(-4,6.5,2.5)
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.027
directionalLight.shadow.bias = - 0.004
directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.set(1024,1024)

// const directionalHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(directionalHelper)
scene.add(directionalLight);


directionalLight.target.position.set(0,4,0);
directionalLight.target.updateWorldMatrix()

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 10).max(10).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 10).max(10).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 10).max(10).step(0.001).name('lightZ')
gui.add(directionalLight, "castShadow");


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
    canvas: canvas,
    antialias: true // for better edge and good in performance 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap

// tone mapping 

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3 // it's mean how much light you let in 


gui.add(renderer , 'toneMapping', {
     'No': THREE.NoToneMapping,
     'Linear': THREE.LinearToneMapping,
     'Reinhard': THREE.ReinhardToneMapping,
     'Cineon': THREE.CineonToneMapping,
     'ACESFilmic': THREE.ACESFilmicToneMapping,
})

gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001);

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



// 1. Tone Mapping.
/**
 * The tone mapping intends to convert High Dynamic Range (HDR) values to Low Dynamic Range (LDR) values.

While we are indeed talking about the same HDR as for the environment map, tone mapping in Three.js will actually fake the process of converting LDR to HDR even if the colors aren’t HDR resulting in a very realistic render.
 * **/ 



/**
 * aliasing 
 * 
 * We call aliasing an artifact that might appear in some situations where we can see a stair-like effect, usually on the edge of the geometries.

Our model isn't subject to that problem because there IT HAS A lot of details. But if you have a screen with a pixel ratio of 1, look at the edges — especially the bright ones —, rotate the camera slowly, and you might see the problem: 


It's a well-known problem. When the rendering of a pixel occurs, it tests what geometry is being rendered in that pixel. It calculates the color, and, in the end, that color appears on the screen.

But geometry edges are usually not perfectly aligned with vertical lines and horizontal lines of pixel of your screen and this is why you get this stair-like artifact named aliasing.

There are many ways of fixing that problem, and developers have been struggling with it for many years.

One easy solution would be to increase our renderer's resolution, let's say to the double. When resized to its normal size, each pixel color will automatically be averaged from the 4 pixels rendered.

This solution is called super sampling (SSAA) or fullscreen sampling (FSAA), and it's the easiest and more efficient one. Unfortunately, that means 4 times more pixels to render, which can result in performance issues.

The other solution is called multi sampling (MSAA). Again, the idea is to render multiple values per pixel (usually 4) like for the super sampling but only on the geometries' edges. The values of the pixel are then averaged to get the final pixel value.

The most recent GPUs can perform this multi sampling anti-aliasing, and Three.js handles the setup automatically. We just need to change the antialias property to true during the instantiating — and not after:
 * **/ 