const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Intermediate question pool
const allQuestions = [
    { question: "Q. Which method is used to add new elements to the end of an array in JavaScript?", choices: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
    { question: "Q. In JavaScript, what does '===’ operator check?", choices: ["Equality without type conversion", "Equality with type conversion", "Only data type", "None of the above"], answer: "Equality without type conversion" },
    { question: "Q. Which of the following is a way to create an object in JavaScript?", choices: ["object()", "Object.create()", "new Object()", "Both b and c"], answer: "Both b and c" },
    { question: "Q. Which function is used to parse a string to an integer in JavaScript?", choices: ["parseInt()", "parseString()", "Number()", "None of the above"], answer: "parseInt()" },
    { question: "Q. Which JavaScript keyword is used to define a constant?", choices: ["let", "var", "const", "constant"], answer: "const" },
    { question: "Q. What is the output of 'typeof NaN' in JavaScript?", choices: ["Number", "Object", "String", "Undefined"], answer: "Number" },
    { question: "Q. How do you write a JavaScript arrow function?", choices: ["let f = function() => {}", "let f = () => {}", "function() => {}", "let f => () => {}"], answer: "let f = () => {}" },
    { question: "Q. Which of the following is used to handle asynchronous operations in JavaScript?", choices: ["Promise", "SetTimeout", "Fetch", "Both a and c"], answer: "Both a and c" },
    { question: "Q. What will '2' + 2 evaluate to in JavaScript?", choices: ["22", "4", "NaN", "Syntax Error"], answer: "22" },
    { question: "Q. Which method can be used to filter an array in JavaScript?", choices: [".map()", ".filter()", ".reduce()", ".find()"], answer: ".filter()" },
    { question: "Q. What will be the output of 'console.log(typeof null)' in JavaScript?", choices: ["Object", "Null", "Undefined", "Error"], answer: "Object" },
    { question: "Q. How do you declare a default parameter in a JavaScript function?", choices: ["function(a=1) {}", "function(a:1) {}", "function(a:default) {}", "None of the above"], answer: "function(a=1) {}" },
    { question: "Q. Which loop will run at least once regardless of the condition?", choices: ["for loop", "while loop", "do-while loop", "forEach loop"], answer: "do-while loop" },
    { question: "Q. Which statement is used to handle errors in JavaScript?", choices: ["try...catch", "if...else", "throw", "break"], answer: "try...catch" },
    { question: "Q. How can you convert a JSON string into a JavaScript object?", choices: ["JSON.parse()", "JSON.stringify()", "parseJSON()", "None of the above"], answer: "JSON.parse()" }
];

let quizQuestions = []; // This will hold 10 randomly selected questions each time
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Function to select 10 random questions
const getRandomQuestions = () => {
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
