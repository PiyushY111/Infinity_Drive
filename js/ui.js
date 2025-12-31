// UI Elements
export const ui = {
  scoreEl: document.getElementById("score"),
  speedEl: document.getElementById("speed"),
  gameOverEl: document.getElementById("gameOver"),
  speedWarningEl: document.getElementById("speedWarning"),
  startButton: document.getElementById("startButton"),
  startScreen: document.getElementById("startScreen")
};

// Update HUD display
export function updateHUD(score, speed) {
  ui.scoreEl.textContent = Math.floor(score);
  ui.speedEl.textContent = Math.floor(speed * 200);
}

// Show speed warning
export function updateSpeedWarning(speed, timeSinceStart) {
  if(speed === 0 && timeSinceStart > 3000 && timeSinceStart < 15000) {
    ui.speedWarningEl.classList.add('show');
  } else {
    ui.speedWarningEl.classList.remove('show');
  }
}

// Show game over screen
export function showGameOver() {
  ui.gameOverEl.classList.add('show');
}

// Setup start button
export function setupStartButton(onStart) {
  ui.startButton.addEventListener("click", () => {
    ui.startScreen.classList.add('hidden');
    onStart();
  });
}
