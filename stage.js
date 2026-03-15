
import MotionColorFigure from "./motioncolorfigure.js";
import MotionImageFigure from "./motionimagefigure.js";
import ColorFigure from "./colorfigure.js";
import TextItem from "./textitem.js";

export default class Stage {
    
    constructor(ctx, width, height, player, record) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.record = record;
        this.infoScore  = new TextItem(ctx, 15, 25, 50, 25, 'Score: ' + player.score, 'yellow', 15);
        this.infoLives = new TextItem(ctx, 15, 42, 50, 25, 'Lives: ' + player.lives, 'yellow', 15);
        this.infoFires = new TextItem(ctx, 15, 59, 50, 25, 'Fires: ' + player.fires, 'yellow', 15);
        this.infoRecord = new TextItem(ctx, width - 100, 25, 50, 25, 'Record: ' + record, 'yellow', 15);
        this.infoGameStatus = [];
        this.backgroundItems = [];
        this.obstacles = [];
        this.create();
    }

    create() {
        let baseSpeed = 5;
        this.addLayerBackground(25, 300, 350, "#0099cc", 0.1);
        this.addLayerBackground(50, 200, 300, "#00b359", 0.2);
        this.addLayerBackground(100, 70, 150, "#00ff00", baseSpeed);        
        const ground = new ColorFigure(this.ctx, 0, this.height - 60, this.width, this.height, "#ccff66");
        const stone = new MotionImageFigure(this.ctx, this.posRand(0, this.width), this.height - 90, 80, 70, baseSpeed, "img/stage/rock_0.png");
        const cactus = new MotionImageFigure(this.ctx, this.posRand(0, this.width), this.height - 90, 80, 70, baseSpeed, "img/stage/cactus_0.png");
        this.backgroundItems.push(ground);
        this.obstacles.push(stone);
        this.obstacles.push(cactus);
    }

    addLayerBackground(maxItens, minHeight, maxHeight, color, speed) {
        const itemWidth = 100;
        for (let i = 0; i <= maxItens; i++) {
            const itemHeight = this.posRand(minHeight, maxHeight);
            const x = i * itemWidth / 2;
            const y = this.height - itemHeight / 2.5;
            this.backgroundItems.push(new MotionColorFigure(this.ctx, x, y, itemWidth, itemHeight, color, speed));
        }
    }

    posRand(min, max) {
        return Math.random() * (max - min) + min;
    }

    addInfoGameStatusus(img) {
        this.infoGameStatus.push(img);
    }

    draw() {
        this.backgroundItems.forEach(function(f) {
            f.draw();
        });
        this.obstacles.forEach(function(f) {
            f.draw();
        });
        if (this.player) {
            this.player.draw();
        }
        if (this.infoGame) {
            this.infoGame.draw();
        }
        this.infoScore.draw();
        this.infoLives.draw();
        this.infoFires.draw();
        this.infoRecord.draw();
        this.infoGameStatus.forEach(function(f) {
            f.draw();
        });
    }

    update() {
        this.backgroundItems.forEach(function(f) {
            f.update();
        });
        this.obstacles.forEach(function(f) {
            f.update();
        });
        if (this.player) {
            this.player.update(this.obstacles);
        }
        this.infoScore.text =  'Score: ' + this.player.score;
        this.infoLives.text =  'Lives: ' + this.player.lives;
        this.infoFires.text =  'Fires: ' + this.player.fires;
        this.infoRecord.text =  'Record: ' + this.record;
        this.infoGameStatus.forEach(function(f) {
            f.update();
        }); 
    }       
}