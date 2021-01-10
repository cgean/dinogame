let canvas;
let ctx;
let width;
let height;
let figures = [];
let player;
let animation;
let isRunning = false;
let score;
let lives;
let fires;
let isGameOver = false;
let record = 0;

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
    figures = new Stage().figures;
    player = new Character(ctx, 50, height - 160, 200, 150, 0.15);
    score = new TextItem(ctx, 15, 25, 50, 25, 'Score: ' + player.score, 'yellow', 15);
    lives = new TextItem(ctx, 15, 42, 50, 25, 'Lives: ' + player.lives, 'yellow', 15);
    fires = new TextItem(ctx, 15, 59, 50, 25, 'Fires: ' + player.fires, 'yellow', 15);
    itemRecord = new TextItem(ctx, width - 100, 25, 50, 25, 'Record: ' + record, 'yellow', 15);
    figures.push(player);
    figures.push(itemRecord);
}

function play() {
    figures.pop();
    isRunning = true;
}

function pause() {
    const img = centeredImage(height / 5, height / 5, "img/ui/play.png");
    figures.push(img);
    isRunning = false;
}

function setGameOver() {
    if (player.score > record) {
        record = player.score;
    }
    player.y = height;
    const img = centeredImage(height / 2, height / 6, "img/ui/img_game_over.png");
    figures.push(img);
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
    figures.forEach(function(f) {
        f.draw();
    });
    score.draw();
    lives.draw();
    fires.draw();
}

function update() {
    if (isRunning) {
        figures.forEach(function(f) {
            f.update();
        });
        if (player.lives <= 0) {
            setGameOver();
        }
        score.text =  'Score: ' + player.score;
        lives.text =  'Lives: ' + player.lives;
        fires.text =  'Fires: ' + player.fires;
        record.text =  'Record: ' + record;
    }
}

function controlState() {
    if (isGameOver){
        init();
    }else{
        isRunning ? pause() : play();
    }
}

function posRand(min, max) {
    return Math.random() * (max - min) + min;
}

function createImage(imgSrc) {
    const img = new Image();
    img.src = imgSrc;
    return img;
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