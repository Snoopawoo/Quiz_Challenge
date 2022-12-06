//script to retrieve and display High Scores
var scoreBoard = document.querySelector('#highscores')
var clearBtn = document.querySelector('#clear')
var scoreList = JSON.parse(localStorage.getItem('user_highScore'));

//Add Scores to board
for(i = 0; i < scoreList.length; i++){
scoreBoard.insertAdjacentHTML('beforeend',`
<li>${scoreList[i].user} - ${scoreList[i].uScore}</li>
`);
}
console.log(scoreList);

//Clear scoreboard function
function clearBoard(){
    localStorage.removeItem('user_highScore')
    location.reload();
};

clearBtn.addEventListener('click',clearBoard);