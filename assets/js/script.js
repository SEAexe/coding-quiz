var startButton = document.getElementById("start-btn");
var scoreButton = document.getElementById("view-hs");
var timerElement = document.getElementById("timer-count");

var timer;
var timerCount;

var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answer: [
            {text: "strings", correct: false},
            {text: "booleans", correct: false},
            {text: "alerts", correct: true},
            {text: "numbers", correct: false}
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed within:",
        answer: [
            {text: "quotes", correct: false},
            {text: "curly brackets", correct: false},
            {text: "square brackets", correct: false},
            {text: "parenthesis", correct: true}
        ]
    },
    {
        question: "Arrays in Javascript can be used to store:",
        answer: [
            {text: "numbers and strings", correct: false},
            {text: "other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "all of the above", correct: true}
        ]
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answer: [
            {text: "quotes", correct: true},
            {text: "commas", correct: false},
            {text: "curly brackets", correct: false},
            {text: "parenthesis", correct: false}
        ]
    },
    {
        question: "What is the useful tool used during development and debugging for printing content to the debugger?",
        answer: [
            {text: "Javascript", correct: false},
            {text: "Terminal/Bash", correct: false},
            {text: "Console log", correct: true},
            {text: "For loops", correct: false},
        ]
    }
]

function startGame() {
    alert("alert")
}

startButton.addEventListener("click", startGame);
