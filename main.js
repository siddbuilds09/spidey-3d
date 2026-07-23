import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const loader = new GLTFLoader();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);

directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

let model;
loader.load("assets/spiderman.glb", (gltf) => {

    model = gltf.scene;
    model.scale.set(2, 2, 2);
    model.position.set(2, -2, -1)

    const box = new THREE.Box3().setFromObject(model);
    scene.add(model);

    window.addEventListener("wheel", (event) => {
        if (!model) return;

        model.rotation.y += event.deltaY * 0.005;
    })

}, undefined, (error) => {
    console.error(error);
});

loader.load("assets/marvel.glb", (gltf) => {
    const logo = gltf.scene
    logo.scale.set(0.015, 0.015, 0.015);
    logo.position.set(-2, -1.4, -1);
    scene.add(logo)
})

loader.load("assets/spiderman_symbol_civil_war.glb", (gltf) => {
    const logo = gltf.scene
    logo.scale.set(0.015, 0.015, 0.015);
    logo.position.set(-1, -2.9, -1);
    logo.rotation.x = Math.PI / 2;
    scene.add(logo)
})

loader.load("assets/spiderman-mini.glb", (gltf) => {
    const logo = gltf.scene
    logo.scale.set(2, 2, 2);
    logo.position.set(-2.7, -1.2, 1);
    scene.add(logo)
})


const starsGeometry = new THREE.BufferGeometry();
const starscount = 1000;
const position = [];

for (let i = 0; i < starscount; i++) {
    position.push((Math.random() - 0.5) * 100);
    position.push((Math.random() - 0.5) * 100);
    position.push((Math.random() - 0.5) * 100);
}

starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(position, 3));
const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.15
})
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true
controls.enablePan = false;
controls.enableZoom = false;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

animate();