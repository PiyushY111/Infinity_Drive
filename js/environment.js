import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";

export const roadLength = 200;

// Create a road piece with neon grid
export function createRoadPiece(zOffset, scene) {
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(10, roadLength),
    new THREE.MeshStandardMaterial({ 
      color: 0x0a0a1a,
      metalness: 0.6,
      roughness: 0.4,
      emissive: 0x000033,
      emissiveIntensity: 0.1
    })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.z = zOffset;
  scene.add(road);

  // Add neon grid lines
  const gridHelper = new THREE.GridHelper(10, 20, 0x00ffff, 0xff00ff);
  gridHelper.position.set(0, 0.01, zOffset);
  gridHelper.material.opacity = 0.15;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  // Dark futuristic terrain
  const grassLeft = new THREE.Mesh(
    new THREE.PlaneGeometry(50, roadLength),
    new THREE.MeshStandardMaterial({ 
      color: 0x050510,
      metalness: 0.3,
      roughness: 0.8
    })
  );
  grassLeft.rotation.x = -Math.PI / 2;
  grassLeft.position.set(-30, 0, zOffset);
  scene.add(grassLeft);

  const grassRight = grassLeft.clone();
  grassRight.position.x = 30;
  scene.add(grassRight);

  return { road, grassLeft, grassRight, zOffset, gridHelper };
}

// Update road pieces for infinite scrolling
export function updateRoadPieces(roadPieces, playerCar) {
  roadPieces.forEach(piece => {
    if(piece.zOffset + roadLength/2 < playerCar.position.z - 100) {
      piece.zOffset += roadLength * 2;
      piece.road.position.z = piece.zOffset;
      piece.grassLeft.position.z = piece.zOffset;
      piece.grassRight.position.z = piece.zOffset;
      if(piece.gridHelper) piece.gridHelper.position.z = piece.zOffset;
    }
  });
}
