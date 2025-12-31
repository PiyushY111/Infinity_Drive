import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";
import { createScene, createCamera, createRenderer, setupLighting } from './js/scene.js';
import { createPlayerCar } from './js/player.js';
import { roadLength, createRoadPiece, updateRoadPieces } from './js/environment.js';
import { initializeRoadsideObjects, updateRoadsideObjects } from './js/obstacles.js';
import { spawnEnemy, getSpawnInterval, updateEnemies } from './js/enemies.js';
import { gameState, setupControls, processInputs } from './js/controls.js';
import { updateHUD, updateSpeedWarning, showGameOver, setupStartButton } from './js/ui.js';
import { initializeSounds, playEngineSound, playCrashSound, stopEngineSound, updateEngineSound } from './js/audio.js';
import { checkCollisions } from './js/collision.js';

// ============= INITIALIZATION =============
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
setupLighting(scene);

// Player car
const playerCar = createPlayerCar();
scene.add(playerCar);
camera.lookAt(playerCar.position);

// Environment - Road pieces
const roadPieces = [];
roadPieces.push(createRoadPiece(0, scene));
roadPieces.push(createRoadPiece(roadLength, scene));

// Roadside objects
const roadsideObjects = initializeRoadsideObjects(scene);

// Enemies
let enemies = [];

// Setup controls and UI
setupControls();
initializeSounds();

setupStartButton(() => {
  gameState.gameStarted = true;
  gameState.gameStartTime = Date.now();
  playEngineSound();
});

// ============= GAME LOOP =============
function animate(time) {
  if(!gameState.gameOver) {
    requestAnimationFrame(animate);

    // Only animate if game has started
    if(!gameState.gameStarted) {
      renderer.render(scene, camera);
      return;
    }

    // Show speed warning
    const timeSinceStart = Date.now() - gameState.gameStartTime;
    updateSpeedWarning(gameState.speed, timeSinceStart);

    // Process player inputs
    processInputs();

    // Update engine sound based on speed
    updateEngineSound(gameState.speed, gameState.maxSpeed);

    // Player movement
    playerCar.position.x += (gameState.laneX[gameState.currentLane] - playerCar.position.x) * 0.2;
    playerCar.position.z += gameState.speed;

    // Rotate wheels
    playerCar.userData.wheels.forEach(w => w.rotation.x -= gameState.speed * 0.3);

    // Camera follow
    camera.position.lerp(
      new THREE.Vector3(playerCar.position.x, 5, playerCar.position.z - 10),
      0.05
    );
    camera.lookAt(playerCar.position.x, 0, playerCar.position.z + 5);

    // Update road
    updateRoadPieces(roadPieces, playerCar);

    // Update roadside objects
    updateRoadsideObjects(roadsideObjects, gameState.speed, playerCar);

    // Spawn enemies
    if(time - gameState.lastSpawnTime > getSpawnInterval(gameState.score) && enemies.length < 15) {
      spawnEnemy(enemies, scene, gameState.laneX, playerCar);
      
      // 30% chance to spawn additional enemy
      if(Math.random() < 0.3 && gameState.score > 500 && enemies.length < 14) {
        setTimeout(() => spawnEnemy(enemies, scene, gameState.laneX, playerCar), 100);
      }
      
      // 15% chance for triple spawn at high scores
      if(Math.random() < 0.15 && gameState.score > 1500 && enemies.length < 13) {
        setTimeout(() => spawnEnemy(enemies, scene, gameState.laneX, playerCar), 200);
      }
      
      gameState.lastSpawnTime = time;
    }

    // Update enemies
    enemies = updateEnemies(enemies, gameState.speed, gameState.score, playerCar, scene);

    // Check collisions
    if(checkCollisions(playerCar, enemies)) {
      gameState.gameOver = true;
      showGameOver();
      playCrashSound();
      stopEngineSound();
    }

    // Update HUD
    gameState.score += gameState.speed * 2;
    updateHUD(gameState.score, gameState.speed);

    renderer.render(scene, camera);
  }
}

animate();
