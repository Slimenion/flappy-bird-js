//подключаем canvas
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//подключаем изоюражения для игры
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

//подключаем звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
var gameLose = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
gameLose.src = "audio/gameLose.mp3";

//создаем рекорды
var score = 0;
if (localStorage.getItem("maxScore") == null) {
    localStorage.setItem("maxScore", 0);
}

//При нажатии на кнопку
document.addEventListener("keyup", moveUp);
document.addEventListener("click", moveUp);

//Делаем правильный рандом
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
    fly.play();
}

// Создаем трубы
var pipe = [];

pipe[0] = {
    x: cvs.clientWidth,
    y: 0,
};

//Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

var flagGameLose = 0;

//Отрисовываем игру
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
                gameLose.play();
                alert(
                    `Вы проиграли. \nСчет этой игры: ` +
                        score +
                        `\nДля того чтобы попробовать снова перезагрузите страницу.`
                );

                flagGameLose = 1;
            }
        }
        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
            if (score > localStorage.getItem("maxScore")) {
                localStorage.setItem("maxScore", score);
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
        "MaxScore: " + localStorage.getItem("maxScore"),
        140,
        cvs.height - 20
    );

    requestAnimationFrame(drawGame);
}

pipeBottom.onload = drawGame;
