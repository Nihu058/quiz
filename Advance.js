const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Advanced question pool
const allQuestions = [
    { question: "Q. What will be the output of the following code: console.log(2 + '2' - 1);", choices: ["21", "22", "3", "NaN"], answer: "21" },
    { question: "Q. Which of the following does not create a closure in JavaScript?", choices: ["Inner function accessing an outer variable", "Using var in a loop", "A global function", "A function returning a function"], answer: "A global function" },
    { question: "Q. Which JavaScript method is used to call a function with a specific 'this' context?", choices: ["bind()", "apply()", "call()", "All of the above"], answer: "All of the above" },
    { question: "Q. What is the purpose of the 'await' keyword in JavaScript?", choices: ["To pause function execution", "To resolve promises", "To wait for a promise", "All of the above"], answer: "All of the above" },
    { question: "Q. What will be the output of the following code: [1, 2, 3].map((num) => num * 2);", choices: ["[1, 4, 6]", "[2, 4, 6]", "[1, 2, 3]", "[2, 3, 4]"], answer: "[2, 4, 6]" },
    { question: "Q. In JavaScript, what does 'setTimeout(() => console.log('Hi'), 0);' do?", choices: ["Executes immediately", "Prints 'Hi' after 0 milliseconds", "Queues function after current event loop", "Throws an error"], answer: "Queues function after current event loop" },
    { question: "Q. How can you prevent an object from being modified in JavaScript?", choices: ["Object.seal()", "Object.freeze()", "Both of the above", "None of the above"], answer: "Both of the above" },
    { question: "Q. What will be the output of 'console.log(typeof NaN);' in JavaScript?", choices: ["NaN", "Number", "Undefined", "Object"], answer: "Number" },
    { question: "Q. Which function is used to serialize an object into a JSON string in JavaScript?", choices: ["JSON.parse()", "JSON.stringify()", "parseJSON()", "Object.toJSON()"], answer: "JSON.stringify()" },
    { question: "Q. In the context of async programming, what does 'Promise.all()' do?", choices: ["Executes promises in series", "Rejects immediately if any promise rejects", "Resolves with array of results", "Both b and c"], answer: "Both b and c" },
    { question: "Q. Which of the following keywords creates block-scoped variables in JavaScript?", choices: ["let", "var", "const", "Both a and c"], answer: "Both a and c" },
    { question: "Q. What will the following code output: console.log([] + []);", choices: ["Empty array", "Empty string", "undefined", "NaN"], answer: "Empty string" },
    { question: "Q. How does JavaScript handle multiple promises in 'Promise.race()'?", choices: ["Rejects if any rejects", "Resolves after all resolve", "Settles with first settled promise", "None of the above"], answer: "Settles with first settled promise" },
    { question: "Q. Which of the following methods executes a function after all promises have settled?", choices: ["Promise.any()", "Promise.all()", "Promise.allSettled()", "Promise.resolve()"], answer: "Promise.allSettled()" },
    { question: "Q. How do you stop event bubbling in JavaScript?", choices: ["event.preventDefault()", "event.stopPropagation()", "event.cancelBubble", "All of the above"], answer: "event.stopPropagation()" }
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
