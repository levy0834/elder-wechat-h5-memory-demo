const symbols = ['福', '寿', '喜', '乐', '安', '康'];
const board = document.getElementById('board');
const matchedCountEl = document.getElementById('matchedCount');
const movesCountEl = document.getElementById('movesCount');
const restartBtn = document.getElementById('restartBtn');
const modal = document.getElementById('modal');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById('playAgainBtn');

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let moves = 0;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function updateStats() {
  matchedCountEl.textContent = `${matchedPairs} / 6`;
  movesCountEl.textContent = moves;
}

function createCard(symbol, index) {
  const button = document.createElement('button');
  button.className = 'card';
  button.type = 'button';
  button.dataset.symbol = symbol;
  button.dataset.index = index;
  button.setAttribute('aria-label', '翻开卡牌');
  button.innerHTML = `
    <span class="card-face card-front">福</span>
    <span class="card-face card-back">${symbol}</span>
  `;
  button.addEventListener('click', () => flipCard(button));
  return button;
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function finishGame() {
  resultText.textContent = `你一共翻了 ${moves} 次，就把 6 组福气牌都找齐了，手气相当稳。`;
  modal.classList.remove('hidden');
}

function checkMatch() {
  if (!firstCard || !secondCard) return;

  moves += 1;
  const matched = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (matched) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs += 1;
    updateStats();
    resetSelection();
    if (matchedPairs === 6) {
      setTimeout(finishGame, 320);
    }
    return;
  }

  updateStats();
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetSelection();
  }, 700);
}

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function setupGame() {
  modal.classList.add('hidden');
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  moves = 0;
  updateStats();

  const deck = shuffle([...symbols, ...symbols]);
  board.innerHTML = '';
  cards = deck.map((symbol, index) => createCard(symbol, index));
  cards.forEach((card) => board.appendChild(card));
}

restartBtn.addEventListener('click', setupGame);
playAgainBtn.addEventListener('click', setupGame);

setupGame();
