function generarColes(N) {
    const colectivo = [];
    for (let i = 0; i < N; i++) {
        colectivo.push(new Colectivo(27, 680, 9, 27, 0, "AI", "cole", "110"));
    }
    return colectivo;
}

function generarAutos(N) {
    const autos = [];

    autos.push(new Auto(90, 360, 8, 15, 1.55, "AI", "auto"));
    var j = 110;
    for (let i = 0; i < N; i++) {
        if (i != 2 && i != 4 && i != 3) {
            autos.push(new Auto(28 + j * i, 640 - j * i, 8, 15, 0, "AI", "auto"));
        } if (i == 2) {
            autos.push(new Auto(28 + j * i, 560 - j - j * i, 8, 15, 3.14, "AI", "auto"));
        }
    }
    for (let i = 0; i < N; i++) {
        if (i != 2 && i != 3) {
            autos.push(new Auto(460 - j * i, 710 - j * i, 8, 15, 1.55, "AI", "auto"));
        } if (i == 2) {
            autos.push(new Auto(600 - j * i, 710 - j * i, 8, 15, 4.7, "AI", "auto"));
        }
    }
    for (let i = 0; i < 3; i++) {
        if (i != 0 && i != 1) {
            autos.push(new Auto(820 + j * i, 400 - j * i, 8, 15, 3.14, "AI", "auto"));
        } if (i == 1) {
            autos.push(new Auto(820 + j * i, 400 - j * i, 8, 15, 0, "AI", "auto"));
        }
    }
    for (let i = 0; i < N; i++) {
        if (i != 0 && i != 3 && i != 4) {
            autos.push(new Auto(800 - j * i, 250 - j * i, 8, 15, 4.7, "AI", "auto"));
        }
    }
    for (let i = 0; i < N; i++) {
        if (i != 1 && i != 2 && i != 3) {
            autos.push(new Auto(710 + j * i, 420 - j * i, 8, 15, 0, "AI", "auto"));
        }
    }
    /*
        autos.push(new Auto(10, 640, 8, 15, 0, "MAIN", "auto"));
        for (let i = 0; i < N; i++) {
            autos.push(new Auto(27, 640, 8, 15, 0, "AI", "auto"));
        }
        autos.push(new Auto(27, 640, 8, 15, 0, "AI", "auto"));
        for (let i = 0; i < N; i++) {
            autos.push(new Auto(27, 725, 8, 15, 0, "AI", "auto"));
        }
    */
    return autos;
}

function generarSemaforos(N) {
    const semaforos = [];
    //for (let i = 0; i < N; i++) {/*
    semaforos.push(new Semaforos(30, 405, 15, 15, "green")); /////
    semaforos.push(new Semaforos(10, 338, 15, 15, "green")); /////
    semaforos.push(new Semaforos(50, 358, 15, 15, "red")); /////
    semaforos.push(new Semaforos(225, 489, 15, 15, "red"));
    semaforos.push(new Semaforos(248, 468, 15, 15, "green"));
    semaforos.push(new Semaforos(817, 338, 15, 15, "green"));
    semaforos.push(new Semaforos(840, 358, 15, 15, "red"));
    semaforos.push(new Semaforos(797, 380, 15, 15, "red"));
    semaforos.push(new Semaforos(730, 599, 15, 15, "green"));
    semaforos.push(new Semaforos(708, 627, 15, 15, "red"));
    semaforos.push(new Semaforos(467, 228, 15, 15, "red"));
    semaforos.push(new Semaforos(490, 250, 15, 15, "green"));
    semaforos.push(new Semaforos(905, 732, 15, 15, "green"));
    semaforos.push(new Semaforos(950, 708, 15, 15, "red"));
    semaforos.push(new Semaforos(1018, 140, 15, 15, "green"));
    semaforos.push(new Semaforos(1038, 118, 15, 15, "red"));
    semaforos.push(new Semaforos(335, 33, 15, 15, "green"));
    semaforos.push(new Semaforos(358, 54, 15, 15, "red")); ///
    semaforos.push(new Semaforos(380, 13, 15, 15, "green"));
    //}*/
    return semaforos;
}

function generarParadas(random, pasajerosParada) {
    const paradas = [];

    for (let i = 0; i < random.length; i++) {
        if (random[i] == 0) {
            paradas.push(new Paradas(40, 306, 13, 25, 0, random[i], pasajerosParada[i], "110")); /////
        } if (random[i] == 1) {
            paradas.push(new Paradas(1, 195, 13, 25, 3.15, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 2) {
            paradas.push(new Paradas(80, 45, 13, 25, 4.75, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 3) {
            paradas.push(new Paradas(193, 1, 13, 25, 1.6, random[i], pasajerosParada[i], "110")); /////
        } if (random[i] == 4) {
            paradas.push(new Paradas(150, 195, 13, 25, 0, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 5) {
            paradas.push(new Paradas(370, 195, 13, 25, 0, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 6) {
            paradas.push(new Paradas(235, 85, 13, 25, 3.15, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 7) {
            paradas.push(new Paradas(192, 344, 13, 25, 1.6, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 8) {
            paradas.push(new Paradas(609, 85, 13, 25, 0, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 9) {
            paradas.push(new Paradas(719, 195, 13, 25, 0, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 10) {
            paradas.push(new Paradas(763, 45, 13, 25, 4.75, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 11) {
            paradas.push(new Paradas(875, 1, 13, 25, 1.6, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 12) {
            paradas.push(new Paradas(939, 304, 13, 25, 0, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 13) {
            paradas.push(new Paradas(1025, 86, 13, 25, 3.15, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 14) {
            paradas.push(new Paradas(1179, 194, 13, 25, 0, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 15) {
            paradas.push(new Paradas(1093, 394, 13, 25, 4.75, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 16) {
            paradas.push(new Paradas(305, 394, 13, 25, 4.75, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 17) {
            paradas.push(new Paradas(193, 745, 13, 25, 4.75, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 18) {
            paradas.push(new Paradas(305, 695, 13, 25, 1.6, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 19) {
            paradas.push(new Paradas(83, 505, 13, 25, 4.75, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 20) {
            paradas.push(new Paradas(235, 545, 13, 25, 3.15, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 21) {
            paradas.push(new Paradas(521, 585, 13, 25, 1.6, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 22) {
            paradas.push(new Paradas(653, 505, 13, 25, 4.75, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 23) {
            paradas.push(new Paradas(805, 545, 13, 25, 3.15, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 24) {
            paradas.push(new Paradas(763, 745, 13, 25, 4.75, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 25) {
            paradas.push(new Paradas(875, 695, 13, 25, 1.6, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 26) {
            paradas.push(new Paradas(1093, 585, 13, 25, 1.6, random[i], pasajerosParada[i], "110"));
        } if (random[i] == 27) {
            paradas.push(new Paradas(1179, 655, 13, 25, 0, random[i], pasajerosParada[i], "110"));
        }
    }
    return paradas;
}