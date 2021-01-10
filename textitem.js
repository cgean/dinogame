class TextItem extends ColorFigure {

    constructor(ctx, x, y, width, height, text, color, size) {
        super(ctx, x, y, width, height, color);
        this.text = text;
        this.size = size;
    }

    draw() {
        ctx.font = this.size + 'px Verdana';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 0.2;
        ctx.strokeText(this.text, this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}