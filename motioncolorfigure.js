import ColorFigure from './colorfigure.js';

export default class MotionColorFigure extends ColorFigure {

    constructor(ctx, x, y, width, height, color, speed) {
        super(ctx, x, y, width, height, color);
        this.speed = speed;
    }

    setContextForm() {
        let radius = this.height / 2;
        this.ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    }

    update() {
        if (this.x + this.width < 0) {
            this.x = this.posRand(this.ctx.canvas.clientWidth + 2 * this.width, 3 * this.ctx.canvas.clientWidth);
        }
        this.x -= this.speed;
    }

    posRand(min, max) {
        return Math.random() * (max - min) + min;
    }
}