
let stage = 0;

const answers = [
"ぱんだ",
"ひよこ",
"パイ",
"にじ",
"dbu"
];

const arrows = ["↑","↓","↑","↓","↑"];

function checkAnswer(){

let input = document.getElementById("answer").value;

if(input === answers[stage]){

stage++;

if(stage === 5){

document.getElementById("game").style.display="none";
document.getElementById("tiltArea").style.display="block";
startTiltPuzzle();

return;

}

document.getElementById("message").innerText =
"天の声：" + arrows[stage-1];

}else{

document.getElementById("message").innerText =
"違うようだ…";

}

}

let sequence = ["up","down","up","down","up"];
let step = 0;

function startTiltPuzzle(){

if (typeof DeviceOrientationEvent.requestPermission === "function") {

DeviceOrientationEvent.requestPermission()
.then(permissionState => {
if (permissionState === "granted") {
window.addEventListener("deviceorientation", handleTilt);
}
})
.catch(console.error);

} else {

window.addEventListener("deviceorientation", handleTilt);

}

}

function handleTilt(e){

let tilt = e.beta;

if(tilt < -30 && sequence[step] === "up"){

step++;
showCrack();

}

if(tilt > 30 && sequence[step] === "down"){

step++;
showCrack();

}

if(step === sequence.length){

showFinal();

}

}

function showCrack(){

let crack = document.getElementById("crack");

crack.src = "images/crack"+step+".png";

}

function showFinal(){

document.getElementById("tiltArea").innerHTML = `
<h2>宝箱が開いた！</h2>

<img src="images/final.png">

<p>そこには文字が書かれている</p>

<input id="finalAnswer" placeholder="答え">

<button onclick="clearGame()">送信</button>
`;

}

function clearGame(){

let a = document.getElementById("finalAnswer").value;

if(a === "adventurer"){

alert("クリア！");

}else{

alert("違う");

}

}
