import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CANNON, { Vec3 } from 'cannon';
import GUI from 'lil-gui'



/**
 * Debug
 */
const gui = new GUI()
const debugObject = {}
debugObject.createSphere = () =>
    {
        createSphere(
            Math.random() * 0.5,
            {
                x: (Math.random() - 0.5) * 3,
                y: 3,
                z: (Math.random() - 0.5) * 3
            }
        )
    }
    gui.add(debugObject, 'createSphere')
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * Physics
 * */ 
const world = new CANNON.World(); // creating world
world.gravity.set(0,-9.82,0); // this is gravity value
// let's add item on it. in three js we call mesh but in cannon we call body


/**
 * Material. have a look at ball when it fall it's falling on a jell (not bouncing) let's make a materail of those
 * */ 
// const concreteMaterial = new CANNON.Material('concrete'); // created materail
// const plasticMaterial = new CANNON.Material('plastic');  // created materail

// // what will happen if plastice materail get in contact with contrete materail let's do this
// const concretePlasticContactMaterail = new CANNON.ContactMaterial(
//     concreteMaterial,
//     plasticMaterial,
//     {
//         friction: 0.1, // move
//         restitution: 0.7 // this is for bounce
//     }
// )
// // make sure  we add this to world
// world.addContactMaterial(concretePlasticContactMaterail);

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.addContactMaterial(defaultContactMaterial)

// 1. create a shape  it's like geometry
const sphereShape = new CANNON.Sphere(0.5) // radius
// 2. create a body it's like material
const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape,
    material: defaultMaterial
});
sphereBody.applyLocalForce(new CANNON.Vec3(150,0,0), new CANNON.Vec3(0,0,0))
world.addBody(sphereBody);

//  we can use only one materail if the whole project is bassed on one physics

/**
 * const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.addContactMaterial(defaultContactMaterial)
 * */ 

// first remove all materail property from every element body 

// world.defaultContactMaterial = defaultContactMaterial

//  adding plane in physics world

const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
    mass: 0, // 0 means that the object will be constant position it will not move anywhere like static and default is also a zero so no need to define
    shape: floorShape
});
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0), // we will give them acces first then with that acess we will rotate it.
   - Math.PI * 0.5
)
floorBody.material = defaultMaterial;
world.addBody(floorBody)




/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)

/**
 * Utiles
 * */ 

const objectToUpdate = [];
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5
})

const createSphere = (radius, position) => {
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.castShadow = true
    mesh.scale.set(radius,radius,radius)
    mesh.position.copy(position);
    scene.add(mesh);

    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({
        mass: 1,
        position: new Vec3(0,3,0),
        shape: shape,
        material: defaultMaterial
    });
    objectToUpdate.push({
        mesh:mesh,
        body: body
    })
    body.position.copy(position);
    world.addBody(body)
}
createSphere(0.5, { x: 0, y: 3, z: 0 })


/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousUdate = 0;
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousUdate;
    previousUdate = elapsedTime
    world.defaultContactMaterial = defaultContactMaterial
    sphereBody.applyForce(new CANNON.Vec3(-0.5,0,0), sphereBody.position)
    // update phycis
    world.step(1 /60, deltaTime, 3);
    for(const object of objectToUpdate)
        {
            object.mesh.position.copy(object.body.position)
        }
    // sphere.position.x = sphereBody.position.x
    // sphere.position.y = sphereBody.position.y
    // sphere.position.z = sphereBody.position.z
//  or 
// both works
    // sphere.position.copy(sphereBody.position)

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()