import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBADepthPacking } from 'three';

// Setup

//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //Field of view, aspect ratio, view frustum,view frustum

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//fullscreen canvas
renderer.setPixelRatio(window.devicePixelRatio); 
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// camera.position.setX(-3);

renderer.render(scene, camera);
/* Objects in space */

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color:0x95e810,} );
// Meshing
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//planet
const planetTexture = new THREE.TextureLoader().load('./img/sea-texture.jpeg')

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
  })
)

//setting positions
planet.position.z = 20;
planet.position.setX(-10)
scene.add(planet)


//Lightpoint
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(500,1000,0)
scene.add(pointLight)

//LightHelper
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper)

///GridHelper
const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper)

//Orbit Controls
const controls = new OrbitControls(camera,renderer.domElement)


function addStar(){
  const geometry = new THREE.SphereGeometry(0.090,24,24);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry,material);
  //random position
  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x,y,z);
  scene.add(star)
}
//Adding stars
Array(200).fill().forEach(addStar)

//Space background
const spaceTexture = new THREE.TextureLoader().load('./img/space.jpeg');
scene.background = spaceTexture

function moveCamera(){
  console.log("Event")
  const t = document.body.getBoundingClientRect().top;
  planet.position.x = 0.05;
  planet.position.y = 0.2;
  planet.position.z = 0.03;

  camera.position.z = t*-0.01;
  camera.position.x = t*-0.0002;
  camera.position.y = t*-0.0002;
}
document.getElementsByTagName("body")[0].onscroll = moveCamera


function animate(){
  // Telling the browser to make an animation
  requestAnimationFrame(animate)
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.03;
  torus.rotation.z += 0.001;
  
  controls.update();
  
  renderer.render(scene,camera)
}

animate();