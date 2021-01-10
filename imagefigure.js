class ImageFigure {

    constructor(ctx, x, y, width, height, nameImage) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = createImage(nameImage);
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}