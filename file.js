
// TOGGLE
const useAxesHelper = false;


// SCENE
const scene = new THREE.Scene();


// RENDERER
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


// CAMERA
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const minClip = 1;
const maxClip = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, minClip, maxClip);
camera.position.set(0, 0, 15);
camera.lookAt(scene.position);
scene.add(camera);


// OBJECTS (geometry, material, mesh)
const sphereGeometry = new THREE.SphereGeometry(5, 60, 60);
const sphereMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x34ff83,
  wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);


// LIGHT
const ambientLight = new THREE.AmbientLight(0x888855, 0.8);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.position.set(100, 100, 200);
scene.add(ambientLight, directionalLight);


// HELPERS
const axes = new THREE.AxesHelper(20);
useAxesHelper && scene.add(axes);


// ORBIT CONTROLS
const controls = new THREE.OrbitControls( camera, renderer.domElement );


// DEBUGGER
// const gui = new dat.GUI();

// const cameraGui = gui.addFolder("camera");
// cameraGui.add(camera.position, "x");
// cameraGui.add(camera.position, "y");
// cameraGui.add(camera.position, "z");


// HANDLERS
const windowResizeHandler = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  controls.update();
}

// LISTENERS
window.addEventListener("resize", windowResizeHandler, false);



// MAIN RENDER
const render = () => {
  requestAnimationFrame(render);
  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;
  renderer.render(scene, camera);
}

render();
