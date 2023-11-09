let paradasAGenerar = 10; ///
let numParada = 27;
let pasajerosAGenerar = 10;
let cantPasajerosMax = 15;

let randomArray = GenerarArray(paradasAGenerar, numParada);
let pasajerosEnParada = [];
for (let i = 0; i < pasajerosAGenerar; i++) {
    pasajerosEnParada.push(getRandomInt(0, cantPasajerosMax))
}

function GenerarArray(paradasAGenerar, numParada) {
    let random = [];

    for (let i = 0; i < 100; i++) {
        if (random.length < paradasAGenerar) {
            for (let i = 0; i < paradasAGenerar; i++) {
                var aleatorio = getRandomInt(0, numParada);
                var repetido = false;
                random.forEach(function (element) {
                    if (element == aleatorio) {
                        repetido = true;
                    }
                });
                if (!repetido) {
                    random.push(aleatorio)
                    i = 100;
                }
            }
        }
    }

    return random;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function lerp(A, B, t) {
    return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u < 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
    }
    return null;
}

function polysIntersect(poli1, poli2) {
    for (let i = 0; i < poli1.length; i++) {
        for (let j = 0; j < poli2.length; j++) {
            const marcar = getIntersection(
                poli1[i],
                poli1[(i + 1) % poli1.length],
                poli2[j],
                poli2[(j + 1) % poli2.length],
            );
            if (marcar) {
                return true;
            }
        }
    }
    return false;
}