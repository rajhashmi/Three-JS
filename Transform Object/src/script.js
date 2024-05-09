import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)


// Get the lenth of a vector:
console.log(mesh.position.length());


// You can normalize its values (meaning that you will reduce the length of the vector to 1 unit but preserve its direction):
console.log(mesh.position.normalize())



// To change the values, instead of changing x, y and z separately, you can also use the set(...) method:
mesh.position.set(0.7, - 0.6, 1)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

// To get distance from another Vector3(make sure to use this code after creating the camera)
console.log(mesh.position.distanceTo(camera.position));

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)