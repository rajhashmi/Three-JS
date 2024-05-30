import * as THREE from 'three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
console.log(OrbitControls);

const mousePosition = {
    x:0,
    y:0
};

window.addEventListener('mousemove', (event)=>{
   mousePosition.x = event.clientX / sizes.width - 0.5
   mousePosition.y = - (event.clientY / sizes.height - 0.5)
})
/**
 * Base07-
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.screen.availWidth - 50,
    height: window.screen.availHeight - 100
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // lack of perspective

// const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1, 100)
/*
    Parameter Instead o a field of view, we provide how far the camera can see in each direaction (left, right, top and far) then the near and far
*/
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 5
camera.lookAt(mesh.position)
scene.add(camera,)

// controls

const controls = new OrbitControls(camera,canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;
    // camera.position.x = Math.sin(mousePosition.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(mousePosition.x * Math.PI * 2) * 3
    // camera.position.y = mousePosition.y * 5
    // camera.lookAt(mesh.position)
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()