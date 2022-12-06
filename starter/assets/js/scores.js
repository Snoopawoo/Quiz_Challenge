//script to retrieve and display High Scores
var scoreBoard = document.querySelector('#highscores')
var clearBtn = document.querySelector('#clear')
var scoreList = JSON.parse(localStorage.getItem('user_highScore'));

//Add Scores to board
scoreBoard.insertAdjacentHTML('beforeend',`
<li>${scoreList[0].user} - ${scoreList[0].uScore}</li>
`);

console.log(scoreList);

//Clear scoreboard function
function clearBoard(){
    localStorage.removeItem('user_highScore')
    location.reload();
};

clearBtn.addEventListener('click',clearBoard);