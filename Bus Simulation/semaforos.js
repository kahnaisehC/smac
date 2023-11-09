class Semaforos {
    constructor(a, b, c, d, color) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d;
        this.angle = 0;

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;

        const val1 = { x: this.c, y: this.a }
        const val2 = { x: this.c, y: this.b }
        const val3 = { x: this.d, y: this.a }
        const val4 = { x: this.d, y: this.b }
        this.borIzDeCds = [
            [val1, val3],
            [val2, val4]
        ]

        this.a1 = a;
        this.b1 = b;
        this.c1 = c;
        this.d1 = d;
        const val5 = { x: this.c1, y: this.b1 }
        const val6 = { x: this.d1, y: this.b1 }
        const val7 = { x: this.c1, y: this.a1 }
        const val8 = { x: this.d1, y: this.a1 }
        this.borSuInCds = [
            [val5, val7],
            [val6, val8]
        ]

        this.color = color;
        this.sensorSemaforo = new SensorSemaforo(this);

        this.imgVerde = new Image();
        this.imgVerde.src = "semaforo_verde.png";
        this.imgRojo = new Image();
        this.imgRojo.src = "semaforo_rojo.png";
    }

    actualizar(cole, autos) {
        function delay(milliseconds) {
            return new Promise(resolve => {
                setTimeout(resolve, milliseconds);
            });
        }

        async function init(semaforo) {
            if (semaforo.color == "red") {
                await delay(3650);
                semaforo.color = "green";
            }
            if (semaforo.color == "green") {
                await delay(3650);
                semaforo.color = "red";
            }
        }

        init(this);
        this.sensorSemaforo.actualizar(cole, autos, this);
    }

    dibujar(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        if (this.color == "green") {
            ctx.drawImage(this.imgVerde, -this.width / 2, -this.height / 2, this.width, this.height);
        }
        if (this.color == "red") {
            ctx.drawImage(this.imgRojo, -this.width / 2, -this.height / 2, this.width, this.height);
        }
        ctx.restore();
    }
}
