const gameContainer = document.querySelector('.game-container');
const restartButton = document.getElementById('restart');
const timerElement = document.getElementById('timer');
const winMessage = document.getElementById('win-message');

const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🥝', '🍍'];
let cards = [...icons, ...icons]; // Duplicate for matching pairs
let flippedCards = [];
let matchedCards = [];
let timer = 0;
let interval;

// Shuffle function (Fisher-Yates Algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start game function
function startGame() {
    gameContainer.innerHTML = ''; // Clear grid
    winMessage.style.display = 'none';
    flippedCards = [];
    matchedCards = [];
    timer = 0;
    timerElement.innerText = timer;
    clearInterval(interval);

    interval = setInterval(() => {
        timer++;
        timerElement.innerText = timer;
    }, 1000);

    shuffle(cards);

    // Generate card elements
    cards.forEach((icon) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.icon = icon;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

// Flip card function
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.textContent = this.dataset.icon;
        this.classList.remove('hidden');
        this.classList.add('flipped');
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

// Check if two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.icon === card2.dataset.icon) {
        matchedCards.push(card1, card2);
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.add('hidden');
            card2.classList.add('hidden');
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 500);
    }

    flippedCards = [];

    // Check if all pairs are matched
    if (matchedCards.length === cards.length) {
        clearInterval(interval);
        winMessage.style.display = 'block';
        showConfetti();
    }
}

// Show confetti effect when user wins
function showConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = randomColor();
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Generate random color for confetti
function randomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Restart game
restartButton.addEventListener('click', startGame);

// Start game initially
startGame();
