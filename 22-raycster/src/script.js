import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

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
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000'})
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)


/**
 * Raycaster
 * */ 
const raycaster = new THREE.Raycaster();



// const rayOrigin = new THREE.Vector3(-3,0,0);
// const rayDirection = new THREE.Vector3(10,0,0); 
// rayDirection.normalize();
// raycaster.set(rayOrigin,rayDirection);

// //  there are two way of casting inertect object 
// /***
//  * 1. 'intersectObject' which is only for one obect 
//  * 2. 'intersectObjects' which can for multiple object passed in array
//  */ 
// const intersectObject = raycaster.intersectObject(object1);
// console.log(intersectObject);

// object1.updateMatrixWorld()
// object2.updateMatrixWorld() //This is important when you want to ensure that the object's position, rotation, and scale are correctly applied before performing operations like raycasting.
// object3.updateMatrixWorld()
// const intersectObjects = raycaster.intersectObjects([object1, object2, object3]);
// console.log(intersectObjects);



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
camera.position.z = 3
scene.add(camera)

const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (e)=>{
    mouse.x = (e.clientX / sizes.width) * 2 - 1; //we are doing this so we can get -1 to 1 
    mouse.y = -(e.clientY / sizes.height) * 2 + 1; //we are doing this so we can get -1 to 1 
})

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

/**
 * Animate
 */

let currentInterect = null;
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
    object3.position.y = Math.sin(elapsedTime * 1.5) * 1.5;

    // const rayOrigin = new THREE.Vector3(-3,0,0);
    // const rayDirection = new THREE.Vector3(1.0,0);
    // rayDirection.normalize();

    // raycaster.set(rayOrigin,rayDirection);  

    const rayCaster = raycaster.setFromCamera(mouse,camera);

    const objectToTest = [object1, object2, object3];
    const intersect = raycaster.intersectObjects(objectToTest);
    

    // for(const intersectObject of objectToTest){
    //     intersectObject.material.color.set('#ff0000')
    // }

    // for(const intersectObject of intersect){
    //     intersectObject.object.material.color.set('#0000ff');
    // }
    if(intersect.length){
        if(currentInterect === null){
            console.log("mouse Enter");
        }

        currentInterect = intersect[0] 
    }else{
        if(currentInterect){
            console.log("mouse Leave");
        }
        currentInterect = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()