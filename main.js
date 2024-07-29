// CONSTANTS
// Status 
const hungerTextEl = document.getElementById("hunger")
const happinessTextEl = document.getElementById("happiness")
const energyTextEl = document.getElementById("energy")
const canvas = document.getElementById("myCanvas")


// Buttons
const feedBtn = document.querySelector("#feed-btn");
const playBtn = document.querySelector("#play-btn");
const restBtn = document.querySelector("#rest-btn");

// VARIABLES
// Status
let hungerLevel = 100;
let happinessLevel = 100;
let energyLevel = 100;

// CANVAS
const ctx = canvas.getContext("2d");

// Duck Sprite 🦆


// Currently only for idle
const duckImagesIdle = [
  new Image(),
  new Image()
];
duckImagesIdle[0].src = "/public/img/sprites/Duck/Sprites/Idle/Idle 001.png";
duckImagesIdle[1].src = "/public/img/sprites/Duck/Sprites/Idle/Idle 002.png";

let currentFrame = 0;
let animationTimer = 0;  // Keeps track of time elapsed since last frame change
const animationSpeed = 100; // 100 / 60 = 1.67 seconds

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

function drawDuck() {
  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // If images are loaded
  if (duckImagesIdle[0].complete && duckImagesIdle[1].complete) {
  // Draw the current frame of the duck
    ctx.drawImage(
      duckImagesIdle[currentFrame],
      canvasWidth / 2 - duckImagesIdle[currentFrame].width / 2,
      canvasHeight / 2 - duckImagesIdle[currentFrame].height / 2
    );
  }

  // Next frame
  animationTimer += 1;
  if (animationTimer >= animationSpeed) {
    animationTimer = 0;
    currentFrame = (currentFrame + 1) % duckImagesIdle.length;
  }

  // Request the next frame
  requestAnimationFrame(drawDuck);

}

// Start duckidle animation
drawDuck();

// FUNCTIONS
function updateStats() {
  hungerTextEl.innerHTML = hungerLevel;
  happinessTextEl.textContent = happinessLevel;
  energyTextEl.textContent = energyLevel;
}

function feedDucky() {
  hungerLevel = Math.min(hungerLevel + 20, 100);
  // happinessLevel = Math.max(happinessLevel - 10, 0);
  updateStats();
}

function playWithDucky() {
  hungerLevel = Math.max(hungerLevel - 10, 0);
  happinessLevel = Math.min(happinessLevel + 20, 100);
  energyLevel = Math.max(energyLevel - 20, 0);
  updateStats();
}

function letDuckyRest() {
  energyLevel = Math.min(energyLevel + 30, 100);
  // happinessLevel = Math.max(happinessLevel - 10, 0);
  updateStats();
}

function gameLoop() {
  hungerLevel = Math.max(hungerLevel - 1, 0);
  happinessLevel = Math.max(happinessLevel - 1, 0);
  energyLevel = Math.max(energyLevel - 1, 0);
  updateStats();

  if (hungerLevel === 0 || happinessLevel === 0 || energyLevel === 0) {
    console.log("Ducky has died. Game over.");
  } else {
    setTimeout(gameLoop, 1000);
  }
}

// EVENT LISTENERS
feedBtn.addEventListener("click", () => feedDucky());
restBtn.addEventListener("click", () => letDuckyRest());
playBtn.addEventListener("click", () => playWithDucky());

// gameLoop();