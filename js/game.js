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

//создаем рекорды
var score = 0;
if (localStorage.getItem("maxScore") == null) {
    localStorage.setItem("maxScore", 0);
}

//При нажатии на кнопку
document.addEventListener("keyup", moveUp);
document.addEventListener("click", moveUp);

function moveUp() {
    yPos -= 25;
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

//Отрисовываем игру
function drawGame() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.clientWidth,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            });
        }

        if (
            (xPos + bird.width >= pipe[i].x &&
                xPos <= pipe[i].x + pipeUp.width &&
                (yPos <= pipe[i].y + pipeUp.height ||
                    yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
            yPos + bird.height >= cvs.height - fg.height
        ) {
            location.reload(); //перезагрузка страницы
        }
        if (pipe[i].x == 5) {
            score++;
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
        150,
        cvs.height - 20
    );

    requestAnimationFrame(drawGame);
}

pipeBottom.onload = drawGame;
