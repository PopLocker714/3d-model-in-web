import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.getElementById('bg')
})



renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

// renderer.render(scene, camera)


// const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0x8a45b4 } )
// const torusKnot = new THREE.Mesh( geometry, material )
// scene.add( torusKnot )

const pointLight = new THREE.PointLight( 0xffffff )
pointLight.position.set( 50, 50, 50 )

const ambientLight = new THREE.AmbientLight( 0x404040 )
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper, lightHelper)


const controls = new OrbitControls(camera, renderer.domElement)


// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24)
//   const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
//   const star = new THREE.Mesh(geometry, material)

//   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
//   star.position.set(x, y, z)
//   scene.add(star)
// }
// Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// const loader = new GLTFLoader()
// loader.load( 'Ponchikv11.glb', function ( gltf ) {
// 	scene.add( gltf.scene )
//   console.log(gltf)
// }, undefined, function ( error ) {
// 	console.error( error )
// })


const fbxLoader = new FBXLoader()
fbxLoader.load(
    'public/Ponchikv11.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.05, .05, .05)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)




function animete() {
  requestAnimationFrame(animete)

  // torusKnot.rotation.x += 0.01
  // torusKnot.rotation.y += 0.005
  // torusKnot.rotation.z += 0.01

  controls.update()

  renderer.render(scene, camera)
}

animete()