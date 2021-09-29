//connect the canvas
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

if (localStorage.getItem("soundMute") == 1) {
    document.getElementById("sound").innerHTML = "Turn on sound";
}

//connect images for the game
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/background.png";
fg.src = "img/foreground.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var gap = 90;

//connect sound files
var fly = new Audio();
var score_audio = new Audio();
var gameLose = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
gameLose.src = "audio/gameLose.mp3";

//create records
var score = 0;
if (localStorage.getItem("BobrGamesFlappyBirdMaxScore") == null) {
    localStorage.setItem("BobrGamesFlappyBirdMaxScore", 0);
}

//By pressing the button
document.addEventListener("keyup", moveUp);
document.addEventListener("click", moveUp);
document.getElementById("info").addEventListener("click", info);
document.getElementById("sound").addEventListener("click", sound);

function sound() {
    if (localStorage.getItem("soundMute") == null) {
        localStorage.setItem("soundMute", 1);
        document.getElementById("sound").innerHTML = "Turn on sound";
    } else {
        localStorage.removeItem("soundMute");
        document.getElementById("sound").innerHTML = "Turn off the sound";
    }
}

function info() {
    alert(`Flappy Bird game
    the keyboard can be used on the computer
    the touch works on the phone
    Created by Bobrgames 2021
    All rights not reserved.`);
}

//Making the right random
function getRandomIntInclusive(min, max) {
    if (max > 0) {
        console.log("max: " + max);
        return -20;
    }
    if (min < -240) {
        console.log("min: " + min);
        return -180;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    var res = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(res);
    return res; //Максимум и минимум включаются
}

function moveUp() {
    yPos -= 25;
    if (localStorage.getItem("soundMute") == null) fly.play();
}

//Create pipes
var pipe = [];

pipe[0] = {
    x: cvs.clientWidth,
    y: 0,
};

//Bird position
var xPos = 10;
var yPos = 150;
var grav = 1.5;

var flagGameLose = 0;

//Rendering the game
function drawGame() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        if (flagGameLose == 0) {
            pipe[i].x--;
        }
        var delta = -(
            Math.floor(Math.random() * (pipe[i].y + 30 - pipe[i].y - 10 + 1)) +
            pipe[i].y
        );
        if (delta > 0) {
            delta -= 60;
        }
        if (delta < -200) {
            delta += 60;
        }
        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.clientWidth,
                y: delta,
            });
        }

        if (
            (xPos + bird.width >= pipe[i].x &&
                xPos <= pipe[i].x + pipeUp.width &&
                (yPos <= pipe[i].y + pipeUp.height ||
                    yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
            yPos + bird.height >= cvs.height - fg.height
        ) {
            if (flagGameLose == 0) {
                if (localStorage.getItem("soundMute") == null) gameLose.play();
                alert(
                    `You lose. \n This game score: ` +
                        score +
                        `\nTo try again, reload the page.`
                );

                flagGameLose = 1;
            }
        }
        if (pipe[i].x == 5) {
            score++;
            if (localStorage.getItem("soundMute") == null) score_audio.play();
            if (score > localStorage.getItem("BobrGamesFlappyBirdMaxScore")) {
                localStorage.setItem("BobrGamesFlappyBirdMaxScore", score);
            }
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    ctx.fillText(
        "MaxScore: " +
            localStorage.getItem("BobrGamesFlappyBirdMaxScore"),
        140,
        cvs.height - 20
    );

    requestAnimationFrame(drawGame);
}

pipeBottom.onload = drawGame;
