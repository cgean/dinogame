export default class ImageFigure {

    constructor(ctx, x, y, width, height, nameImage) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = this.createImage(nameImage);
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    createImage(imgSrc) {
        const img = new Image();
        img.src = imgSrc;
        return img;
    }
}