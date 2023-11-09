const options = document.getElementById('options-button');
console.log(options.value);

const objeto = {
    x: 3,
    y: 3
}

const objeto2 = objeto;
objeto2.x = 7;
console.log(objeto);