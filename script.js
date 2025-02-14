let coins = 0;
let autoClickers = 0;
let multiplier = 1;
let mines = 0;
let polishers = 0;
let experts = 0;
let rebirthMultiplier = 1;
let rebirthCount = 0;
let spaceWorldUnlocked = false;
let spaceStations = 0;
let asteroidMiners = 0;
let spaceStationCost = 2000;
let asteroidMinerCost = 5000;
let autoClickerCost = 10;
let multiplierCost = 50;
let mineCost = 100;
let polisherCost = 250;
let expertCost = 1000;

const cookieBtn = document.getElementById('cookie');
const countDisplay = document.getElementById('count');
const autoClickerBtn = document.getElementById('autoClickerBtn');
const multiplierBtn = document.getElementById('multiplierBtn');
const autoClickerCountDisplay = document.getElementById('autoClickerCount');
const multiplierCountDisplay = document.getElementById('multiplierCount');
const autoClickerCostDisplay = document.getElementById('autoClickerCost');
const multiplierCostDisplay = document.getElementById('multiplierCost');
const toggleUpgradesBtn = document.getElementById('toggleUpgrades');
const upgradesPanel = document.querySelector('.upgrades');
const achievementsPanel = document.querySelector('.achievements');
const toggleAchievementsBtn = document.getElementById('toggleAchievements');
const achievementsList = document.getElementById('achievementsList');
const hackPanel = document.querySelector('.hack-panel');
const hackCode = document.getElementById('hackCode');
const hackButtons = document.getElementById('hackButtons');

// Add space upgrades HTML to upgrades panel
const spaceUpgrades = `
  <div class="upgrade space-upgrade">
    <button id="spaceStationBtn">Buy Space Station (<span id="spaceStationCost">2000</span>)</button>
    <div>Space Stations: <span id="spaceStationCount">0</span></div>
    <div id="spaceStationSprites" class="sprites"></div>
  </div>
  <div class="upgrade space-upgrade">
    <button id="asteroidMinerBtn">Buy Asteroid Miner (<span id="asteroidMinerCost">5000</span>)</button>
    <div>Asteroid Miners: <span id="asteroidMinerCount">0</span></div>
    <div id="asteroidMinerSprites" class="sprites"></div>
  </div>
`;

upgradesPanel.insertAdjacentHTML('beforeend', spaceUpgrades);

// Show hack panel with 1
document.addEventListener('keydown', (e) => {
  if (e.key === '1') {
    hackPanel.classList.toggle('hidden');
  }
});

hackCode.addEventListener('input', () => {
  if (hackCode.value === '9876') {
    hackButtons.classList.remove('hidden');
  } else {
    hackButtons.classList.add('hidden');
  }
});

document.getElementById('add1000').addEventListener('click', () => {
  coins += 1000;
  updateDisplay();
});

document.getElementById('add10000').addEventListener('click', () => {
  coins += 10000;
  updateDisplay();
});

document.getElementById('doubleMultiplier').addEventListener('click', () => {
  multiplier *= 2;
  updateDisplay();
});

document.getElementById('max').addEventListener('click', () => {
  coins += 1000000;
  multiplier *= 10;
  autoClickers += 100;
  mines += 100;
  polishers += 100;
  experts += 100;
  updateDisplay();
});

const earthWorld = document.getElementById('earthWorld');
const spaceWorld = document.getElementById('spaceWorld');
const cookie = document.getElementById('cookie');

earthWorld.addEventListener('click', () => {
  if (!earthWorld.classList.contains('active')) {
    earthWorld.classList.add('active');
    spaceWorld.classList.remove('active');
    cookie.className = 'earth-coin';
    upgradesPanel.classList.remove('space');
  }
});

spaceWorld.addEventListener('click', () => {
  if (coins >= 10000 && !spaceWorldUnlocked) {
    coins -= 10000;
    spaceWorldUnlocked = true;
    updateDisplay();
  }
  if (spaceWorldUnlocked && !spaceWorld.classList.contains('active')) {
    spaceWorld.classList.add('active');
    earthWorld.classList.remove('active');
    cookie.className = 'space-coin';
    upgradesPanel.classList.add('space');
  }
});

const achievements = [
  { id: 'first_click', name: 'First Click', description: 'Click the coin for the first time', unlocked: false },
  { id: 'hundred_coins', name: 'Coin Collector', description: 'Collect 100 coins', unlocked: false },
  { id: 'first_upgrade', name: 'Upgrader', description: 'Buy your first upgrade', unlocked: false },
  { id: 'mine_owner', name: 'Mint Owner', description: 'Own 5 coin mints', unlocked: false },
  { id: 'coin_expert', name: 'Coin Expert', description: 'Hire your first expert', unlocked: false },
  { id: 'space_unlocked', name: 'Space Pioneer', description: 'Unlock the Space World', unlocked: false },
  { id: 'space_station', name: 'Space Commander', description: 'Build your first Space Station', unlocked: false },
  { id: 'asteroid_miner', name: 'Asteroid Hunter', description: 'Deploy your first Asteroid Miner', unlocked: false }
];

function updateAchievements() {
  achievementsList.innerHTML = achievements.map(a => 
    `<div class="achievement ${a.unlocked ? 'unlocked' : ''}">
      <h3>${a.name}</h3>
      <p>${a.description}</p>
    </div>`
  ).join('');
}

function checkAchievements() {
  if (!achievements[0].unlocked) achievements[0].unlocked = true;
  if (!achievements[1].unlocked && coins >= 100) achievements[1].unlocked = true;
  if (!achievements[2].unlocked && (autoClickers > 0 || multiplier > 1)) achievements[2].unlocked = true;
  if (!achievements[3].unlocked && mines >= 5) achievements[3].unlocked = true;
  if (!achievements[4].unlocked && experts > 0) achievements[4].unlocked = true;
  if (!achievements[5].unlocked && spaceWorldUnlocked) achievements[5].unlocked = true;
  if (!achievements[6].unlocked && spaceStations > 0) achievements[6].unlocked = true;
  if (!achievements[7].unlocked && asteroidMiners > 0) achievements[7].unlocked = true;
  updateAchievements();
}

const mineBtn = document.getElementById('mineBtn');
const polisherBtn = document.getElementById('polisherBtn');
const expertBtn = document.getElementById('expertBtn');
const mineCostDisplay = document.getElementById('mineCost');
const polisherCostDisplay = document.getElementById('polisherCost');
const expertCostDisplay = document.getElementById('expertCost');
const mineCountDisplay = document.getElementById('mineCount');
const polisherCountDisplay = document.getElementById('polisherCount');
const expertCountDisplay = document.getElementById('expertCount');

toggleUpgradesBtn.addEventListener('click', () => {
  upgradesPanel.classList.toggle('hidden');
  toggleUpgradesBtn.textContent = upgradesPanel.classList.contains('hidden') ? 'Show Upgrades' : 'Hide Upgrades';
});

toggleAchievementsBtn.addEventListener('click', () => {
  achievementsPanel.classList.toggle('hidden');
  toggleAchievementsBtn.textContent = achievementsPanel.classList.contains('hidden') ? 'Show Achievements' : 'Hide Achievements';
});


function updateSprites(containerId, count, emoji) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const sprite = document.createElement('span');
    sprite.className = 'sprite';
    sprite.textContent = emoji;
    container.appendChild(sprite);
  }
}

const rebirthBtn = document.getElementById('rebirthBtn');

function rebirth() {
  if (coins >= 1000000) {
    rebirthCount++;
    rebirthMultiplier += 0.5;
    coins = 0;
    autoClickers = 0;
    multiplier = 1;
    mines = 0;
    polishers = 0;
    experts = 0;
    autoClickerCost = 10;
    multiplierCost = 50;
    mineCost = 100;
    polisherCost = 250;
    expertCost = 1000;
    updateDisplay();
    checkAchievements();
  }
}

rebirthBtn.addEventListener('click', rebirth);

function updateDisplay() {
  countDisplay.textContent = Math.floor(coins);
  rebirthBtn.disabled = coins < 1000000;
  autoClickerCountDisplay.textContent = autoClickers;
  multiplierCountDisplay.textContent = multiplier;
  autoClickerCostDisplay.textContent = autoClickerCost;
  multiplierCostDisplay.textContent = multiplierCost;
  mineCostDisplay.textContent = mineCost;
  polisherCostDisplay.textContent = polisherCost;
  expertCostDisplay.textContent = expertCost;
  mineCountDisplay.textContent = mines;
  polisherCountDisplay.textContent = polishers;
  expertCountDisplay.textContent = experts;

  // Update space upgrade displays
  document.getElementById('spaceStationCount').textContent = spaceStations;
  document.getElementById('asteroidMinerCount').textContent = asteroidMiners;
  document.getElementById('spaceStationCost').textContent = spaceStationCost;
  document.getElementById('asteroidMinerCost').textContent = asteroidMinerCost;

  updateSprites('autoClickerSprites', autoClickers, '🖱️');
  updateSprites('multiplierSprites', multiplier - 1, '✨');
  updateSprites('mineSprites', mines, '⛏️');
  updateSprites('polisherSprites', polishers, '💫');
  updateSprites('expertSprites', experts, '👨‍💰');
  updateSprites('spaceStationSprites', spaceStations, '🛸');
  updateSprites('asteroidMinerSprites', asteroidMiners, '☄️'); // Changed emoji

  autoClickerBtn.disabled = coins < autoClickerCost;
  multiplierBtn.disabled = coins < multiplierCost;
  mineBtn.disabled = coins < mineCost;
  polisherBtn.disabled = coins < polisherCost;
  expertBtn.disabled = coins < expertCost;
}

cookieBtn.addEventListener('click', () => {
  coins += multiplier * rebirthMultiplier;
  updateDisplay();
  checkAchievements();
  cookieBtn.style.animation = 'none';
  cookieBtn.offsetHeight; // Trigger reflow
  cookieBtn.style.animation = null;
});

autoClickerBtn.addEventListener('click', () => {
  if (coins >= autoClickerCost) {
    coins -= autoClickerCost;
    autoClickers++;
    autoClickerCost = Math.floor(autoClickerCost * 1.5);
    updateDisplay();
    checkAchievements();
  }
});

multiplierBtn.addEventListener('click', () => {
  if (coins >= multiplierCost) {
    coins -= multiplierCost;
    multiplier++;
    multiplierCost = Math.floor(multiplierCost * 2);
    updateDisplay();
    checkAchievements();
  }
});

mineBtn.addEventListener('click', () => {
  if (coins >= mineCost) {
    coins -= mineCost;
    mines++;
    mineCost = Math.floor(mineCost * 1.5);
    updateDisplay();
    checkAchievements();
  }
});

polisherBtn.addEventListener('click', () => {
  if (coins >= polisherCost) {
    coins -= polisherCost;
    polishers++;
    polisherCost = Math.floor(polisherCost * 1.5);
    updateDisplay();
    checkAchievements();
  }
});

expertBtn.addEventListener('click', () => {
  if (coins >= expertCost) {
    coins -= expertCost;
    experts++;
    expertCost = Math.floor(expertCost * 1.5);
    updateDisplay();
    checkAchievements();
  }
});

// Add space upgrade buttons functionality
document.getElementById('spaceStationBtn').addEventListener('click', () => {
  if (coins >= spaceStationCost) {
    coins -= spaceStationCost;
    spaceStations++;
    spaceStationCost = Math.floor(spaceStationCost * 1.5);
    updateDisplay();
    checkAchievements();
  }
});

document.getElementById('asteroidMinerBtn').addEventListener('click', () => {
  if (coins >= asteroidMinerCost) {
    coins -= asteroidMinerCost;
    asteroidMiners++;
    asteroidMinerCost = Math.floor(asteroidMinerCost * 1.5);
    updateDisplay();
    checkAchievements();
  }
});

setInterval(() => {
  coins += ((autoClickers * multiplier * 2) + (mines * 5) + (polishers * 10) + (experts * 25) + 
           (spaceStations * 50) + (asteroidMiners * 100)) * rebirthMultiplier;
  updateDisplay();
  checkAchievements();
}, 500);

updateDisplay();
updateAchievements();
