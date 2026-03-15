import Character from './character.js';
import Stage from './stage.js';
import ImageFigure from './imagefigure.js';

let canvas;
let ctx;
let width;
let height;
let player;
let stage;
let animation;
let isRunning = false;
let isGameOver = false;
let record = 0;

init();

function init() {
    create();
    cancelAnimationFrame(animation);
    isRunning = true;
    isGameOver = false;
    render();
}

function create() {
    createCanvas();
    createFigures();
}

function createCanvas() {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext("2d");
    width = ctx.canvas.clientWidth;
    height = ctx.canvas.clientHeight;
}

function createFigures() {
    player = new Character(ctx, 50, height - 160, 200, 150, 0.15);
    stage = new Stage(ctx, width, height, player, record);
}

function play() {
    stage.infoGameStatus.pop();
    isRunning = true;
}

function pause() {
    const img = centeredImage(height / 5, height / 5, "img/ui/play.png");
    stage.addInfoGameStatusus(img);
    isRunning = false;
}

function setGameOver() {
    if (player.score > record) {
        record = player.score;
    }
    player.y = height;
    const img = centeredImage(height / 2, height / 6, "img/ui/img_game_over.png");
    stage.addInfoGameStatusus(img);
    isRunning = false;
    isGameOver = true;    
}

function centeredImage(imgWidth, imgHeight, imgName) {
    const x = (width / 2) - (imgWidth / 2);
    const y = (height / 2) - (imgHeight / 2);
    return new ImageFigure(ctx, x, y, imgWidth, imgHeight, imgName);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    animation = requestAnimationFrame(render);
}

function draw() { 
    stage.draw();
}

function update() {
    if (isRunning) {
        stage.update();
        if (player.lives <= 0) {
            setGameOver();
        }
    }
}

function controlState() {
    if (isGameOver){
        init();
    }else{
        isRunning ? pause() : play();
    }
}

document.addEventListener('keydown', (event) => {
    if (isRunning) {        
        if (event.key === 'ArrowUp') {
            player.jump();
        }
        if (event.key === 'ArrowRight') {
            player.attack();
        }
        if (event.key === 'ArrowDown') {
            player.fire();
        }
    }
    if (event.key === ' ') {
        controlState();
    }
 });

 document.addEventListener('click', (event) => {
    controlState();
 });
