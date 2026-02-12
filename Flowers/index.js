
import * as THREE from 'three';
import { OrbitControls } from 'orbitcontrols';
import { GLTFLoader } from 'gltfloader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe2e2);

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 2, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

// Свет
const ambient = new THREE.AmbientLight(0xffffff, 0.6); // общий мягкий свет
scene.add(ambient);


const dirLight = new THREE.DirectionalLight(0xffffff, 1.2); // основной источник
dirLight.position.set(2, 4, 3);
scene.add(dirLight);

const fillLight = new THREE.PointLight(0xffcccc, 1, 10); // тёплый свет с другой стороны
fillLight.position.set(-2, 2, 2);
scene.add(fillLight);

// Роза
const loader = new GLTFLoader();
loader.load(
    'public/rose.glb', // ← путь к твоему файлу
    (gltf) => {
        const rose = gltf.scene;
        rose.scale.set(1, 1, 1);
        scene.add(rose);
        renderer.render(scene, camera);
    },
    (xhr) => {
        console.log(`Загрузка: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
    },
    (error) => {
        console.error('Ошибка загрузки модели:', error);
    }
);

window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

