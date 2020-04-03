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
//challenge 2: generate cat and append in div
function generateNewCat(){
    var img = document.createElement("img");
    img.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    var div = document.getElementById("flex-cat-gen");
    div.appendChild(img);
}