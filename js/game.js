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
