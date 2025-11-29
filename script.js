/* --- DATA: Machine Learning Deck --- */
const deck = [
    { q: "What is **Supervised Learning**?", a: "Training a model using **labeled data** where inputs are mapped to known outputs. Think Classification and Regression." },
    { q: "What is **Overfitting**?", a: "When a model learns the training data (including noise) too well and fails to **generalize** to new, unseen data." },
    { q: "What is **Regression**?", a: "A type of supervised learning used to predict **continuous numerical values** (e.g., house prices, stock values)." },
    { q: "What is **Classification**?", a: "A type of supervised learning used to predict **categorical labels** or discrete values (e.g., spam vs. not spam, image recognition)." },
    { q: "What is a **Neural Network**?", a: "A computational model inspired by the human brain, consisting of layers of interconnected nodes (neurons) that pass weighted signals." },
    { q: "What is **Gradient Descent**?", a: "An **optimization algorithm** used to minimize the cost/loss function by iteratively adjusting model parameters in the direction of the steepest descent." },
    { q: "What is **Unsupervised Learning**?", a: "Training on data **without labels** to find hidden patterns or inherent structures (e.g., Clustering, Dimensionality Reduction)." },
    { q: "What is a **Training Set vs Test Set**?", a: "**Training set** is for building the model; **Test set** is for evaluating its performance on completely unseen data to check for generalization." }
];

/* --- STATE MANAGEMENT --- */
let currentIndex = 0;
let isFlipped = false;
let scoreKnew = 0;
let scoreDidnt = 0;

/* --- DOM ELEMENTS --- */
const cardElement = document.getElementById('flashcard');
const questionEl = document.getElementById('card-question');
const answerEl = document.getElementById('card-answer');
const progressEl = document.getElementById('progress-text');
const scoreKnewEl = document.getElementById('score-knew');
const scoreDidntEl = document.getElementById('score-didnt');
const progressBarEl = document.getElementById('progress-bar');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

/* --- INITIALIZATION --- */
function init() {
    renderCard();
    setupParallax();
}

/* --- CORE FUNCTIONS --- */
function renderCard() {
    // Reset flip state visually first
    if (isFlipped) {
        cardElement.classList.remove('is-flipped');
        isFlipped = false;
        // Wait for flip back before changing text (smooth transition)
        setTimeout(() => {
            updateContent();
        }, 400); // Wait half the transition time
    } else {
        updateContent();
    }
}

function updateContent() {
    const currentCard = deck[currentIndex];
    questionEl.innerHTML = currentCard.q;
    answerEl.innerHTML = currentCard.a;
    progressEl.textContent = `${currentIndex + 1} / ${deck.length}`;
    
    // Update Progress Bar
    const progress = ((currentIndex + 1) / deck.length) * 100;
    progressBarEl.style.width = `${progress}%`;

    // Disable navigation buttons at start/end
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === deck.length - 1;
}

function toggleFlip() {
    isFlipped = !isFlipped;
    cardElement.classList.toggle('is-flipped');
}

function changeCard(direction) {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < deck.length) {
        currentIndex = newIndex;
        renderCard();
    }
}

function handleRate(knewIt) {
    // Prevent scoring before flipping to show the answer
    if (!isFlipped) {
        toggleFlip();
        setTimeout(() => {
            // Update Score
            if (knewIt) {
                scoreKnew++;
                scoreKnewEl.textContent = scoreKnew;
            } else {
                scoreDidnt++;
                scoreDidntEl.textContent = scoreDidnt;
            }

            // Move to next card automatically after a short delay
            if (currentIndex < deck.length - 1) {
                setTimeout(() => {
                    changeCard(1);
                }, 600);
            } else {
                // Deck Complete logic
                alert(`Deck complete! You Knew: ${scoreKnew}, Reviewed: ${scoreDidnt}. Great studying!`);
                currentIndex = 0;
                scoreKnew = 0;
                scoreDidnt = 0;
                scoreKnewEl.textContent = scoreKnew;
                scoreDidntEl.textContent = scoreDidnt;
                renderCard();
            }
        }, 200); 
    }
}


/* --- VISUAL EFFECTS (Parallax) --- */
function setupParallax() {
    document.addEventListener("mousemove", (e) => {
        const orbs = document.querySelectorAll('.orb');
        const x = (window.innerWidth - e.pageX * 2) / 150;
        const y = (window.innerHeight - e.pageY * 2) / 150;

        orbs.forEach(orb => {
            const speed = orb.getAttribute('data-speed');
            const xPos = x * speed;
            const yPos = y * speed;
            orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

// Expose functions to global scope for HTML event handlers
window.toggleFlip = toggleFlip;
window.changeCard = changeCard;
window.handleRate = handleRate;

// Run the app when the script loads
init();