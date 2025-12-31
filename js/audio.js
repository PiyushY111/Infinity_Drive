// Audio assets
export const sounds = {
  engine: new Audio("https://actions.google.com/sounds/v1/vehicles/car_idle.ogg"),
  crash: new Audio("https://actions.google.com/sounds/v1/impacts/crash.ogg")
};

// Initialize sounds
export function initializeSounds() {
  sounds.engine.loop = true;
  sounds.engine.volume = 0.8; // Match crash sound volume
}

// Update engine sound based on speed
export function updateEngineSound(speed, maxSpeed) {
  // Keep constant loud volume like crash sound
  sounds.engine.volume = 0.8;
}

// Play engine sound
export function playEngineSound() {
  sounds.engine.play();
}

// Play crash sound
export function playCrashSound() {
  sounds.crash.volume = 0.8;
  sounds.crash.play();
}

// Stop engine sound
export function stopEngineSound() {
  sounds.engine.pause();
}
