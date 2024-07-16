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
 * Galaxy
 */

const parameter = {}; //default
parameter.count = 1000;
parameter.size = 0.02;
parameters.radius = 5

let geometry = null
let material = null
let point = null

const generateGalaxy = () => {

    if(point != null){
        geometry.dispose()
        material.dispose()
        scene.remove(point)
    }

     geometry = new THREE.BufferGeometry();
    const position = new Float32Array(parameter.count * 3);

    for(let i = 0; i < parameter.count; i++){
        const i3 = i * 3;
        position[i3] = (Math.random() - 0.5) * 3
        position[i3 + 1] = (Math.random() - 0.5) * 3
        position[i3 + 2] = (Math.random() - 0.5) * 3
        
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));


    /**
     * materail 
    */
    material = new THREE.PointsMaterial({
    size: parameter.size,
    depthWrite:false,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
   })
    point = new THREE.Points(geometry, material);
   scene.add(point)
}
generateGalaxy()

gui.add(parameter, 'count').min(100).max(1000000).step(1000).onFinishChange(generateGalaxy);
gui.add(parameter, 'size').min(0.001).max(0.1).step(0.002).onFinishChange(generateGalaxy);
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
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
camera.position.x = 3
camera.position.y = 3
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()