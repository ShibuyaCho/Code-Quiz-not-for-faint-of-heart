var questionsContainerEl = document.querySelector("#questions");
var promptEl = document.querySelector("#question-prompt");
var choicesEl = document.querySelector("#question-choices");
var finalScoreEl = document.querySelector("#final-score");
var timerEl = document.querySelector("#countdown");
var feedbackEl = document.getElementById("right-wrong");
var highScoreScreenEl = document.getElementById("highscore-input");
var initialsEl = document.getElementById("player");
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit")
var currentQuestion = 0;
var time = 100;
var timer;

var questions = [
    {
        prompt: "Which is not a JavaScript data type?",
        choices: ["Numbers", "Boolean", "Alerts", "String"],
        answer: "Alerts"
    },
    {
        prompt: "An array uses?",
        choices: [ "Parantheses","Curly brackets", "Quotations", "Square brackets"],
        answer: "Square brackets"
    },
    {
        prompt: "Which is the assignment operator?",
        choices: [ "==","=", "++", "!"],
        answer: "="
    },
    {
        prompt: "Functions can be nested?",
        choices: ["True", "False"],
        answer: "True"
    },
    {
        prompt: "You can reasign a Const?",
        choices: ["True", "False"],
        answer: "False"
    }
];
var startQuiz = function() {
    var startInfoEl = document.querySelector(".start-info");
    startInfoEl.setAttribute("class", "hide");
    questionsContainerEl.removeAttribute("class");
    timer = setInterval(clock, 1000);
    timerEl.textContent = time;
    displayQuestion();
}

var displayQuestion = function() {
    var questionIndex = questions[currentQuestion];
    promptEl.textContent = questionIndex.prompt;
    choicesEl.innerHTML = "";

    questionIndex.choices.forEach(function(choices, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice btn btn-outline-primary")
        choiceBtn.setAttribute("value", choices);
        choiceBtn.textContent = i + 1 + ". " + choices;
        choiceBtn.onclick = choiceClick;
        choicesEl.appendChild(choiceBtn);
    });
};

var choiceClick = function() {
 
    if (this.value !== questions[currentQuestion].answer) {
        time -= 10;

        timerEl.textContent = time;

        feedbackEl.textContent = "Wrong!";
    } else {
        feedbackEl.textContent = "Correct!";
    };

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
    currentQuestion++;

    setTimeout(() => {
        if (currentQuestion === questions.length) {
            endQuiz();
    } else {
        displayQuestion();
    };
    }, 1000);
};
var clock = function() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        endQuiz();
    }
};

var endQuiz = function() {
    clearInterval(timer);

    questionsContainerEl.setAttribute("class", "hide");

    highScoreScreenEl.removeAttribute("class");

    finalScoreEl.textContent = time;
};

var saveScore = function() {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        var userScore = {
            score: time,
            initials: initials
        };
        highscores.push(userScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "highscores.html";
        window.location.reload();
    };
};
submitBtn.onclick = saveScore;
startBtn.onclick = startQuiz;