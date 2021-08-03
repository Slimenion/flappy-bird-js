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

//При нажатии на кнопку
document.addEventListener("keyup", moveUp);
document.addEventListener("click", moveUp);

function moveUp() {
    yPos -= 20;
}

//Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1;

//Отрисовываем игру
function drawGame() {
    ctx.drawImage(bg, 0, 0);

    ctx.drawImage(pipeUp, 100, 0);
    ctx.drawImage(pipeBottom, 100, 0 + pipeUp.height + gap);

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;
    requestAnimationFrame(drawGame);
}

pipeBottom.onload = drawGame;
