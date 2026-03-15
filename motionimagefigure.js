
import ImageFigure from './imagefigure.js';

export default class MotionImageFigure extends ImageFigure {

    constructor(ctx, x, y, width, height, speed, nameImage) {
        super(ctx, x, y, width, height, nameImage);
        this.speed = speed;
    }
    
    update() {
        if (this.x + this.width < 0) {
            this.x = this.posRand(this.ctx.canvas.clientWidth + 2 * this.width, 3 * this.ctx.canvas.clientWidth);
        }
        this.x -= this.speed;
    }

    restart() {
        this.x = this.posRand(this.ctx.canvas.clientWidth + 2 * this.width, 3 * this.ctx.canvas.clientWidth);
    }

    posRand(min, max) {
        return Math.random() * (max - min) + min;
    }
}