import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

// Collision detection boxes
const playerBox = new THREE.Box3();
const enemyBox = new THREE.Box3();

// Check collision between player and enemies
export function checkCollisions(playerCar, enemies) {
  playerBox.setFromObject(playerCar);
  
  for(let e of enemies) {
    enemyBox.setFromObject(e);
    if(playerBox.intersectsBox(enemyBox)) {
      return true; // Collision detected
    }
  }
  
  return false; // No collision
}
