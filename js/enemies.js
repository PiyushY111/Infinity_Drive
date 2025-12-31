import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

// Create enemy car
export function createEnemyCar(laneX, playerCar) {
  const car = new THREE.Group();
  const neonColors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ff00, 0xff0088];
  const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];
  
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.5, 4), 
    new THREE.MeshStandardMaterial({
      color: randomColor,
      emissive: randomColor,
      emissiveIntensity: 0.15,
      metalness: 0.7,
      roughness: 0.3
    })
  );
  body.position.y = 0.5;
  car.add(body);
  
  // Add rear lights
  const rearLight1 = new THREE.PointLight(0xff0000, 0.3, 5);
  rearLight1.position.set(-0.6, 0.5, -2);
  car.add(rearLight1);
  
  const rearLight2 = new THREE.PointLight(0xff0000, 0.3, 5);
  rearLight2.position.set(0.6, 0.5, -2);
  car.add(rearLight2);
  
  car.position.set(laneX[Math.floor(Math.random() * 3)], 0, playerCar.position.z + 150);
  car.userData.baseSpeed = 0.3;
  
  return car;
}

// Spawn enemy
export function spawnEnemy(enemies, scene, laneX, playerCar) {
  const e = createEnemyCar(laneX, playerCar);
  enemies.push(e);
  scene.add(e);
}

// Get spawn interval based on score
export function getSpawnInterval(score) {
  const baseInterval = 1500;
  const minInterval = 250;
  const scoreReduction = Math.floor(score / 100) * 60;
  return Math.max(minInterval, baseInterval - scoreReduction);
}

// Get enemy speed based on score
export function getEnemySpeed(score) {
  const baseSpeed = 0.35;
  const speedIncrease = Math.floor(score / 150) * 0.06;
  return Math.min(baseSpeed + speedIncrease, 1.2);
}

// Update enemies
export function updateEnemies(enemies, speed, score, playerCar, scene) {
  const currentEnemySpeed = getEnemySpeed(score);
  enemies.forEach(e => e.position.z -= currentEnemySpeed + speed);

  // Remove enemies that are far behind or ahead
  return enemies.filter(e => {
    if(e.position.z < playerCar.position.z - 50 || e.position.z > playerCar.position.z + 200) {
      scene.remove(e);
      e.traverse((child) => {
        if(child.geometry) child.geometry.dispose();
        if(child.material) child.material.dispose();
      });
      return false;
    }
    return true;
  });
}
