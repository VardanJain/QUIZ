async function fetchQuizData() {
    const response = await fetch('dataa.json');
    const data = await response.json();
    return data.questions;
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const QuestionElement = document.getElementById("Question");
const AnswerButtons = document.getElementById("Answer");
const NextButton = document.getElementById("next-btn");
const FeedbackElement = document.getElementById("feedback");

let currentQuestionIndex = 0;
let score = 0;

async function startQuiz() {
    const questions = await fetchQuizData();
    shuffleQuestions(questions);
    currentQuestionIndex = 0;
    score = 0;
    NextButton.style.display = "none";
    showQuestion(questions);
}

function showQuestion(questions) {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    QuestionElement.innerHTML = currentQuestion.description;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option.description;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(option, questions));
        AnswerButtons.appendChild(button);
    });
}

function resetState() {
    NextButton.style.display = "none";
    AnswerButtons.innerHTML = "";
    FeedbackElement.innerHTML = "";
}

function selectAnswer(option, questions) {
    const correct = option.is_correct;
    if (correct) {
        FeedbackElement.innerHTML = "Correct! 🎉";
        score++;
    } else {
        FeedbackElement.innerHTML = "Incorrect! ❌";
    }

    const buttons = AnswerButtons.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.disabled = true;
    });

    NextButton.style.display = "block";
    NextButton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions);
        } else {
            QuestionElement.innerHTML = `Quiz Finished! Your score: ${score}/${questions.length}`;
            AnswerButtons.innerHTML = "";
            NextButton.style.display = "none";
        }
    };
}

startQuiz();