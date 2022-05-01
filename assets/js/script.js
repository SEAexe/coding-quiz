var sections;
var current;
var timeLeft;
var score;
var questions;
var currentQuestionObj;

var startButtonEl;
var viewHighscoresButtonEl;
var playAgainButtonEl;
var timerEl;
var choicesEl;
var saveScoreEl;
var clearScoresEl;


function init() {

    viewHighscoresButtonEl =  document.querySelector(".view-highscores");
    startButtonEl = document.querySelector(".start-button");
    playAgainButtonEl = document.querySelector(".play-again");
    timerEl = document.querySelector(".timer");
    choicesEl = document.querySelector(".choices");
    saveScoreEl = document.querySelector(".save-score-button");
    clearScoresEl = document.querySelector(".clear-scores");

    timerEl.hidden = true;
    sections = ["welcome", "quiz", "gameover", "highscores"];
    current = "welcome";
    questions = getQuestionsList();

    // listeners
    viewHighscoresButtonEl.addEventListener("click", renderHighscores);
    playAgainButtonEl.addEventListener("click", startQuiz);
    startButtonEl.addEventListener("click", startQuiz);
    choicesEl.addEventListener("click", function(event) {
        if (event.target.nodeName === "BUTTON") {
            checkAnswer(event);
        }
    });

    saveScoreEl.addEventListener("click", function(event) {
        event.preventDefault();
        let highscores = JSON.parse(localStorage.getItem("highscores"));

        if (highscores == null) {
            highscores = [];
        }
        highscores.push(
            {
                name: document.querySelector("#save-score-input").value,
                highscore: score,
            }
        );
        localStorage.setItem("highscores", JSON.stringify(highscores));
        renderHighscores();
    });
    clearScoresEl.addEventListener("click", function(event) {
        document.querySelector(".top-scores").innerHTML = "";        
        localStorage.removeItem("highscores");
        renderHighscores();
    });
}

function hideAllSections() {
    sections.forEach(section => {        
        document.querySelector("#" + section).classList.add("hidden");
    });
}

function renderSection(section) {
    hideAllSections();
    current = section;
    document.querySelector("#" + section).classList.remove("hidden");
}

function renderHighscores() {
    viewHighscoresButtonEl.disabled = true;
    timerEl.hidden = true;

    renderSection("highscores");
    let highscoresListEl = document.querySelector(".top-scores");
    let highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores != null) {
        highscoresListEl.innerHTML = "";
        for (let i = 0; i < highscores.length; i++) {
            let highscoreEl = document.createElement("li");
            highscoreEl.classList.add("list-group-item");
            highscoreEl.textContent = highscores[i].name + " - " + highscores[i].highscore + " points";
            highscoresListEl.appendChild(highscoreEl)
        }
        clearScoresEl.disabled = false;
    } else {
        clearScoresEl.disabled = true;
    }
}

function renderTimeLeft() {
    if (timeLeft < 10) {
        timerEl.classList.replace("alert-primary", "alert-danger");
    } else {
        timerEl.classList.replace("alert-danger", "alert-primary");
    }    
    timerEl.hidden = false;
    timerEl.innerText = "Timer: " + timeLeft + " seconds";
}

function startQuiz() {
    score = 0;
    timeLeft = 60;
    questions = getQuestionsList();
    viewHighscoresButtonEl.disabled = false;
    renderSection("quiz");
    renderTimeLeft();
    renderQuestion();   
    let timerInterval = setInterval(function () {
        timeLeft--;        
        if (timeLeft <= 0) {
            renderGameover();
        }
        if (current !== "quiz" || timeLeft <= 0) {
            clearInterval(timerInterval);
        } else {            
            renderTimeLeft();
        } 
    }, 1000);
}

function renderGameover() {
    timerEl.hidden = true;
    renderSection("gameover");
    if (score >= 0) {
        if (timeLeft >= 0) {
            score += timeLeft;
        }
    } else { 
        score = 0;
    }
    document.querySelector(".final-score").textContent = "You scored " + score + " points!";
}

function renderQuestion() {
    if (questions.length === 0) {        
        renderGameover();
    } else {        
        let randomIndex = Math.floor(Math.random() * questions.length);        
        currentQuestionObj = questions.splice(randomIndex, 1)[0];       
        document.querySelector(".question").innerText = currentQuestionObj.question;        
        choicesEl.innerHTML = "";        
        currentQuestionObj.choices.forEach(choice => {
            let choiceEl = document.createElement("button");
            choiceEl.innerText = choice;
            choiceEl.classList.add("btn", "btn-outline-primary");
            choicesEl.appendChild(choiceEl);
        });
    }
}


function checkAnswer(event) {    
    disableAllChoices();    
    event.target.disabled = false;
    if (event.target.innerText === currentQuestionObj.answer) {        
        score += 10;
        event.target.classList.replace("btn-secondary", "btn-success");
    } else {       
        score -= 5;
        timeLeft -= 10;
        event.target.classList.replace("btn-secondary", "btn-danger");
    }    
    setTimeout(renderQuestion, 0);
}

function disableAllChoices() {
    let allButtons = choicesEl.children;
    for (var i = 0; i < allButtons.length; i++) {
        let button = allButtons[i];
        button.classList.replace("btn-outline-primary", "btn-secondary");
        allButtons[i].disabled = true;
    }
}


function getQuestionsList() {
    return [
        {
            question: "Commonly used data types do NOT include:",
            choices: [
                "strings",
                "booleans",
                "alerts",
                "numbers",
            ],
            answer: "alerts",
        },
        {
            question: "The condition in an if/then statement is enclosed within:",
            choices: [
                "parenthesis",
                "quotes",
                "curly brackets",
                "square brackets",
            ],
            answer: "parenthesis",
        },
        {
            question: "Arrays in JavaScript can be used to store:",
            choices: [
                "numbers and strings",
                "other arrays",
                "booleans",
                "all of the above",
            ],
            answer: "all of the above",
        },
        {
            question: "String values must be enclosed within _____ when being assigned to variables.",
            choices: [
                "commas",
                "quotes",
                "curly brackets",
                "parenthesis",
            ],
            answer: "quotes",
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger:",
            choices: [
                "JavaScript",
                "terminal/bash",
                "for loops",
                "console log",
            ],
            answer: "console log",
        },
    ];
}

init();