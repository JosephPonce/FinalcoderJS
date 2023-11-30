function calcularIMC(peso, altura) {
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    return imc.toFixed(2);
}
function calcularPesoSaludable(altura) {
    const alturaMetros = altura / 100;
    const pesoBajo = 18.5 * alturaMetros * alturaMetros;
    const pesoAlto = 24.9 * alturaMetros * alturaMetros;
    return {
        pesoBajo: pesoBajo.toFixed(2),
        pesoAlto: pesoAlto.toFixed(2)
    };
}
function calcularIMCSimulador() {
    const pesoInput = document.getElementById('pesoInput').value;
    const alturaInput = document.getElementById('alturaInput').value;

    if (pesoInput && alturaInput) {
        const peso = parseFloat(pesoInput);
        const altura = parseFloat(alturaInput);

        const imc = calcularIMC(peso, altura);
        document.getElementById('output').innerHTML = "Tu índice de masa corporal (IMC) es: " + imc;

        if (imc < 18.5) {
            document.getElementById('output').innerHTML += "<br>Estás flaco para el verano";
        } else if (imc >= 18.5 && imc < 24.9) {
            document.getElementById('output').innerHTML += "<br>Estás en tu punto para el verano";
        } else if (imc >= 25 && imc < 29.9) {
            document.getElementById('output').innerHTML += "<br>Estás para un retoque con el cirujano";
        } else {
            document.getElementById('output').innerHTML += "<br>Qué te panzas, dale párate y camina que estás OBES@";
        }

        const pesosSaludables = calcularPesoSaludable(altura);
        document.getElementById('output').innerHTML += "<br>Para una altura de " + altura + " cm, el peso saludable debería estar entre " + pesosSaludables.pesoBajo + " kg y " + pesosSaludables.pesoAlto + " kg.";

        const datoUsuario = {
            peso: peso,
            altura: altura,
            imc: imc
        };

        localStorage.setItem('datoUsuario', JSON.stringify(datoUsuario));
    } else {
        document.getElementById('output').innerHTML = "Por favor, introduce valores válidos para peso y altura.";
    }
}

const rutinas = [
    {
        parteCuerpo: "Piernas",
        ejercicios: [
            { nombre: "Sentadillas", rondas: 3, repeticiones: 15 },
            { nombre: "Prensa de piernas", rondas: 3, repeticiones: 15 },
            { nombre: "Bulgaras", rondas: 2, repeticiones: 20 },
        ],
        modelo: "B"
    },
    {
        parteCuerpo: "Espalda",
        ejercicios: [
            { nombre: "Dominadas", rondas: 3, repeticiones: 15 },
            { nombre: "Remo con barra", rondas: 3, repeticiones: 15 },
            { nombre: "Pulldowns", rondas: 3, repeticiones: 15 },
        ],
        modelo: "B"
    },
    {
        parteCuerpo: "Pecho",
        ejercicios: [
            { nombre: "Press de banca", rondas: 3, repeticiones: 15 },
            { nombre: "Fondos en paralelas", rondas: 3, repeticiones: 15 },
            { nombre: "Aperturas con mancuernas", rondas: 3, repeticiones: 15 },
        ],
        modelo: "A"
    },
    {
        parteCuerpo: "Brazos",
        ejercicios: [
            { nombre: "Curl de bíceps", rondas: 3, repeticiones: 15 },
            { nombre: "Tríceps en polea", rondas: 3, repeticiones: 15 },
            { nombre: "Martillo", rondas: 3, repeticiones: 15 },
        ],
        modelo: "A"
    },
    {
        parteCuerpo: "Abdominales",
        ejercicios: [
            { nombre: "Plancha", rondas: 3, repeticiones: 15 },
            { nombre: "Crunches", rondas: 3, repeticiones: 15 },
            { nombre: "Elevación de piernas", rondas: 3, repeticiones: 15 },
        ],
        modelo: "C"
    },
    {
        parteCuerpo: "Cardio",
        ejercicios: [
            { nombre: "SaltarSoga", rondas: 3, Tiempomin: 10 },
            { nombre: "SombraBox", rondas: 3, Tiempomin: 1 },
            { nombre: "Sprint HIT", rondas: 2, Tiemposeg: 30 },
        ],
        modelo: "C"
    },
];

let modeloInput = document.getElementById('modeloInput');
let parteCuerpoInput = document.getElementById('parteCuerpoInput');

function mostrarRutinas(rutinas) {
    let output = "";
    rutinas.forEach((rutina) => output += rutina.modelo + " - " + rutina.parteCuerpo + " - " + JSON.stringify(rutina.ejercicios) + "<br>");
    document.getElementById('output').innerHTML = output;
}

function filtrarRutinas() {
    const modelo = modeloInput.value;
    const parteCuerpo = parteCuerpoInput.value;

    const resultado = rutinas
        .filter(filtrarModelo)
        .filter(filtrarParteCuerpo);
    if (resultado.length > 0) {
        mostrarRutinas(resultado);
    } else {
        document.getElementById('output').innerHTML = "No hay rutinas disponibles para el modelo y la parte del cuerpo especificados.";
    }
}

function filtrarModelo(rutina) {
    if (modeloInput.value) {
        return rutina.modelo === modeloInput.value;
    }
    return rutina;
}

function filtrarParteCuerpo(rutina) {
    if (parteCuerpoInput.value) {
        return rutina.parteCuerpo.toLowerCase() === parteCuerpoInput.value.toLowerCase();
    }
    return rutina;
}
console.log("En 90 dias veras el cambio CAMPEON@");
const storedDatoUsuario = localStorage.getItem('datoUsuario');
if (storedDatoUsuario) {
    const datoUsuario = JSON.parse(storedDatoUsuario);
    document.getElementById('output').innerHTML += "<br>Ultimo calculo hecho: Peso - " + datoUsuario.peso + ", Altura - " + datoUsuario.altura + ", IMC - " + datoUsuario.imc;
}

document.getElementById('output').innerHTML += "<br>Espero que el resultado te motive y no te mates. ¡Mucha suerte!";