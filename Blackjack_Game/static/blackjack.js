let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const HITSOUND = new Audio('static/sounds/swish.m4a');
const LOOSESOUND = new Audio('static/sounds/aww.mp3');
const WINSOUND = new Audio('static/sounds/cash.mp3');

document.querySelector('#blackjack-hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-warning-btn').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-danger-btn').addEventListener('click',blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(YOU, card);
        updateScore(YOU, card);
        showScore(YOU);
    }
}
    function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}
function showCard(activePlayer, card){    
    if(activePlayer['score'] <= 21){
        var cardImg = document.createElement('img');
        cardImg.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImg);
        HITSOUND.play();
    }
}
function blackjackDeal(){
    if(blackjackGame['turnsOver']=== true){
        blackjackGame['isStand'] = false;
        
        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        for( let i=0; i < yourImage.length;i++) {
            yourImage[i].remove();
        }
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');
        for( let i=0; i < dealerImage.length;i++) {
            dealerImage[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';    

        blackjackGame['turnsOver'] = false;
    }
}
function updateScore(activePlayer, card){
    // For case Ace card, select value 11 only if sum is less than or equal to 21, otherwise select value 1.
    if(card ==='A'){
        if( (activePlayer['score'] + blackjackGame['cardsMap'][card][1]) <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}
function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
async function dealerLogic(){
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(DEALER, card);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}
function computeWinner(){
    let winner;
    //condition: heigher score than dealer or dealer busts but you aren't.
    if(YOU['score'] <= 21){
        if((YOU['score'] > DEALER['score']) || (DEALER['score']>21)){
            blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    //condition: when you busts and dealer doesn't..
    }else if(YOU['score']> 21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner = DEALER;
    //condition: user and the dealer bust.
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    return winner;
}
function showResult(winner){
    let message, messageColor;
    if(blackjackGame['turnsOver'] === true){
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            WINSOUND.play();
        }else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            LOOSESOUND.play();
        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'yellow';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}