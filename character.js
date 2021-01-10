class Character extends MotionColorFigure {

    constructor(ctx, x, y, width, height, speed) {
        super(ctx, x, y, width, height, "black", speed);
        this.initialY = y;
        this.initialX = x;
        this.imageFrameIndex = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.7;
        this.attacking = false;
        this.jumping = false;
        this.collisionInterval = 500;
        this.timerCollisionState;        
        this.getImages('purple');
        this.images = this.imagesRun;
        this.score = 0;
        this.lives = 3;
        this.isColliding = false;
        this.scored = false;
        this.figures = [];
        this.ctxWidth = ctx.canvas.clientWidth;
        this.ctxHeight = ctx.canvas.clientHeight;
        this.fires = 5;
    }

    draw() {
        for (let i = 0; i < this.figures.length; i++) {
            this.figures[i].draw();
        }
        const ind = Math.floor(this.imageFrameIndex) % this.images.length;
        ctx.drawImage(this.images[ind], this.x, this.y, this.width, this.height);
    }

    update() {
        this.updateImageFrameIndex();
        this.updateY();
        this.updateX();
        this.checkCollision(figures.filter(f => f instanceof MotionImageFigure));
    }

    jump() {
        if (this.y >= this.initialY) {
            this.velocityY = -17;
            this.images =  this.imagesJump;
            this.jumping = true;
        }
    }
    
    attack() {
        if (this.x >= this.initialX) {
            this.velocityX = 15;
            this.images =  this.imagesAttack;
            this.attacking = true;
        }
    }

    fire() {
        if (this.fires > 0) {
            let img = new MotionImageFigure(ctx, this.x + this.width / 2, 
                this.y + 50, 40, 30, -5, 'img/fire-ball.png');
            this.figures.push(img);
            this.fires--;
        }
    }

    getImages(basePath) {
        this.imagesRun = this.getFigureImages(8, 'img/player/' + basePath + '/run_');
        this.imagesJump = this.getFigureImages(12, 'img/player/' + basePath +'/jump_');
        this.imagesAttack = this.getFigureImages(7, 'img/player/' + basePath +'/attack_');
    }

    checkCollision(barriers) {
        for (let i = 0; i < barriers.length; i++) {
            if (this.isCollision(this, barriers[i]) && !this.isColliding) {
                barriers[i].restart();
                this.setCollisionState();
            }
            if (this.isScore(barriers[i]) && !this.isColliding && !this.scored) {
                this.score++;
            }
        }
        if (this.isTimeoutIntervalCollision()) {
            this.lives--;
            this.setDefaultState();
            this.isColliding = false;
        }
    }

    checkCollisionFire(item, barriers) {
        for (let i = 0; i < barriers.length; i++) {
            if (this.isCollision(item, barriers[i])) {
                this.score++;
                barriers[i].restart();
            }
        }        
    }

    isCollision(item, barrier) {
        const midX = item.x + item.width / 2;
        const midY = item.y + item.height / 2;
        const barrierLeft = barrier.x;
        const barrierRight = barrier.x + barrier.width;
        return midX >= barrierLeft && midX <= barrierRight && midY >= barrier.y;
    }
    
    isScore(barrier) {
        if ((barrier.x + barrier.width < this.x) && !this.isColliding) {
            return true;
        }
        return false;
    }

    isTimeoutIntervalCollision() {
        return this.timerCollisionState && 
        new Date() - this.timerCollisionState.getTime() >= this.collisionInterval;
    }

    setCollisionState() {
        this.getImages('red');
        this.images = this.imagesJump;
        this.timerCollisionState = new Date();
        this.isColliding= true;
    }

    setDefaultState(){
        this.getImages('purple');
        this.timerCollisionState = null;
    }

    getFigureImages(maxFrames, namePefix) {
        const figures = [];
        for(let i = 0; i < maxFrames; i++) {
            const img = new Image();
            img.src = namePefix + i + '.png';
            figures.push(img);
        }
        return figures;
    }

    updateImageFrameIndex() {
        this.imageFrameIndex += this.speed;
    }

    updateY() {
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        if (this.y > this.initialY) {
            this.y = this.initialY;
            this.images =  this.attacking ? this.imagesAttack : this.imagesRun;
            this.jumping = false;
        }
        this.updateFiguresY();
    }

    updateX() {
        this.x += this.velocityX;
        this.velocityX -= this.gravity;
        if (this.x < this.initialX) {
            this.x = this.initialX;
            this.images = this.jumping ? this.imagesJump : this.imagesRun;
            this.attacking = false;
        }
        this.updateFiguresX();  
    }

    updateFiguresX() {
        this.figures = this.figures.filter((fig) => {
            return fig.x <= this.ctxWidth;
          });
        for (let i = 0; i < this.figures.length; i++) {
            this.checkCollisionFire(this.figures[i], figures.filter(f => f instanceof MotionImageFigure));
            this.figures[i].x += 3;    
        }        
    }

    updateFiguresY() {
        for(let i = 0; i < this.figures.length; i++) {
            if (this.figures[i].y < this.ctxHeight - 60)  {
                this.figures[i].y += 1;
            }
        }
    }
}