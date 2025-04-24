const choices = document.querySelectorAll('.choice');
const statusText = document.querySelector('.status');
const playerScoreEl = document.getElementById('player-score');
const aiScoreEl = document.getElementById('ai-score');
const historyEl = document.querySelector('.history');
const startBtn = document.querySelector('.start-btn');
const gameContainer = document.querySelector('.game-container');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const bgMusic = document.getElementById('bg-music');

let playerScore = 0;
let aiScore = 0;
let isPlayerTurn = false; // Initially, it's AI's turn

const sounds = {
  rock: document.getElementById('rock-sound'),
  paper: document.getElementById('paper-sound'),
  scissors: document.getElementById('scissors-sound')
};

const aiChoices = ['rock', 'paper', 'scissors'];

function getAIChoice() {
  const random = Math.floor(Math.random() * 3);
  return aiChoices[random];
}

function playSound(choice) {
  if (sounds[choice]) {
    sounds[choice].currentTime = 0;
    sounds[choice].play();
  }
}

function showResult(player, ai) {
  if (player === ai) return 'It\'s a Draw! 😐';
  if (
    (player === 'rock' && ai === 'scissors') ||
    (player === 'paper' && ai === 'rock') ||
    (player === 'scissors' && ai === 'paper')
  ) {
    playerScore++;
    return 'You Win! 🎉';
  } else {
    aiScore++;
    return 'AI Wins! 🤖';
  }
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  aiScoreEl.textContent = aiScore;
}

function addHistory(player, ai, result) {
  const entry = document.createElement('p');
  entry.textContent = `You: ${player} | AI: ${ai} → ${result}`;
  historyEl.prepend(entry);
}

function aiPlay() {
  isPlayerTurn = false;
  const aiChoice = getAIChoice();
  statusText.textContent = `AI chose ${aiChoice}... Now it's your turn!`;
  playSound(aiChoice);

  setTimeout(() => {
    isPlayerTurn = true;
    statusText.textContent = "It's your turn!";
  }, 1500);
}

function playerPlay(playerChoice) {
  if (!isPlayerTurn) return;

  const aiChoice = getAIChoice();
  const result = showResult(playerChoice, aiChoice);

  playSound(playerChoice);
  statusText.textContent = result;
  updateScores();
  addHistory(playerChoice, aiChoice, result);

  setTimeout(() => {
    aiPlay(); // After player move, AI plays
  }, 1000);
}

choices.forEach(choiceEl => {
  choiceEl.addEventListener('click', () => {
    if (!isPlayerTurn) return; // If it's not player's turn, don't allow click

    const playerChoice = choiceEl.dataset.choice;
    playerPlay(playerChoice);
  });
});

startBtn.addEventListener('click', () => {
  gameContainer.style.display = 'flex';
  startBtn.style.display = 'none';
  bgMusic.volume = 0.3;
  bgMusic.play();

  aiPlay(); // Start with AI's move
});

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});







