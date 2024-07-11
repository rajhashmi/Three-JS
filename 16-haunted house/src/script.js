import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const textLoader = new THREE.TextureLoader();

//floor

const floorAlphaTexture = textLoader.load('./floor/alpha.webp')
const floorColorTexture = textLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorARMTexture = textLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')
/**
 * House
 */
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorColorTexture.repeat.set(8,8);
floorARMTexture.repeat.set(8,8);
floorNormalTexture.repeat.set(8,8);
floorDisplacementTexture.repeat.set(8,8);

floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT =  THREE.RepeatWrapping
floorARMTexture.wrapS =  THREE.RepeatWrapping
floorARMTexture.wrapT =  THREE.RepeatWrapping
floorNormalTexture.wrapS =  THREE.RepeatWrapping
floorNormalTexture.wrapT =  THREE.RepeatWrapping
floorDisplacementTexture.wrapS =  THREE.RepeatWrapping
floorDisplacementTexture.wrapT =  THREE.RepeatWrapping



//walls

const wallColorTexture = textLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallARMTexture = textLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallNormalTexture = textLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')
wallColorTexture.colorSpace = THREE.SRGBColorSpace;


// roof

const roofColorTexture = textLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofARMTexture = textLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.colorSpace = THREE.SRGBColorSpace



// bush 

const bushColorTexture = textLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushARMTexture = textLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')
bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping
bushColorTexture.colorSpace = THREE.SRGBColorSpace


// grave 
const graveColorTexture = textLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

//door

const doorColorTexture = textLoader.load('./door/color.webp')
const doorAlphaTexture = textLoader.load('./door/alpha.webp')
const doorAmbientOcclusionTexture = textLoader.load('./door/ambientOcclusion.webp')
const doorHeightTexture = textLoader.load('./door/height.webp')
const doorNormalTexture = textLoader.load('./door/normal.webp')
const doorMetalnessTexture = textLoader.load('./door/metalness.webp')
const doorRoughnessTexture = textLoader.load('./door/roughness.webp')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent:true,
        map:floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2,
    })
);
floor.rotation.x = -Math.PI * 0.5   
scene.add(floor)



const house = new THREE.Group();
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
    })
);
walls.position.y = 1.25
house.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2,100,100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementScale:0.15,
        displacementBias: -0.04,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.y = 1;
door.position.z = 2 + 0.0001;
house.add(door)


const bushGeometry = new THREE.SphereGeometry(1,16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    color: "#ccffcc",
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
});

const bush1 = new THREE.Mesh(bushGeometry,bushMaterial);
bush1.scale.set(0.5,0.5,0.5);
bush1.rotation.x = - 0.75
bush1.position.set(0.8,0.2,2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.rotation.x = - 0.75
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.rotation.x = - 0.75
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.rotation.x = - 0.75
bush4.position.set(- 1, 0.05, 2.6)


house.add(bush1, bush2, bush3, bush4)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
});

const graves = new THREE.Group()
scene.add(graves)


for(let i = 0; i < 40; i++){
    
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 4;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry,graveMaterial);
    grave.position.x = x
    grave.position.z = z
    grave.position.y = Math.random()  * 0.4;

    grave.rotation.x = (Math.random() * 0.5) * 0.4
    grave.rotation.y = (Math.random() * 0.5) * 0.4
    grave.rotation.z = (Math.random() * 0.5) * 0.4
    graves.add(grave)
}
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.001)
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 0.5)
directionalLight.position.set(3, 2, -8)
// directionalLight.shadow.camera.far = 10
// directionalLight.shadow.camera.right = 10
// directionalLight.shadow.camera.left = -10
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 15
scene.add(directionalLight)

// door light
const doorLight = new THREE.PointLight('#ff7d46',5)
doorLight.position.set(0,2.2,2.5)
doorLight.shadow.camera.far = 11

house.add(doorLight)


// ghosts

const ghost1 = new THREE.PointLight('#8800ff', 6);
const ghost2 = new THREE.PointLight('#ff0088', 6);
const ghost3 = new THREE.PointLight('#ff0000', 6);
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 1
ghost2.shadow.camera.far = 1
ghost3.shadow.camera.far = 1
house.add(ghost1,ghost2,ghost3)

const cameraHelper = new THREE.CameraHelper(doorLight.shadow.camera)
// scene.add(cameraHelper)
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}
/**
 * Animate
 */
const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

scene.fog = new THREE.FogExp2('#02343f', 0.1)

const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    //ghost
    const ghostAngle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghostAngle) * 4
    ghost1.position.z = Math.sin(ghostAngle) * 4;
    ghost1.position.y = Math.sin(ghostAngle) * Math.sin(ghostAngle * 2.34) * Math.sin(ghostAngle * 3.45);


    const ghost2Angle =  - elapsedTime * 0.5;
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45);

    


    const ghost3Angle =   elapsedTime * 0.23;
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6;
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45);


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


