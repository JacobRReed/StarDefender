function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.drawEnemy = function(tick, ctx, x, y, currentHealth, maxHealth) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
    ctx.fillStyle = "green";
    ctx.fillRect(x, y - 2, this.frameWidth * this.scale * (currentHealth / maxHealth), 5);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y - 2, this.frameWidth * this.scale, 5);
}

Animation.prototype.drawDefender = function(ctx, x, y, frame) {
    ctx.drawImage(this.spriteSheet,
        frame * this.frameWidth, 0, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.drawDeathFrame = function(tick, ctx, x, y, deathAnimationTime) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop)
            this.elapsedTime = 0;
    }
    if (deathAnimationTime >= 1){
        var frame = 0;
    } else {
        var frame = this.currentFrame();
    }
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function() {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function() {
    return (this.elapsedTime >= this.totalTime);
}