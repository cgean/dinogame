class Stage {
    
    constructor() {
        this.figures = [];
        this.createFigures();
    }

    createFigures() {
        let baseSpeed = 5;
        this.addLayerBackground(25, 300, 350, "#0099cc", 0.1);
        this.addLayerBackground(50, 200, 300, "#00b359", 0.2);
        this.addLayerBackground(100, 70, 150, "#00ff00", baseSpeed);
        let ground = new ColorFigure(ctx, 0, height - 60, width, height, "#ccff66");
        this.figures.push(ground);
        let stone = new MotionImageFigure(ctx, posRand(width, 2 * width), height - 90, 80, 70, baseSpeed, "img/stage/rock_0.png");
        let cactus = new MotionImageFigure(ctx, posRand(width, 2 * width), height - 90, 80, 70, baseSpeed, "img/stage/cactus_0.png");
        this.figures.push(stone);
        this.figures.push(cactus);
    }

    addLayerBackground(maxItens, minHeight, maxHeight, color, speed) {
        const itemWidth = 100;
        for (let i = 0; i <= maxItens; i++) {
            const itemHeight = posRand(minHeight, maxHeight);
            const x = i * itemWidth / 2;
            const y = height - itemHeight / 2.5;
            this.figures.push(new MotionColorFigure(ctx, x, y, itemWidth, itemHeight, color, speed));
        }
    }
}  