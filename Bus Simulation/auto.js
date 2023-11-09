class Auto {
    constructor(x, y, width, height, angle, tipoControl, tipo) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.dmg = false;
        this.tipo = tipo;

        this.useBrain = tipoControl == "AI";
        if (tipoControl == "AI" | tipoControl == "MAIN") {
            this.sensorVehiculos = new SensorVehiculos(this);
        }
        this.controles = new Controles(tipoControl);

        this.velocidad = 0;
        this.aceleracion = 0.1; //0.1 //0.8 //0.2
        this.arrastre = 0.005;
        this.velocidadMax = 0.3; //0.275 //0.3 //2.9 //0.6

        this.imgAuto = new Image();
        this.imgAuto.src = "auto.png";
    }

    detectar(/*limIzqDer, limSupInf, hitpl1, hitpl2, hitcds,*/ cole, self) {
        if (!this.dmg) {
            this.dmg = this.#choque(/*limIzqDer, limSupInf, hitpl1, hitpl2, hitcds,*/ cole);
        } if (this.sensorVehiculos) {
            this.sensorVehiculos.actualizar(cole, this, self);
        }
    }

    actualizar() {
        if (!this.dmg) {
            this.#movimiento();
            this.poligono = this.#hitbox();
        } /*if (this.dmg) {
            delete this;
        }*/
    }

    #choque(/*limIzqDer, limSupInf, hitpl1, hitpl2, hitcds,*/ cole) {
        for (let i = 0; i < cole.length; i++) {
            if (polysIntersect(this.poligono, cole[i].poligono)) {
                return true;
            }
        }

        return false;
    }

    #hitbox() {
        const puntos = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        puntos.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        puntos.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        puntos.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        puntos.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });

        return puntos;
    }

    #movimiento() {
        if (this.controles.adelante)
            this.velocidad += this.aceleracion;
        if (this.controles.frenar)
            this.velocidad -= this.aceleracion;

        if (this.velocidad > this.velocidadMax)
            this.velocidad = this.velocidadMax;
        if (this.velocidad < -this.velocidadMax)
            this.velocidad = -this.velocidadMax;

        if (this.velocidad > 0)
            this.velocidad -= this.arrastre;
        if (this.velocidad < 0)
            this.velocidad += this.arrastre;
        if (this.velocidad < this.arrastre && this.velocidad > -this.arrastre)
            this.velocidad = 0;

        if (this.controles.derecha) {
            if (this.velocidad > 0)
                this.angle -= 0.03;
            if (this.velocidad < 0)
                this.angle += 0.03;
        }
        if (this.controles.izquierda) {
            if (this.velocidad > 0)
                this.angle += 0.03;
            if (this.velocidad < 0)
                this.angle -= 0.03;
        }

        this.x -= Math.sin(this.angle) * this.velocidad;
        this.y -= Math.cos(this.angle) * this.velocidad;
    }

    dibujar(ctx, dibujarSensor = false) { //false//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (this.sensorVehiculos && dibujarSensor) {
            this.sensorVehiculos.dibujar(ctx);
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        if (this.tipo == "auto") {
            ctx.drawImage(this.imgAuto, -this.width / 2, -this.height / 2, this.width, this.height);
        }
        ctx.restore();
    }
}
