class SensorVehiculos { //Sensor para parar si hay vehiculo
    constructor(Vehiculo) {
        this.Vehiculo = Vehiculo;
        this.nroRayos = 7;
        this.lrgRayo = 20;
        this.anguloRayo = Math.PI / 4.8821; // Math.PI / 4.8821 // Math.PI / 4.5

        this.rayos = [];
        this.lecturas = [];
    }

    actualizar(vehiculo, thisVehiculo, self) {
        this.#emitirRayos();
        this.lecturas = [];

        for (let i = 0; i < this.rayos.length; i++) {
            this.lecturas.push(
                this.#obtenerLecturas(this.rayos[i], vehiculo, self)
            );
            if (this.lecturas[i]) {
                thisVehiculo.velocidad = 0;
                thisVehiculo.aceleracion = 0;
                thisVehiculo.aceleracion = 0.01;
            }
        }
    }

    #obtenerLecturas(rayo, vehiculo, selfVehiculo) {
        let marcar = [];

        for (let i = 0; i < vehiculo.length; i++) {
            const poliVehiculos = vehiculo[i].poligono;
            for (let j = 0; j < poliVehiculos.length; j++) {
                const valor = getIntersection(
                    rayo[0],
                    rayo[1],
                    poliVehiculos[j],
                    poliVehiculos[(j + 1) % poliVehiculos.length]
                );
                if (valor) {
                    marcar.push(valor);
                }
            }
        }

        if (this.Vehiculo.tipo == "cole") {
            // frente = [0], [1]
            //lateral 1
            for (let i = 0; i < selfVehiculo.length; i++) {
                const selfPoli = selfVehiculo[i].poligono;
                for (let j = 0; j < selfPoli.length; j++) {
                    const valor = getIntersection(
                        rayo[0],
                        rayo[1],
                        selfPoli[1],
                        selfPoli[2]
                    );
                    if (valor) {
                        marcar.push(valor);
                    }
                }
            }

            //lateral 2
            for (let i = 0; i < selfVehiculo.length; i++) {
                const selfPoli = selfVehiculo[i].poligono;
                for (let j = 0; j < selfPoli.length; j++) {
                    const valor = getIntersection(
                        rayo[0],
                        rayo[1],
                        selfPoli[3],
                        selfPoli[0]
                    );
                    if (valor) {
                        marcar.push(valor);
                    }
                }
            }
        }

        //trasero
        for (let i = 0; i < selfVehiculo.length; i++) {
            const selfPoli = selfVehiculo[i].poligono;
            for (let j = 0; j < selfPoli.length; j++) {
                const valor = getIntersection(
                    rayo[0],
                    rayo[1],
                    selfPoli[2],
                    selfPoli[3]
                );
                if (valor) {
                    marcar.push(valor);
                }
            }
        }

        if (marcar.length == 0) {
            return null;
        }
        else {
            const offsets = marcar.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return marcar.find(e => e.offset == minOffset);
        }
    }

    #emitirRayos() {
        this.rayos = [];
        for (let i = 0; i < this.nroRayos; i++) {
            const anguloRayo = lerp(
                this.anguloRayo / 2,
                -this.anguloRayo / 2,
                i / (this.nroRayos - 1)
            ) + this.Vehiculo.angle;

            const inicio = { x: this.Vehiculo.x, y: this.Vehiculo.y };
            const fin = {
                x: this.Vehiculo.x -
                    Math.sin(anguloRayo) * this.lrgRayo,
                y: this.Vehiculo.y -
                    Math.cos(anguloRayo) * this.lrgRayo
            };
            this.rayos.push([inicio, fin]);
        }
    }

    dibujar(ctx) {
        for (let i = 0; i < this.nroRayos; i++) {
            let fin = this.rayos[i][1];
            if (this.lecturas[i]) {
                fin = this.lecturas[i]
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.moveTo(
                this.rayos[i][0].x,
                this.rayos[i][0].y
            );
            ctx.lineTo(
                fin.x,
                fin.y
            );
            ctx.stroke();


            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(
                this.rayos[i][1].x,
                this.rayos[i][1].y
            );
            ctx.lineTo(
                fin.x,
                fin.y
            );
            ctx.stroke();
        }
    }
}

class SensorParada {
    constructor(parada) {
        this.parada = parada;

        this.nroRayos = 30;
        this.lrgRayo = 15;
        this.anguloRayo = Math.PI * 2;
        this.angle = 0;

        this.rayos = [];

        this.total = 0;
    }

    actualizar(parada, colectivo) {
        function delay(milliseconds) {
            return new Promise(resolve => {
                setTimeout(resolve, milliseconds);
            });
        }

        async function init(parada, sensorParada, Colectivo) {
            await delay(400);

            Colectivo.velocidad = 0;
            Colectivo.aceleracion = 0;
            Colectivo.aceleracion = -0.2;

            await delay(1500);

            const contador = document.querySelector("#valor");
            contador.textContent = sensorParada.total + parada.pasajerosParada;
            //console.log("subieron ", parada.pasajerosParada, " pasajeros");
        }

        this.#emitirRayos();
        for (let i = 0; i < this.rayos.length; i++) {
            for (let k = 0; k < colectivo.length; k++) {
                const poliCole = colectivo[k].poligono;
                for (let j = 0; j < poliCole.length; j++) {
                    if (getIntersection(
                        this.rayos[i][0],
                        this.rayos[i][1],
                        poliCole[0],
                        poliCole[1]
                    )) {
                        if (parada.pasajerosParada > 0 && parada.linea == colectivo[k].linea) {
                            init(parada, this, colectivo[k]);
                        }
                    }
                }
            }
        }
    }

    #emitirRayos() {
        this.rayos = [];
        for (let i = 0; i < this.nroRayos; i++) {
            const anguloRayo = lerp(
                this.anguloRayo / 2,
                -this.anguloRayo / 2,
                i / (this.nroRayos - 1)
            ) + 0;

            this.inicio = { x: this.parada.x, y: this.parada.y };
            this.fin = {
                x: this.parada.x -
                    Math.sin(anguloRayo) * this.lrgRayo,
                y: this.parada.y -
                    Math.cos(anguloRayo) * this.lrgRayo
            };
            this.rayos.push([this.inicio, this.fin]);
        }
    }
}

class SensorSemaforo {
    constructor(semaforo) {
        this.semaforo = semaforo;
        this.nroRayos = 14;
        this.lrgRayo = 8;
        this.anguloRayo = Math.PI * 4;

        this.rayos = [];
    }

    actualizar(cole, autos, semaforo) {
        this.#emitirRayos();

        for (let i = 0; i < this.rayos.length; i++) {
            for (let k = 0; k < autos.length; k++) {
                const poliAutos = autos[k].poligono;
                for (let j = 0; j < poliAutos.length; j++) {
                    if (getIntersection(
                        this.rayos[i][0],
                        this.rayos[i][1],
                        poliAutos[j],
                        poliAutos[(j + 1) % poliAutos.length]
                    )) {
                        if (semaforo.color == "red") {
                            autos[k].velocidad = 0;
                            autos[k].aceleracion = 0;
                        } if (semaforo.color == "green") {
                            autos[k].aceleracion = 0.2;
                        }
                    }
                } for (let k = 0; k < cole.length; k++) {
                    const poliCole = cole[k].poligono;
                    for (let j = 0; j < poliCole.length; j++) {
                        if (getIntersection(
                            this.rayos[i][0],
                            this.rayos[i][1],
                            poliCole[j],
                            poliCole[(j + 1) % poliCole.length]
                        )) {
                            if (semaforo.color == "red") {
                                cole[k].velocidad = 0;
                                cole[k].aceleracion = 0;
                            } if (semaforo.color == "green") {
                                cole[k].aceleracion = 0.2;
                            }
                        }
                    }
                }
            }
        }
    }

    #emitirRayos() {
        this.rayos = [];
        for (let i = 0; i < this.nroRayos; i++) {
            const anguloRayo = lerp(
                this.anguloRayo / 2,
                -this.anguloRayo / 2,
                i / (this.nroRayos - 1)
            ) + this.semaforo.angle;

            const inicio = { x: this.semaforo.x, y: this.semaforo.y };
            const fin = {
                x: this.semaforo.x -
                    Math.sin(anguloRayo) * this.lrgRayo,
                y: this.semaforo.y -
                    Math.cos(anguloRayo) * this.lrgRayo
            };
            this.rayos.push([inicio, fin]);
        }
    }
}
