//challenge 1: your age in days
function promptAge(){
    var ageYear = prompt("Enter your birth date year...");
    let daysTotal = ((new Date()).getFullYear() - ageYear)*365;
    var h2 = document.createElement("h2");
    var textOutput = document.createTextNode("You are "+daysTotal +" days old! ");
    h2.setAttribute("id","age-in-days");
    h2.appendChild(textOutput);
    document.getElementById('flex-box-result').appendChild(h2);
}
function reset(){
    document.getElementById('age-in-days').remove();
}
//challenge 1: generate cat and append in div
function generateNewCat(){
    var img = document.createElement("img");
    img.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    var div = document.getElementById("flex-cat-gen");
    div.appendChild(img);
}
// challenge 2: rock, paper, scissor game
 function rpsGame(yourChoice){
     console.log(yourChoice);
     var humanChoice = yourChoice.id;
     var computerChoice = intToRpsChoice(randomToRpsInt()) ;
     var results = decideWinner(humanChoice, computerChoice); // [prob1,prob2]
     var message = finalMessage(results); //{'message':"textmessage", 'color':"anycolor"}
     rpsFrondEnd(humanChoice,computerChoice,message);
 }
 function randomToRpsInt(){
    return Math.floor(Math.random()*3);
 }
 function intToRpsChoice(intChoice){
     return ['rock','paper','scissor'][intChoice];
 }
 function decideWinner(humanChoice, computerChoice){
    var rpsDictionary = {
         'rock':{'scissor':1,'rock':0.5,'paper':0},
         'paper':{'rock':1,'paper':0.5,'scissor':0},
         'scissor':{'paper':1,'scissor':0.5,'rock':0}
    }
    var humanScore = rpsDictionary[humanChoice][computerChoice];
    var computerScore = rpsDictionary[computerChoice][humanChoice];
    return new Array(humanScore,computerScore);
 }
 function finalMessage(results){
    var resultDictionary = {
        0:{'message':'you lost.','color':'red'},
        1:{'message':'You won.', 'color':'green'},
        0.5:{'message':"Its a draw", 'color':'gray'}
    }
    return {'message':resultDictionary[results[0]]['message'],'color':resultDictionary[results[0]]['color']};
 }
 function rpsFrondEnd(humanChoice,computerChoice,finalMessage){
    var imagesDatabase ={
        'rock':  document.getElementById('rock').src,
        'paper':  document.getElementById('paper').src,
        'scissor':  document.getElementById('scissor').src
    };
    //let's remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var computerDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='"+imagesDatabase[humanChoice]+"' id='"+humanChoice+ "' width = 150px height = 150px onclick='rpsGame(this)'>";
    messageDiv.innerHTML= "<h2 style=color:"+finalMessage.color+">"+finalMessage.message +"</h2>";
    computerDiv.innerHTML = "<img src='"+imagesDatabase[computerChoice]+"' id = '"+computerChoice+"' width = 150px height = 150px onclick='rpsGame(this)'>";

    var main_div = document.getElementById('flex-box-rps')
    main_div.appendChild(humanDiv);
    main_div.appendChild(messageDiv);
    main_div.appendChild(computerDiv);
}