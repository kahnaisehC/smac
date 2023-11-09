/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Red Neuronal///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(
                neuronCounts[i], neuronCounts[i + 1]
            ));
        }
    }

    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(
            givenInputs, network.levels[0]
        );
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(
                outputs, network.levels[i]
            );
        }
        return outputs;
    }
    static mutate(network, amount = 1) {
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                );
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount
                    );
                }
            }
        });
    }
}
class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }

        Level.#aleatorizar(this);
    }

    static #aleatorizar(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }
        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }
        return level.outputs;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Main///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const lims = new Limites(canvas.width / 2, canvas.width);
const hitboxPlaza = new HitboxCuadras(480, 695, 265, 480);
const compuerta = generarCompuertas();

lims.dibujarLims(ctx);
// Hitbox
hitboxPlaza.crearHitbox(ctx);
for (let i = 0; i < hitboxManzanas.length; i++) { // En generar_cosas.js // Constante
    hitboxManzanas[i].crearHitbox(ctx);
}

for (let i = 0; i < compuerta.length; i++) {
    compuerta[i].crearHitbox(ctx);
}
// FitnessFunction
// c.y // -c.y // -c.x
bestCole = colectivo.find(
    c => -c.x == Math.min(
        ...colectivo.map(c => -c.x)));
bestAuto = autos.find(
    c => c.y == Math.min(
        ...autos.map(c => c.y)));
//ctx.globalAlpha = 0.1;

//ctx.globalAlpha = 1;
//bestAuto.dibujar(ctx);

ctx.globalAlpha = 0.1;

ctx.globalAlpha = 1;
bestCole.dibujar(ctx/*, true*/);

//Entrenamiento//////////////////////////
let bestCole = colectivo[0];
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < colectivo.length; i++) {
        colectivo[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if (i != 0) {
            NeuralNetwork.mutate(colectivo[i].brain, 0); //0.05//0.1//0.2//0.3/////////////////////////////////////////////////////////////////////
        }
    }
}

let bestAuto = autos[0];
if (localStorage.getItem("bestBrainAuto")) {
    for (let i = 0; i < autos.length; i++) {
        autos[i].brain = JSON.parse(localStorage.getItem("bestBrainAuto"));
        if (i != 0) {
            NeuralNetwork.mutate(autos[i].brain, 0); //0///////////////////////////////////////////////////////////////////////
        }
    }
}

function saveCole() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCole.brain));
    //copy(JSON.stringify(bestCole.brain));

}
function discardCole() {
    localStorage.removeItem("bestBrain");
}

function saveAuto() {
    localStorage.setItem("bestBrainAuto", JSON.stringify(bestAuto.brain));
    //copy(JSON.stringify(bestAuto.brain));

}
function discardAuto() {
    localStorage.removeItem("bestBrainAuto");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Colectivo///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//En Constructor (if tipoControl)////////////////////////////////////////////////////
this.sensores = new Sensores(this);
this.brain = new NeuralNetwork(
    [this.sensores.nroRayos, 6, 4]
);

//En Detectar (if this.sensores)/////////////////////////////////////////////////////
this.sensores.actualizar(limIzqDer, limSupInf, hitpl1, hitpl2, hitcds, autos);
const offsetss = this.sensores.lecturas.map(
    s => s == null ? 0 : 1 - s.offset
);
const outputss = NeuralNetwork.feedForward(offsetss, this.brain);

if (this.useBrain) {
    this.controles.adelante = outputss[0];
    this.controles.izquierda = outputss[1];
    this.controles.derecha = outputss[2];
    this.controles.frenar = outputss[3];
}

//En Choque//////////////////////////////////////////////////////////////////////////
for (let i = 0; i < limIzqDer.length; i++) {
    if (polysIntersect(this.poligono, limIzqDer[i])) {
        return true;
    }
}
for (let i = 0; i < limSupInf.length; i++) {
    if (polysIntersect(this.poligono, limSupInf[i])) {
        return true;
    }
}
for (let i = 0; i < hitpl1.length; i++) {
    if (polysIntersect(this.poligono, hitpl1[i])) {
        return true;
    }
}
for (let i = 0; i < hitpl2.length; i++) {
    if (polysIntersect(this.poligono, hitpl2[i])) {
        return true;
    }
}
for (let i = 0; i < hitcds.length; i++) {
    const cds1 = hitcds[i].borIzDeCds;
    for (let j = 0; j < cds1.length; j++) {
        const valor = getIntersection(
            this.poligono[0],
            this.poligono[1],
            cds1[j][0],
            cds1[j][1]
        );
        if (valor) {
            return true;
        }
    }
}
for (let i = 0; i < hitcds.length; i++) {
    const cds1 = hitcds[i].borIzDeCds;
    for (let j = 0; j < cds1.length; j++) {
        const valor = getIntersection(
            this.poligono[2],
            this.poligono[3],
            cds1[j][0],
            cds1[j][1]
        );
        if (valor) {
            return true;
        }
    }
}
for (let i = 0; i < hitcds.length; i++) {
    const cds2 = hitcds[i].borSuInCds;
    for (let j = 0; j < cds2.length; j++) {
        const valor = getIntersection(
            this.poligono[0],
            this.poligono[1],
            cds2[j][0],
            cds2[j][1]
        );
        if (valor) {
            return true;
        }
    }
}
for (let i = 0; i < hitcds.length; i++) {
    const cds2 = hitcds[i].borSuInCds;
    for (let j = 0; j < cds2.length; j++) {
        const valor = getIntersection(
            this.poligono[2],
            this.poligono[3],
            cds2[j][0],
            cds2[j][1]
        );
        if (valor) {
            return true;
        }
    }
}
//En Dibujar (if this.sensores)//////////////////////////////////////////////////////
this.sensores.dibujar(ctx);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Auto///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//En Constructor (if tipoControl)////////////////////////////////////////////////////
this.sensores = new Sensores(this);
this.brain = new NeuralNetwork(
    [this.sensores.nroRayos, 6, 4]
);

//En Detectar (if this.sensores)/////////////////////////////////////////////////////
this.sensores.actualizar(limIzqDer, limSupInf, hitpl1, hitpl2, hitcds, []);
const offsets = this.sensores.lecturas.map(
    s => s == null ? 0 : 1 - s.offset
);
const outputs = NeuralNetwork.feedForward(offsets, this.brain);

if (this.useBrain) {
    this.controles.adelante = outputs[0];
    this.controles.izquierda = outputs[1];
    this.controles.derecha = outputs[2];
    this.controles.frenar = outputs[3];
}

//En Choque//////////////////////////////////////////////////////////////////////////
for (let i = 0; i < limIzqDer.length; i++) {
    if (polysIntersect(this.poligono, limIzqDer[i])) {
        return true;
    }
}
for (let i = 0; i < limSupInf.length; i++) {
    if (polysIntersect(this.poligono, limSupInf[i])) {
        return true;
    }
}
for (let i = 0; i < hitpl1.length; i++) {
    if (polysIntersect(this.poligono, hitpl1[i])) {
        return true;
    }
}
for (let i = 0; i < hitpl2.length; i++) {
    if (polysIntersect(this.poligono, hitpl2[i])) {
        return true;
    }
}
for (let i = 0; i < hitcds.length; i++) {
    const cds1 = hitcds[i].borIzDeCds;
    for (let j = 0; j < cds1.length; j++) {
        const valor = getIntersection(
            this.poligono[0],
            this.poligono[1],
            cds1[j][0],
            cds1[j][1]
        );
        if (valor) {
            return true;
        }
    }
}
for (let i = 0; i < hitcds.length; i++) {
    const cds1 = hitcds[i].borIzDeCds;
    for (let j = 0; j < cds1.length; j++) {
        const valor = getIntersection(
            this.poligono[2],
            this.poligono[3],
            cds1[j][0],
            cds1[j][1]
        );
        if (valor) {
            return true;
        }
    }
}
for (let i = 0; i < hitcds.length; i++) {
    const cds2 = hitcds[i].borSuInCds;
    for (let j = 0; j < cds2.length; j++) {
        const valor = getIntersection(
            this.poligono[0],
            this.poligono[1],
            cds2[j][0],
            cds2[j][1]
        );
        if (valor) {
            return true;
        }
    }
}
for (let i = 0; i < hitcds.length; i++) {
    const cds2 = hitcds[i].borSuInCds;
    for (let j = 0; j < cds2.length; j++) {
        const valor = getIntersection(
            this.poligono[2],
            this.poligono[3],
            cds2[j][0],
            cds2[j][1]
        );
        if (valor) {
            return true;
        }
    }
}

//En Dibujar (if this.sensores)//////////////////////////////////////////////////////
this.sensores.dibujar(ctx);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Sensores///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Sensores {
    constructor(Vehiculo) {
        this.Vehiculo = Vehiculo;
        this.nroRayos = 7;
        this.lrgRayo = 65;
        this.anguloRayo = Math.PI / 4; //Math.PI / 4 //18 //Math.PI / 4.8821

        this.rayos = [];
        this.lecturas = [];
    }

    actualizar(limIzqDer, limSupInf, hitpl1, hitpl2, hitcds, vehiculos) {
        this.#emitirRayos();
        this.lecturas = [];
        for (let i = 0; i < this.rayos.length; i++) {
            this.lecturas.push(
                this.#obtenerLecturas(this.rayos[i], limIzqDer, limSupInf, hitpl1, hitpl2, hitcds, vehiculos)
            );
        }
    }

    #obtenerLecturas(rayo, limIzqDer, limSupInf, hitpl1, hitpl2, hitcds, vehiculos) {
        let marcar = [];

        for (let i = 0; i < limIzqDer.length; i++) {
            const valor = getIntersection(
                rayo[0],
                rayo[1],
                limIzqDer[i][0],
                limIzqDer[i][1]
            );
            if (valor) {
                marcar.push(valor);
            }
        }
        for (let i = 0; i < limSupInf.length; i++) {
            const valor = getIntersection(
                rayo[0],
                rayo[1],
                limSupInf[i][0],
                limSupInf[i][1]
            );
            if (valor) {
                marcar.push(valor);
            }
        }
        for (let i = 0; i < hitpl1.length; i++) {
            const valor = getIntersection(
                rayo[0],
                rayo[1],
                hitpl1[i][0],
                hitpl1[i][1]
            );
            if (valor) {
                marcar.push(valor);
            }
        }
        for (let i = 0; i < hitpl2.length; i++) {
            const valor = getIntersection(
                rayo[0],
                rayo[1],
                hitpl2[i][0],
                hitpl2[i][1]
            );
            if (valor) {
                marcar.push(valor);
            }
        }
        for (let i = 0; i < hitcds.length; i++) {
            const cds1 = hitcds[i].borIzDeCds;
            for (let j = 0; j < cds1.length; j++) {
                const valor = getIntersection(
                    rayo[0],
                    rayo[1],
                    cds1[j][0],
                    cds1[j][1]
                );
                if (valor) {
                    marcar.push(valor);
                }
            }
        }
        for (let i = 0; i < hitcds.length; i++) {
            const cds2 = hitcds[i].borSuInCds;
            for (let j = 0; j < cds2.length; j++) {
                const valor = getIntersection(
                    rayo[0],
                    rayo[1],
                    cds2[j][0],
                    cds2[j][1]
                );
                if (valor) {
                    marcar.push(valor);
                }
            }
        }

        for (let i = 0; i < vehiculos.length; i++) {
            const poliVehiculos = vehiculos[i].poligono;
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
            ctx.strokeStyle = "yellow";
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

class SensorStop { //Sensor para parar en la parada
    constructor(Colectivo) {
        this.Colectivo = Colectivo;
        this.nroRayos = 2;
        this.lrgRayo = 12;
        this.anguloRayo = 135;

        this.rayos = [];
        this.lecturas = [];
    }

    actualizar(parada, Colectivo) {

        function delay(milliseconds) {
            return new Promise(resolve => {
                setTimeout(resolve, milliseconds);
            });
        }

        async function init(Colectivo) {
            await delay(250);

            Colectivo.velocidad = 0;
            Colectivo.aceleracion = 0;

            await delay(1800);

            Colectivo.aceleracion = 0.3;
        }

        this.#emitirRayos();
        this.lecturas = [];
        for (let i = 0; i < this.rayos.length; i++) {
            this.lecturas.push(
                this.#obtenerLecturas(this.rayos[i], parada)
            );
            if (this.lecturas[i]) {
                for (let j = 0; j < parada.length; j++) {
                    if (parada[j].pasajerosParada > 0) {
                        init(Colectivo);
                    }
                }
            }
        }
    }

    #obtenerLecturas(rayo, parada) {
        let marcar = [];

        for (let i = 0; i < parada.length; i++) {
            const stop1 = parada[i].borIzDeCds;
            for (let j = 0; j < stop1.length; j++) {
                const valor = getIntersection(
                    rayo[0],
                    rayo[1],
                    stop1[j][0],
                    stop1[j][1]
                );
                if (valor) {
                    marcar.push(valor);
                }
            }
        }
        for (let i = 0; i < parada.length; i++) {
            const stop2 = parada[i].borSuInCds;
            for (let j = 0; j < stop2.length; j++) {
                const valor = getIntersection(
                    rayo[0],
                    rayo[1],
                    stop2[j][0],
                    stop2[j][1]
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
            ) + this.Colectivo.angle;

            const inicio = { x: this.Colectivo.x, y: this.Colectivo.y };
            const fin = {
                x: this.Colectivo.x -
                    Math.sin(anguloRayo) * this.lrgRayo,
                y: this.Colectivo.y -
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
            ctx.strokeStyle = "green";
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Objetos Hitbox///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class HitboxCuadras {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;

        const val1 = { x: this.a, y: this.c }
        const val2 = { x: this.b, y: this.c }
        const val3 = { x: this.a, y: this.d }
        const val4 = { x: this.b, y: this.d }
        this.borIzDeCds = [
            [val1, val3],
            [val2, val4]
        ]

        this.a1 = a;
        this.b1 = b;
        this.c1 = c;
        this.d1 = d;
        const val5 = { x: this.b1, y: this.c1 }
        const val6 = { x: this.b1, y: this.d1 }
        const val7 = { x: this.a1, y: this.c1 }
        const val8 = { x: this.a1, y: this.d1 }
        this.borSuInCds = [
            [val5, val7],
            [val6, val8]
        ]
    }

    crearHitbox(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";

        this.borIzDeCds.forEach(borde => {
            ctx.beginPath();
            ctx.moveTo(borde[0].x, borde[0].y);
            ctx.lineTo(borde[1].x, borde[1].y);
            ctx.stroke();
        });

        this.borSuInCds.forEach(borde => {
            ctx.beginPath();
            ctx.moveTo(borde[0].x, borde[0].y);
            ctx.lineTo(borde[1].x, borde[1].y);
            ctx.stroke();
        });
    }
}

class Limites {
    constructor(x, width) {
        this.x = x;
        this.width = width;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 10000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft1 = { x: this.left, y: this.top }
        const topRight1 = { x: this.right, y: this.top }
        const bottomLeft1 = { x: this.left, y: this.bottom }
        const bottomRight1 = { x: this.right, y: this.bottom }
        this.borIzDe = [
            [topLeft1, bottomLeft1],
            [topRight1, bottomRight1]
        ]

        const topLeft2 = { x: this.top, y: this.left }
        const topRight2 = { x: this.top, y: 311 }
        const bottomLeft2 = { x: this.bottom, y: this.left }
        const bottomRight2 = { x: this.bottom, y: this.right }
        this.borSuIn = [
            [topLeft2, bottomLeft2],
            [topRight2, bottomRight2]
        ]
    }
    dibujarLims(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#f5f5f5";

        this.borIzDe.forEach(borde => {
            ctx.beginPath();
            ctx.moveTo(borde[0].x, borde[0].y);
            ctx.lineTo(borde[1].x, borde[1].y);
            ctx.stroke();
        });

        this.borSuIn.forEach(borde => {
            ctx.beginPath();
            ctx.moveTo(borde[0].x, borde[0].y);
            ctx.lineTo(borde[1].x, borde[1].y);
            ctx.stroke();
        });
    }
}

class Compuertas {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;

        const val1 = { x: this.a, y: this.b }
        const val2 = { x: this.a, y: this.c }
        this.lineComp = [[val1, val2]]
    }

    crearHitbox(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";

        this.lineComp.forEach(borde => {
            ctx.beginPath();
            ctx.moveTo(borde[0].x, borde[0].y);
            ctx.lineTo(borde[1].x, borde[1].y);
            ctx.stroke();
        });
    }
}
//Semaforos//////////////////////////////////////////////
function crearHitbox(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.color;

    this.borIzDeCds.forEach(borde => {
        ctx.beginPath();
        ctx.moveTo(borde[0].x, borde[0].y);
        ctx.lineTo(borde[1].x, borde[1].y);
        ctx.stroke();
    });

    this.borSuInCds.forEach(borde => {
        ctx.beginPath();
        ctx.moveTo(borde[0].x, borde[0].y);
        ctx.lineTo(borde[1].x, borde[1].y);
        ctx.stroke();
    });
}

//Paradas////////////////////////////////////////////////
function crearHitbox(ctx) {
    ctx.lineWidth = 1;
    //ctx.strokeStyle = "black"; /////

    this.borIzDeCds.forEach(borde => {
        ctx.beginPath();
        ctx.moveTo(borde[0].x, borde[0].y);
        ctx.lineTo(borde[1].x, borde[1].y);
        ctx.stroke();
    });

    this.borSuInCds.forEach(borde => {
        ctx.beginPath();
        ctx.moveTo(borde[0].x, borde[0].y);
        ctx.lineTo(borde[1].x, borde[1].y);
        ctx.stroke();
    });
}

/*#*/ function hitboxStops() {
    const puntos = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    puntos.push({
        x: this.x - Math.sin(- alpha) * rad,
        y: this.y - Math.cos(- alpha) * rad
    });
    puntos.push({
        x: this.x - Math.sin(+ alpha) * rad,
        y: this.y - Math.cos(+ alpha) * rad
    });
    puntos.push({
        x: this.x - Math.sin(Math.PI - alpha) * rad,
        y: this.y - Math.cos(Math.PI - alpha) * rad
    });
    puntos.push({
        x: this.x - Math.sin(Math.PI + alpha) * rad,
        y: this.y - Math.cos(Math.PI + alpha) * rad
    });

    return puntos;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Generar Cosas///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generarCompuertas() { //No por favor
    const compuerta = [];

    compuerta.push(new Compuertas(40, 125, 155)); // 
    return compuerta;
}

const hitboxManzanas = [
    //1
    new HitboxCuadras(125, 40, 45, 125),
    new HitboxCuadras(150, 235, 45, 125),
    new HitboxCuadras(260, 345, 45, 125),
    new HitboxCuadras(370, 455, 45, 125),
    new HitboxCuadras(480, 565, 45, 125),
    new HitboxCuadras(125, 40, 235, 155),
    new HitboxCuadras(150, 235, 235, 155),
    new HitboxCuadras(260, 345, 235, 155),
    new HitboxCuadras(370, 455, 235, 155),
    new HitboxCuadras(480, 565, 235, 155),
    new HitboxCuadras(125, 40, 345, 265),
    new HitboxCuadras(150, 235, 345, 265),
    new HitboxCuadras(260, 345, 345, 265),
    new HitboxCuadras(370, 455, 345, 265),
    //2
    new HitboxCuadras(125, 40, 475, 395),
    new HitboxCuadras(150, 235, 475, 395),
    new HitboxCuadras(260, 345, 475, 395),
    new HitboxCuadras(370, 455, 475, 395),
    new HitboxCuadras(125, 40, 585, 505),
    new HitboxCuadras(150, 235, 585, 505),
    new HitboxCuadras(260, 345, 585, 505),
    new HitboxCuadras(370, 455, 585, 505),
    new HitboxCuadras(480, 565, 585, 505),
    new HitboxCuadras(125, 40, 695, 615),
    new HitboxCuadras(150, 235, 695, 615),
    new HitboxCuadras(260, 345, 695, 615),
    new HitboxCuadras(370, 455, 695, 615),
    new HitboxCuadras(480, 565, 695, 615),
    //3
    new HitboxCuadras(610, 695, 45, 125),
    new HitboxCuadras(720, 805, 45, 125),
    new HitboxCuadras(830, 915, 45, 125),
    new HitboxCuadras(940, 1025, 45, 125),
    new HitboxCuadras(1050, 1135, 45, 125),
    new HitboxCuadras(610, 695, 235, 155),
    new HitboxCuadras(720, 805, 235, 155),
    new HitboxCuadras(830, 915, 235, 155),
    new HitboxCuadras(940, 1025, 235, 155),
    new HitboxCuadras(1050, 1135, 235, 155),
    new HitboxCuadras(720, 805, 345, 265),
    new HitboxCuadras(830, 915, 345, 265),
    new HitboxCuadras(940, 1025, 345, 265),
    new HitboxCuadras(1050, 1135, 345, 265),
    //4
    new HitboxCuadras(720, 805, 475, 395),
    new HitboxCuadras(830, 915, 475, 395),
    new HitboxCuadras(940, 1025, 475, 395),
    new HitboxCuadras(1050, 1135, 475, 395),
    new HitboxCuadras(610, 695, 585, 505),
    new HitboxCuadras(720, 805, 585, 505),
    new HitboxCuadras(830, 915, 585, 505),
    new HitboxCuadras(940, 1025, 585, 505),
    new HitboxCuadras(1050, 1135, 585, 505),
    new HitboxCuadras(610, 695, 695, 615),
    new HitboxCuadras(720, 805, 695, 615),
    new HitboxCuadras(830, 915, 695, 615),
    new HitboxCuadras(940, 1025, 695, 615),
    new HitboxCuadras(1050, 1135, 695, 615),
];

function generarHitboxSemaforos(N) {
    const hitboxSemaforos = [];
    //for (let i = 0; i < N; i++) {
    hitboxSemaforos.push(new Semaforos(398, 413, 22, 37, "green")); /////
    hitboxSemaforos.push(new Semaforos(331, 346, 2, 17, "green")); /////
    hitboxSemaforos.push(new Semaforos(351, 366, 42, 57, "red")); /////
    hitboxSemaforos.push(new Semaforos(482, 497, 217, 232, "red"));
    hitboxSemaforos.push(new Semaforos(461, 476, 240, 255, "green"));
    hitboxSemaforos.push(new Semaforos(331, 346, 809, 824, "green"));
    hitboxSemaforos.push(new Semaforos(351, 366, 832, 847, "red"));
    hitboxSemaforos.push(new Semaforos(373, 388, 789, 804, "red"));
    hitboxSemaforos.push(new Semaforos(592, 607, 722, 737, "green"));
    hitboxSemaforos.push(new Semaforos(620, 635, 700, 715, "red"));
    hitboxSemaforos.push(new Semaforos(725, 740, 897, 912, "green"));
    hitboxSemaforos.push(new Semaforos(701, 716, 942, 957, "red"));
    hitboxSemaforos.push(new Semaforos(243, 258, 482, 497, "green"));
    hitboxSemaforos.push(new Semaforos(221, 236, 459, 474, "red"));
    hitboxSemaforos.push(new Semaforos(47, 62, 350, 365, "red")); ///
    hitboxSemaforos.push(new Semaforos(26, 41, 327, 342, "green"));
    hitboxSemaforos.push(new Semaforos(6, 21, 372, 387, "green"));
    hitboxSemaforos.push(new Semaforos(133, 148, 1010, 1025, "green"));
    hitboxSemaforos.push(new Semaforos(111, 126, 1030, 1045, "red"));
    //}
    return hitboxSemaforos;
}

function generarHitboxParadas(random) {
    const hitboxParadas = [];

    for (let i = 0; i < random.length; i++) {
        if (random[i] == 0) {
            hitboxParadas.push(new Paradas(294, 318, 46, 34, 0, null, null, null)); /////
        } if (random[i] == 1) {
            hitboxParadas.push(new Paradas(208, 182, 0, 5, 0, null, null, null));
        } if (random[i] == 2) {
            hitboxParadas.push(new Paradas(38, 50, 90, 70, 0, null, null, null));
        } if (random[i] == 3) {
            hitboxParadas.push(new Paradas(8, 0, 203, 183, 0, null, null, null)); /////
        } if (random[i] == 4) {
            hitboxParadas.push(new Paradas(208, 182, 155, 145, 0, null, null, null));
        } if (random[i] == 5) {
            hitboxParadas.push(new Paradas(208, 182, 375, 365, 0, null, null, null));
        } if (random[i] == 6) {
            hitboxParadas.push(new Paradas(98, 73, 240, 230, 0, null, null, null));
        } if (random[i] == 7) {
            hitboxParadas.push(new Paradas(334, 352, 180, 205, 0, null, null, null));
        } if (random[i] == 8) {
            hitboxParadas.push(new Paradas(95, 75, 610, 603, 0, null, null, null));
        } if (random[i] == 9) {
            hitboxParadas.push(new Paradas(205, 185, 720, 713, 0, null, null, null));
        } if (random[i] == 10) {
            hitboxParadas.push(new Paradas(37, 45, 750, 775, 0, null, null, null));
        } if (random[i] == 11) {
            hitboxParadas.push(new Paradas(0, 7, 863, 888, 0, null, null, null));
        } if (random[i] == 12) {
            hitboxParadas.push(new Paradas(315, 295, 940, 933, 0, null, null, null));
        } if (random[i] == 13) {
            hitboxParadas.push(new Paradas(98, 75, 1024, 1030, 0, null, null, null));
        } if (random[i] == 14) {
            hitboxParadas.push(new Paradas(205, 185, 1180, 1173, 0, null, null, null));
        } if (random[i] == 15) {
            hitboxParadas.push(new Paradas(395, 387, 1105, 1080, 0, null, null, null));
        } if (random[i] == 16) {
            hitboxParadas.push(new Paradas(387, 395, 292, 317, 0, null, null, null));
        } if (random[i] == 17) {
            hitboxParadas.push(new Paradas(738, 746, 180, 205, 0, null, null, null));
        } if (random[i] == 18) {
            hitboxParadas.push(new Paradas(695, 704, 292, 317, 0, null, null, null));
        } if (random[i] == 19) {
            hitboxParadas.push(new Paradas(498, 505, 70, 95, 0, null, null, null));
        } if (random[i] == 20) {
            hitboxParadas.push(new Paradas(533, 558, 235, 241, 0, null, null, null));
        } if (random[i] == 21) {
            hitboxParadas.push(new Paradas(585, 593, 509, 534, 0, null, null, null));
        } if (random[i] == 22) {
            hitboxParadas.push(new Paradas(498, 505, 640, 665, 0, null, null, null));
        } if (random[i] == 23) {
            hitboxParadas.push(new Paradas(533, 558, 802, 810, 0, null, null, null));
        } if (random[i] == 24) {
            hitboxParadas.push(new Paradas(738, 746, 750, 775, 0, null, null, null));
        } if (random[i] == 25) {
            hitboxParadas.push(new Paradas(695, 704, 863, 888, 0, null, null, null));
        } if (random[i] == 26) {
            hitboxParadas.push(new Paradas(585, 593, 1105, 1080, 0, null, null, null));
        } if (random[i] == 27) {
            hitboxParadas.push(new Paradas(643, 668, 1180, 1173, 0, null, null, null));
        }
    }
    return hitboxParadas;
}
