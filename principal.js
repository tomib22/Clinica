let botonAdicionar = document.querySelector("#adicionar-paciente")

botonAdicionar.addEventListener("click", function (event) {
    event.preventDefault()

    let form = document.querySelector("#form-adicionar")

    let nombre = form.nombre.value;
    let peso = parseFloat(form.peso.value);
    let altura = parseFloat(form.altura.value);
    let gordura = form.gordura.value;
    let imc = calcularIMC(peso, altura);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || peso > 200 || altura <= 0 || altura > 4) {
        alert("Por favor, introduzca un peso y una altura validos")
        return
    }

    let nuevoPaciente = {
        nombre: nombre,
        peso: peso,
        altura: altura,
        gordura: gordura,
        imc: imc,
    }

    agregarPacienteATabla(nuevoPaciente);
    guardarPaciente(nuevoPaciente);
})



window.addEventListener('load', function () {
    localStorage.clear()
    cargarPacientes()
})

function cargarPacientes() {
    let pacientesGuardados = JSON.parse(localStorage.getItem('pacientes'))
    if (pacientesGuardados) {
        pacientesGuardados.forEach(paciente => {
            agregarPacienteATabla(paciente)
        })
    }
}

function agregarPacienteATabla(paciente) {
    let tabla = document.querySelector("#tabla-pacientes")

    let pacienteTr = document.createElement("tr")
    let nombreTd = document.createElement("td")
    let pesoTd = document.createElement("td")
    let alturaTd = document.createElement("td")
    let gorduraTd = document.createElement("td")
    let imcTd = document.createElement("td")

    nombreTd.textContent = paciente.nombre
    pesoTd.textContent = paciente.peso
    alturaTd.textContent = paciente.altura
    gorduraTd.textContent = paciente.gordura
    imcTd.textContent = paciente.imc

    pacienteTr.appendChild(nombreTd)
    pacienteTr.appendChild(pesoTd)
    pacienteTr.appendChild(alturaTd)
    pacienteTr.appendChild(gorduraTd)
    pacienteTr.appendChild(imcTd)

    tabla.appendChild(pacienteTr)
}



function guardarPaciente(paciente) {
    let pacientesGuardados = JSON.parse(localStorage.getItem('pacientes')) || []
    pacientesGuardados.push(paciente)
    localStorage.setItem('pacientes', JSON.stringify(pacientesGuardados))
    document.querySelector("#form-adicionar").reset()
}

let pacientes = document.querySelectorAll(".paciente")


for (let i = 0; i < pacientes.length; i++) {
    let paciente = pacientes[i]

    let tdPeso = paciente.querySelector(".info-peso")
    let peso = tdPeso.textContent

    let tdAltura = paciente.querySelector(".info-altura")
    let altura = tdAltura.textContent

    let tdIMC = paciente.querySelector(".info-imc")


    pesoEsValido = true
    alturaEsValida = true

    if ((peso < 0) || (peso > 1000)) {
        console.log("Peso incorrecto")
        tdIMC.textContent = "Peso incorrecto"
        pesoEsValido = false
        paciente.classList.add("paciente-incorrecto")
    }

    if ((altura < 0) || (altura > 3.00)) {
        console.log("Altura incorrecta")
        tdIMC.textContent = "Altura incorrecta"
        alturaEsValida = false
        paciente.classList.add("paciente-incorrecto")
    }

    if (pesoEsValido && alturaEsValida) {
        tdIMC.textContent = calcularIMC(peso,altura)
    }

}

function calcularIMC(peso, altura) {
    var imc = peso / (altura * altura)
    return imc.toFixed(2)
}









