import ColorFigure from './colorfigure.js';

export default class TextItem extends ColorFigure {

    constructor(ctx, x, y, width, height, text, color, size) {
        super(ctx, x, y, width, height, color);
        this.text = text;
        this.size = size;
    }

    draw() {
        this.ctx.font = this.size + 'px Verdana';
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 0.2;
        this.ctx.strokeText(this.text, this.x, this.y);
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, this.x, this.y);
    }
}