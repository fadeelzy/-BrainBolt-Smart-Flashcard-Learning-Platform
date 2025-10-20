// Quiz functionality for BrainBolt (Django-integrated)

document.addEventListener("DOMContentLoaded", () => {
    console.log("Flashcards loaded from Django:", flashcardsData);

    const flashcards = Array.isArray(flashcardsData) ? flashcardsData : [];
    const loading = document.getElementById("loading-state");
    const quizCard = document.getElementById("quiz-card");
    const questionEl = document.getElementById("current-question");
    const answerEl = document.getElementById("current-answer");
    const progressBar = document.getElementById("progress-bar");
    const quizProgress = document.getElementById("quiz-progress");
    const correctScore = document.getElementById("correct-score");
    const incorrectScore = document.getElementById("incorrect-score");
    const answerButtons = document.getElementById("answer-buttons");
    const instructionText = document.getElementById("instruction-text");
    const quizComplete = document.getElementById("quiz-complete");

    let current = 0;
    let correct = 0;
    let incorrect = 0;
    let shuffled = [];

    function startQuiz() {
        if (!flashcards.length) {
            loading.innerHTML = "<p>No flashcards found. Add some from your dashboard!</p>";
            return;
        }

        shuffled = [...flashcards].sort(() => Math.random() - 0.5);
        loading.classList.add("hidden");
        quizCard.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion() {
        if (current >= shuffled.length) {
            return finishQuiz();
        }

        const card = shuffled[current];
        questionEl.textContent = card.question;
        answerEl.textContent = card.answer;

        progressBar.style.width = `${((current + 1) / shuffled.length) * 100}%`;
        quizProgress.textContent = `Question ${current + 1} of ${shuffled.length}`;
        answerButtons.classList.add("hidden");
        instructionText.classList.remove("hidden");

        const flashcard = document.getElementById("current-flashcard");
        flashcard.classList.remove("flipped");
    }

    window.flipCard = function () {
        const flashcard = document.getElementById("current-flashcard");
        flashcard.classList.add("flipped");
        answerButtons.classList.remove("hidden");
        instructionText.classList.add("hidden");
    };

    window.answerQuestion = function (isCorrect) {
        if (isCorrect) {
            correct++;
            correctScore.textContent = correct;
        } else {
            incorrect++;
            incorrectScore.textContent = incorrect;
        }

        current++;
        setTimeout(showQuestion, 600);
    };

    function finishQuiz() {
        quizCard.classList.add("hidden");
        quizComplete.classList.remove("hidden");

        const accuracy = Math.round((correct / (correct + incorrect)) * 100) || 0;
        document.getElementById("final-accuracy").textContent = `${accuracy}%`;
        document.getElementById("final-correct").textContent = correct;
        document.getElementById("final-incorrect").textContent = incorrect;
    }

    window.resetQuiz = function () {
        current = 0;
        correct = 0;
        incorrect = 0;
        correctScore.textContent = "0";
        incorrectScore.textContent = "0";
        quizComplete.classList.add("hidden");
        startQuiz();
    };

    startQuiz();
});
