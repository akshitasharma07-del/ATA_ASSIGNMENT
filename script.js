 /* --- DATA: Machine Learning Deck --- */
        const deck = [
            { q: "What is Supervised Learning?", a: "Training a model using labeled data where inputs are mapped to known outputs." },
            { q: "What is Overfitting?", a: "When a model learns the training data (including noise) too well and fails to generalize to new data." },
            { q: "What is Regression?", a: "A type of supervised learning used to predict continuous numerical values (e.g., house prices)." },
            { q: "What is Classification?", a: "A type of supervised learning used to predict categorical labels (e.g., spam vs. not spam)." },
            { q: "What is a Neural Network?", a: "A computational model inspired by the human brain, consisting of layers of interconnected nodes." },
            { q: "What is Gradient Descent?", a: "An optimization algorithm used to minimize the loss function by iteratively moving towards the minimum." },
            { q: "What is Unsupervised Learning?", a: "Training on data without labels to find hidden patterns or structures (e.g., clustering)." },
            { q: "What is a Training Set vs Test Set?", a: "Training set is for building the model; Test set is for evaluating its performance on unseen data." }
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
                }, 300);
            } else {
                updateContent();
            }
        }

        function updateContent() {
            const currentCard = deck[currentIndex];
            questionEl.textContent = currentCard.q;
            answerEl.textContent = currentCard.a;
            progressEl.textContent = `${currentIndex + 1} / ${deck.length}`;
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
                }, 500); 
            } else {
                alert("Deck complete! Great studying.");
                currentIndex = 0;
                renderCard();
            }
        }

        /* --- VISUAL EFFECTS (Parallax) --- */
        function setupParallax() {
            document.addEventListener("mousemove", (e) => {
                const orbs = document.querySelectorAll('.orb');
                const x = (window.innerWidth - e.pageX * 2) / 100;
                const y = (window.innerHeight - e.pageY * 2) / 100;

                orbs.forEach(orb => {
                    const speed = orb.getAttribute('data-speed');
                    const xPos = x * speed;
                    const yPos = y * speed;
                    orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
                });
            });
        }

        // Run the app
        init();

    
