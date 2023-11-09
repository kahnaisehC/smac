class Paradas {
    constructor(a, b, c, d, angle = 0, idParada, pasajerosParada, linea) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d;
        this.angle = angle;
        this.idParada = idParada;
        this.pasajerosParada = pasajerosParada;
        this.linea = linea;

        this.sensorParada = new SensorParada(this);
        //console.log("ID:", this.idParada, "Pasajeros:", this.pasajerosParada, "Línea", this.linea)

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

        this.imgParada = new Image();
        this.imgParada.src = "parada.png";
    }


    actualizarStops(colectivo) {
        this.sensorParada.actualizar(this, colectivo);
    }

    dibujar(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.drawImage(this.imgParada, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}