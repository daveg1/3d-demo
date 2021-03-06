const canvas = document.getElementById('scene')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setZ(30)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const pointLight = new THREE.PointLight(0xffffFF)
pointLight.position.set(0,20,20)
scene.add(pointLight)

const helper = new THREE.PointLightHelper(pointLight)
scene.add(helper)

let teapot = null;

const loader = new THREE.OBJLoader()
loader.load(
  './models/teapot.obj',
  obj => {
    obj.scale.set(2,2,2)
    scene.add(obj)
    teapot = obj
  },
  xhr => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
  },
  console.warn
)

function update() {
  if (teapot) {
    teapot.rotation.y += 0.01
  }

  renderer.render(scene, camera)
  requestAnimationFrame(update)
}

update()