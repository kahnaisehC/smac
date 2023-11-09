class Cuadras {
    constructor(x, y, width, height, radius, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.color = color;
    }

    dibujarCds(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.radius);
        ctx.lineTo(this.x, this.y + this.height - this.radius);
        ctx.quadraticCurveTo(this.x, this.y + this.height, this.x + this.radius, this.y + this.height);
        ctx.lineTo(this.x + this.width - this.radius, this.y + this.height);
        ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width, this.y + this.height - this.radius);
        ctx.lineTo(this.x + this.width, this.y + this.radius);
        ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width - this.radius, this.y);
        ctx.lineTo(this.x + this.radius, this.y);
        ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + this.radius);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    mostrarCuadras() {
        // C1.1
        this.y = 45;
        this.x = 40;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C1.2
        this.y = 395;
        this.x = 40;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C2.1
        this.y = 45;
        this.x = 150;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C2.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C3.1
        this.y = 45;
        this.x = 260;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C3.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C4.1
        this.y = 45;
        this.x = 370;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C4.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C5.1
        this.x = 480;
        this.y = 45;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C5.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        /////////////////// Mitad ///////////////////

        // C6.1
        this.y = 45;
        this.x = 610;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C6.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C7.1
        this.y = 45;
        this.x = 720;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C7.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C8.1
        this.y = 45;
        this.x = 830;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C8.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C9.1
        this.y = 45;
        this.x = 940;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C9.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C10.1
        this.y = 45;
        this.x = 1050;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }

        // C10.2
        this.y = 395;
        for (let i = 0; i < 3; i++) {
            this.dibujarCds(ctx);
            this.y += 110;
        }
    }
}
