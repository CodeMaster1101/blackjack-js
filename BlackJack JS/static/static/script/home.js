//the whole container, win lose container, your side, other side container, h2 container

//hit button, stand button, deal button
//images, sound effects, track of score and overall result
var matrixmusic = new Audio('static/static/sounds/matrix.mp3');
function matrix()
{
    matrixmusic.play();   
}
function removeMusic()
{
    matrixmusic.pause();
}
var roundScoreWins = 0;
var roundScoreLosses = 0;
var roundScoreDraws = 0;
var defeatSound = new Audio("static/static/sounds/aww.mp3");
var Winsound = new Audio("static/static/sounds/cash.mp3");
document.querySelector('#hit-button').addEventListener('click', HitFunc);
document.querySelector("#deal-button").addEventListener('click',DealFunc);
document.querySelector("#stand-button").addEventListener('click',StandFunc);

var BlackjackCont = 
{
    "you": {"scoreSpan": "#my-score", "div": "#my-box", "score": 0, "Wins": "#wins", "Losses": "#losses", "Draws": "#draws"},
    "dealer": {"scoreSpan": "#dealer-score", "div": "#dealer-box", "score": 0},
    "deck": ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'],
    "cardValue":{'2': 2, '3': 3, '4': 4, '5':5,'6':6,'7':7,'8':8,'9':9,'10':10, 'A':1, 'J':10,'Q':10, 'K':10}
}

const YOU = BlackjackCont["you"];
const DEALER = BlackjackCont["dealer"];
function randomCard()
{
    let randomNum = Math.floor(Math.random()* 13);
    return BlackjackCont["deck"][randomNum];
}
function showCard(activePlayer, card)
{
    var Cardimage = document.createElement("img");
    Cardimage.src = `static/static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(Cardimage);
}

function updateScore(card, activePlayer)
{
    activePlayer["score"] += BlackjackCont["cardValue"][card];
}
function showScore(activePlayer)
{
    document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer['score'];
}

function HitFunc()
{   
    var hitSound = new Audio("static/static/sounds/swish.m4a");
    hitSound.play();
    let card = randomCard();
    showCard(YOU, card);
    updateScore(card, YOU);
    showScore(YOU);
    playerOvercap();
    
}
function DealFunc()
{   
    
    roundResult();
    
}

function StandFunc()
{   
   
   let i = 0;
   while(i<3)
   {
       i++;
       let card = randomCard();
       showCard(DEALER,card);
       updateScore(card, DEALER);
   }
   
    showScore(DEALER);
    dealerOvercap();
   
}

function roundResult()
{   
     
    
        if(YOU["score"] < 21)
    {
        if(YOU["score"] > DEALER["score"])
      {
        Winsound.play();
        roundScoreWins += 1;
        alert("You won the round by having a higher score than the dealer!");
        document.querySelector(YOU["Wins"]).textContent = roundScoreWins;
        YOU["score"] = 0;
        DEALER["score"] = 0;
      }
      else if(YOU["score"] < DEALER["score"])
      {
        defeatSound.play();
        roundScoreLosses += 1;
        alert("You lost the round, the dealer has a bigger score than you!");
        document.querySelector(YOU["Losses"]).textContent = roundScoreLosses;
        YOU["score"] = 0;
        DEALER["score"] = 0;
      }
      else if(YOU["score"] === DEALER["score"])
      {
        roundScoreDraws += 1;
        alert("Its a draw!");
        document.querySelector(YOU["Draws"]).textContent = roundScoreDraws;
        YOU["score"] = 0;
        DEALER["score"] = 0;
      }
    }
      
    }
function resetFunc()
{   
    
    document.querySelector(YOU["scoreSpan"]).textContent = 0;
    document.querySelector(DEALER["scoreSpan"]).textContent = 0;
    let myImages = document.querySelector("#my-box").querySelectorAll("img");
    
    for(let i = 0; i < myImages.length;i++)
    {
        myImages[i].remove();
       
    }
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
    for(let i = 0; i < dealerImages.length;i++)
    {
        dealerImages[i].remove();
    }
}
function dealerOvercap()
{
    if(DEALER["score"] > 21 )
    {
        Winsound.play();
        roundScoreWins += 1;
        alert("You won the round, the dealer went above 21!");
        document.querySelector(YOU["Wins"]).textContent = roundScoreWins;
        YOU["score"] = 0;
        DEALER["score"] = 0;
    } 
}
function playerOvercap()
{
    if(YOU["score"] > 21)
    {
        defeatSound.play();
        roundScoreLosses += 1;
        alert("You lost the round, you went abpve 21!");
        document.querySelector(YOU["Losses"]).textContent = roundScoreLosses;
        YOU["score"] = 0;
        DEALER["score"] = 0;
    }
    else if(YOU["score"]=== 21)
    {
        Winsound.play();
        roundScoreWins += 1;
        alert("You won by reaching a score of 21");
        document.querySelector(YOU["Wins"]).textContent = roundScoreWins;
        YOU["score"] = 0;
        DEALER["score"] = 0;
    } 
}