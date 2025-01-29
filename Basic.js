const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Expand question pool to include more basic programming questions
const allQuestions = [
    { question: "Q. Which of the following is not a CSS box model property?", choices: ["margin", "padding", "border-radius", "border-collapse"], answer: "border-collapse" },
    { question: "Q. Which of the following is not a valid way to declare a function in JavaScript?", choices: ["function myFunction() {}", "let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"], answer: "myFunction: function() {}" },
    { question: "Q. Which of the following is not a JavaScript data type?", choices: ["string", "boolean", "object", "float"], answer: "float" },
    { question: "Q. What is the purpose of the 'this' keyword in JavaScript?", choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", "It is used for comments."], answer: "It refers to the current object." },
    { question: "Q. What does HTML stand for?", choices: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyperlink Text Mark Language"], answer: "Hyper Text Markup Language" },
    { question: "Q. Which of these is not a programming language?", choices: ["Python", "HTML", "Java", "Ruby"], answer: "HTML" },
    { question: "Q. What does CSS stand for?", choices: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
    { question: "Q. Which symbol is used for comments in JavaScript?", choices: ["//", "<!-- -->", "#", "/* */"], answer: "//" },
    { question: "Q. Which keyword is used to define a variable in JavaScript?", choices: ["let", "var", "const", "All of the above"], answer: "All of the above" },
    { question: "Q. How do you declare an array in JavaScript?", choices: ["{}", "()", "[]", "<>"], answer: "[]" }
];

let quizQuestions = []; // This will hold 10 randomly selected questions each time
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Function to select 10 random questions
const getRandomQuestions = () => {
    // Shuffle all questions and select the first 10
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
};

// Function to show questions
const showQuestions = () => {
    const questionDetails = quizQuestions[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    questionDetails.choices.forEach((choice) => {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            document.querySelectorAll('.choice').forEach(choice => choice.classList.remove('selected'));
            choiceDiv.classList.add('selected');
        });
    });

    if (currentQuestionIndex < quizQuestions.length) {
        startTimer();
    }
};

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice && selectedChoice.textContent === quizQuestions[currentQuestionIndex].answer) {
        displayAlert("Correct Answer!");
        score++;
    } else {
        displayAlert(`Wrong Answer! ${quizQuestions[currentQuestionIndex].answer} is the Correct Answer`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
};

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quizQuestions.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
};

// Function to show alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
};

// Function to start timer
const startTimer = () => {
    clearInterval(timerID);
    timeLeft = 15;
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerID);
            displayAlert("Time Up! Moving to next question...");
            checkAnswer();
        }
    };
    timerID = setInterval(countDown, 1000);
};

// Function to stop timer
const stopTimer = () => {
    clearInterval(timerID);
};

// Function to start quiz
const startQuiz = () => {
    score = 0;
    currentQuestionIndex = 0;
    quizOver = false;
    timeLeft = 15;
    scoreCard.textContent = "";
    nextBtn.textContent = "Next";
    container.style.display = "block";
    startBtn.style.display = "none";
    quizQuestions = getRandomQuestions(); // Get a new set of 10 random questions
    showQuestions();
};

// Event listener for start button
startBtn.addEventListener('click', startQuiz);

// Event listener for next button
nextBtn.addEventListener('click', () => {
    if (quizOver) {
        startQuiz();
    } else {
        const selectedChoice = document.querySelector('.choice.selected');
        if (!selectedChoice) {
            displayAlert("Select your answer");
            return;
        }
        checkAnswer();
    }
});
