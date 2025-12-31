// Game state
export const gameState = {
  speed: 0,
  maxSpeed: 1.20,
  acceleration: 0.015,
  friction: 0.003,
  laneX: [-3, 0, 3],
  currentLane: 1,
  gameStarted: false,
  gameStartTime: 0,
  gameOver: false,
  score: 0,
  lastSpawnTime: 0
};

// Key states for controls
export const keys = {
  left: false,
  right: false,
  up: false,
  down: false
};

// Setup keyboard controls
export function setupControls() {
  window.addEventListener("keydown", (e) => {
    if(!gameState.gameStarted) return;
    
    if(e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = true;
    if(e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = true;
    if(e.key === "ArrowUp" || e.key === "w" || e.key === "W") keys.up = true;
    if(e.key === "ArrowDown" || e.key === "s" || e.key === "S") keys.down = true;
  });

  window.addEventListener("keyup", (e) => {
    if(e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = false;
    if(e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = false;
    if(e.key === "ArrowUp" || e.key === "w" || e.key === "W") keys.up = false;
    if(e.key === "ArrowDown" || e.key === "s" || e.key === "S") keys.down = false;
  });
}

// Process key inputs
export function processInputs() {
  if(keys.left && gameState.currentLane < 2) {
    gameState.currentLane++;
    keys.left = false;
  }
  if(keys.right && gameState.currentLane > 0) {
    gameState.currentLane--;
    keys.right = false;
  }
  if(keys.up) {
    gameState.speed = Math.min(gameState.speed + gameState.acceleration, gameState.maxSpeed);
  } else if(keys.down) {
    gameState.speed = Math.max(gameState.speed - gameState.acceleration, 0);
  } else {
    // Automatically decelerate when no acceleration key is pressed
    gameState.speed = Math.max(gameState.speed - gameState.friction, 0);
  }
}
