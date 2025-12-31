import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

// Create player car with futuristic design
export function createPlayerCar() {
  const car = new THREE.Group();

  // Body - Futuristic sports car look
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.5, 4),
    new THREE.MeshStandardMaterial({ 
      color: 0xff0000,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xff0000,
      emissiveIntensity: 0.1
    })
  );
  body.position.y = 0.5;
  car.add(body);

  // Cabin - Glowing windows
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.5, 2),
    new THREE.MeshStandardMaterial({ 
      color: 0x001133,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x0088ff,
      emissiveIntensity: 0.2
    })
  );
  cabin.position.set(0, 0.9, 0);
  car.add(cabin);

  // Wheels - Neon rims
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    metalness: 0.9,
    roughness: 0.3,
    emissive: 0x00ffff,
    emissiveIntensity: 0.05
  });
  const wheels = [];

  function makeWheel(x, z) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.2, z);
    car.add(wheel);
    wheels.push(wheel);
  }
  makeWheel(-0.9, -1.5); makeWheel(0.9, -1.5);
  makeWheel(-0.9, 1.5);  makeWheel(0.9, 1.5);

  car.userData.wheels = wheels;

  // Headlights - Bright neon blue
  const headlightLeft = new THREE.SpotLight(0x00ffff, 1, 30, Math.PI/6, 0.5);
  headlightLeft.position.set(-0.7, 1, 2);
  headlightLeft.target.position.set(-0.7, 0, 10);
  car.add(headlightLeft); car.add(headlightLeft.target);

  const headlightRight = new THREE.SpotLight(0x00ffff, 1, 30, Math.PI/6, 0.5);
  headlightRight.position.set(0.7, 1, 2);
  headlightRight.target.position.set(0.7, 0, 10);
  car.add(headlightRight); car.add(headlightRight.target);

  // Add underglow effect
  const underglow = new THREE.PointLight(0xff00ff, 0.6, 8);
  underglow.position.set(0, 0.2, 0);
  car.add(underglow);

  return car;
}
