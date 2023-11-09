//　　|
const canvas = document.getElementById("fondo");
canvas.height = 700;
canvas.width = 1180;

const ctx = canvas.getContext("2d");
const plaza = new Cuadras(480, 265, 215, 215, 10, "#85dd00");
const manzanas = new Cuadras(0, 0, 85, 80, 10, "#d3d3d3");
const paradas = generarParadas(randomArray, pasajerosEnParada /*En funciones.js*/); //generar_cosas.js
const semaforos = generarSemaforos(1);
const colectivo = generarColes(1);
const autos = generarAutos(4); //4 //!= 0 //300

function animacion() {
    canvas.height = window.innerHeight;

    //Tráfico//
    for (let i = 0; i < autos.length; i++) {
        autos[i].actualizar();
    } for (let i = 0; i < colectivo.length; i++) {
        colectivo[i].actualizar();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for (let i = 0; i < autos.length; i++) {
        autos[i].velocidad = 0.3;
    }

    for (let i = 0; i < colectivo.length; i++) {
        colectivo[i].velocidad = 0.3;

        //console.log(colectivo[i].x, colectivo[i].y, colectivo[i].angle);

        if (colectivo[i].y < 385) {
            if (colectivo[i].angle > -1.55) {
                colectivo[i].angle -= 0.025;
            }
        } if (colectivo[i].x > 358) {
            if (colectivo[i].angle < 0) {
                colectivo[i].angle += 0.025;
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Sensores//
    for (let i = 0; i < colectivo.length; i++) {
        colectivo[i].detectar(/*lims.borIzDe, lims.borSuIn, hitboxPlaza.borIzDeCds, hitboxPlaza.borSuInCds, hitboxManzanas,*/ autos, colectivo);
    }
    for (let i = 0; i < autos.length; i++) {
        autos[i].detectar(/*lims.borIzDe, lims.borSuIn, hitboxPlaza.borIzDeCds, hitboxPlaza.borSuInCds, hitboxManzanas,*/ colectivo, autos);
    }

    //Gráfico//
    for (let i = 0; i < autos.length; i++) {
        autos[i].dibujar(ctx)
    }
    for (let i = 0; i < colectivo.length; i++) {
        colectivo[i].dibujar(ctx/*, true*/);
    }

    //Cuadras+//
    manzanas.mostrarCuadras();
    plaza.dibujarCds(ctx);
    for (let i = 0; i < paradas.length; i++) {
        paradas[i].actualizarStops(colectivo);
        paradas[i].dibujar(ctx);
    }
    for (let i = 0; i < semaforos.length; i++) {
        semaforos[i].actualizar(colectivo, autos);
        semaforos[i].dibujar(ctx);
    }

    requestAnimationFrame(animacion);
}

animacion();