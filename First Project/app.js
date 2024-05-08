import * as THREE from 'three'
const canvas = document.querySelector("canvas.webgl")

// we need 4 element for basic seen

/*
    Scene
    Object
    Camera
    Renderer
*/ 

//  Scene


const scene = new THREE.Scene()

//  Geometry

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: '#333'});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
    width: 800,
    height: 600
};

const camera = new THREE.PerspectiveCamera(75,sizes.width/ sizes.height);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene,camera)