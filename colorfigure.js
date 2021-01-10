class ColorFigure {
    
    constructor(ctx, x, y, width, height, color) {
        this.ctx = ctx;    
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        this.ctx.beginPath();
        this.setContextForm();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    setContextForm() {
        this.ctx.rect(this.x, this.y, this.width, this.height)
    }

    update() {};    
}