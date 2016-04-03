///<reference path="../typings/main/ambient/three/index.d.ts"/>

var scene, renderer,
  particle1, particle2, particle2
  , light2, light3, light4, loader;

var light1: THREE.PointLight;

var object : THREE.PlaneGeometry;

var clock = new THREE.Clock();
var camera: THREE.PerspectiveCamera;

init();
animate();

function init() {
  var container = document.getElementById('container');
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 10;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene = new THREE.Scene();
  
  object = new THREE.PlaneGeometry(1000, 1000);
  object.colors.push(new THREE.Color(255, 255, 255));

  var geometry = new THREE.PlaneGeometry(1000, 1000);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffFF, side: THREE.DoubleSide });
  var plane = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x0, shininess: 30, shading: THREE.FlatShading }));

  scene.add(plane);

  var sphere = new THREE.SphereGeometry(0.5, 16, 8);
  light1 = new THREE.PointLight(0xff0040, 1, 15);
  //light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
  //light1.position = new THREE.Vector3(0, 0, 10);
  
  scene.add(light1);
  light1.position = new THREE.Vector3(4.979366638563858, 4.203898499317241, 27.889501526803862);
  light1.position.x = 5;
  light1.position.y = 5;
  light1.position.z = 10; 
  console.log(light1.position.x + ',' + light1.position.y + ',' + light1.position.z);
  //light2 = new THREE.PointLight(0x0040ff, 2, 50);
  //light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff })));
  //scene.add(light2);
  //light3 = new THREE.PointLight(0x80ff80, 2, 50);
  //light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x80ff80 })));
  //scene.add(light3);
  //light4 = new THREE.PointLight(0xffaa00, 2, 50);
  //light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
  //scene.add(light4);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  //
  window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
  requestAnimationFrame(animate);
  render();
}
function render() {
  var time = Date.now() * 0.0005;
  var delta = clock.getDelta();

  //light1.position.x = Math.sin(time * 0.7) * 30;
  //light1.position.y = Math.cos(time * 0.5) * 40;
  //light1.position.z = Math.cos(time * 0.3) * 30;
  //console.log(light1.position.x + ',' + light1.position.y + ',' + light1.position.z);
  //light2.position.x = Math.cos(time * 0.3) * 30;
  //light2.position.y = Math.sin(time * 0.5) * 40;
  //light2.position.z = Math.sin(time * 0.7) * 30;
  //light3.position.x = Math.sin(time * 0.7) * 30;
  //light3.position.y = Math.cos(time * 0.3) * 40;
  //light3.position.z = Math.sin(time * 0.5) * 30;
  //light4.position.x = Math.sin(time * 0.3) * 30;
  //light4.position.y = Math.cos(time * 0.7) * 40;
  //light4.position.z = Math.sin(time * 0.5) * 30;
  renderer.render(scene, camera);
}
