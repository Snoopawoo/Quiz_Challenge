//Declaring variables
var activeQuestionIndex = 0;
var numberofQuestions = questions.length;
var counter = 0;
var questionBox = document.querySelector('#questions');
var questionLine = document.querySelector('#question-title');
var choiceList = document.querySelector('#choices');
var startScreen = document.querySelector('#start-screen');
var startBtn = document.querySelector('#start');
var submitBtn = document.querySelector('#submit')
var feedback = document.querySelector('#feedback');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var time = 90;
var timeLeft = document.querySelector('#time')
victory = 0;
timeLeft.innerText = time;

//Function to start quiz
function startQuiz() {
    startScreen.classList.add('hide');

//Making timer and linking it to gameEnd function
var timer = setInterval(function (){
    time--;

    if (time === 0) {
        clearTimeout(timer);
        gameEnd();
    }
    timeLeft.innerText = time;

    if (victory === 1) {
        clearTimeout(timer);
        gameEnd();
    }
}, 1000);

    nextQuestion();
};

//Function to prompt questions
function nextQuestion() {

    //sets the counter to a random index to show the indexed question
    activeQuestionIndex = Math.floor(Math.random()*numberofQuestions);
    var activeQuestion = questions[activeQuestionIndex];
    var choices = activeQuestion.choices;

    choiceList.innerHTML = '';

    //Shows the active question
    questionLine.innerText = activeQuestion.question;
    for(var i = 0; i < choices.length; i++) {
        var choice = choices[i];
        var isTrue = activeQuestion.answer === choice;

        choiceList.insertAdjacentHTML('beforeend',`
        <button data-correct=${isTrue}>${choice}</button>
        `);
    }

    questionBox.classList.remove('hide');
    feedback.innerHTML = '';
    feedback.classList.add('hide');
    counter ++;
}

//Function to end the game and give score
function gameEnd(){
    questionBox.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.innerHTML = time;

}

//Function to check for correct answer, cound the number of questions and call for the next question
function checkCorrect(event) {
    var state = event.target.dataset.correct;

    //shows if the answer is correct or not and acts accordingly
    if(state == 'true'){
        var audioGood = new Audio('assets/sfx/correct.wav');
        audioGood.play();
        feedback.classList.remove('hide');
        feedback.innerHTML = 'Correct';
    } 
    else {
        var audioBad = new Audio('assets/sfx/incorrect.wav');
        audioBad.play();
        feedback.classList.remove('hide');
        feedback.innerHTML = 'Wrong';
        if(time >= 11){
            time -= 10;
        }
        else{
            time = 1
        };
        
    };

    //Deciding if the number of questins answered reaches the requirement
    if(counter >= 5){
        victory = 1;
        return;
    };

    //calls for the next question with a small delay 
    var reset = setInterval(function (){
        clearTimeout(reset);
        nextQuestion();

    }, 300);
    
};

//Add final score to Scoreboard (local storage)
var highScore= [{}];
var highScoreall= [{}];
var user;
var uScore;

function scoreValues(){
    window.location.href = "highscores.html";
    highScoreall = JSON.parse(localStorage.getItem('user_highScore'));
    console.log(highScoreall);
    user = document.querySelector('#initials').value;
    highScore[0].user = user;
    console.log(highScore);
    uScore = time;
    highScore[0].uScore = uScore;
    console.log(highScore);
    Array.prototype.push.apply(highScore,highScoreall);
    console.log(highScore);
    localStorage.setItem('user_highScore', JSON.stringify(highScore));
};

//Event listeners
choiceList.addEventListener('click', checkCorrect);
startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', scoreValues);
