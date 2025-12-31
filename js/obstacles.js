import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

// Create a tree
export function createTree(x, z) {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 2, 12), 
    new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.5,
      roughness: 0.7
    })
  );
  trunk.position.y = 1; 
  tree.add(trunk);
  
  const leaves = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 12), 
    new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 0.15
    })
  );
  leaves.position.y = 3; 
  tree.add(leaves);
  tree.position.set(x, 0, z);
  return tree;
}

// Create a traffic cone
export function createCone(x, z) {
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 6), 
    new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 0.25,
      metalness: 0.4,
      roughness: 0.3
    })
  );
  cone.position.set(x, 0.5, z);
  return cone;
}

// Create a barrier
export function createBarrier(x, z) {
  const barrier = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 0.5), 
    new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    })
  );
  barrier.position.set(x, 0.5, z);
  return barrier;
}

// Initialize roadside objects
export function initializeRoadsideObjects(scene) {
  const roadsideObjects = [];
  
  for(let i = 10; i < 200; i += 10) {
    const side = Math.random() < 0.5 ? -1 : 1;
    const type = Math.floor(Math.random() * 3);
    let obj;
    
    switch(type) {
      case 0: obj = createTree(side * 12, i); break;
      case 1: obj = createCone(side * 8, i); break;
      case 2: obj = createBarrier(side * 10, i); break;
    }
    
    roadsideObjects.push(obj);
    scene.add(obj);
  }
  
  return roadsideObjects;
}

// Update roadside objects position
export function updateRoadsideObjects(roadsideObjects, speed, playerCar) {
  roadsideObjects.forEach(obj => {
    obj.position.z -= speed;
    if(obj.position.z < playerCar.position.z - 10) {
      obj.position.z += 200;
      obj.position.x = (Math.random() < 0.5 ? -1 : 1) * (obj.userData.sideOffset || 10);
    }
  });
}
