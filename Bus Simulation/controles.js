class Controles {
    constructor(tipo) {
        this.adelante = false;
        this.izquierda = false;
        this.derecha = false;
        this.frenar = false;

        switch (tipo) {
            case "MAIN":
                this.#teclado();
                break;
            case "TRAFICO":
                break;
        }
    }

    #teclado() {
        document.onkeydown = (presion) => {
            switch (presion.key) {
                case "ArrowLeft":
                    this.izquierda = true;
                    break;
                case "ArrowRight":
                    this.derecha = true;
                    break;
                case "ArrowUp":
                    this.adelante = true;
                    break;
                case "ArrowDown":
                    this.frenar = true;
                    break;
            }
        }
        document.onkeyup = (presion) => {
            switch (presion.key) {
                case "ArrowLeft":
                    this.izquierda = false;
                    break;
                case "ArrowRight":
                    this.derecha = false;
                    break;
                case "ArrowUp":
                    this.adelante = false;
                    break;
                case "ArrowDown":
                    this.frenar = false;
                    break;
            }
        }
    }
}