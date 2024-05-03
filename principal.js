let botonAdicionar = document.querySelector("#adicionar-paciente")

botonAdicionar.addEventListener("click", function (event) {
    event.preventDefault()

    let form = document.querySelector("#form-adicionar")

    let nombre = form.nombre.value
    let peso = parseFloat(form.peso.value)
    let altura = parseFloat(form.altura.value)
    let gordura = form.gordura.value
    let imc = calcularIMC(peso, altura)

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || peso > 200 || altura <= 0 || altura > 4) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La altura y el peso son inválidos",
        })
        return
    } else {
        Swal.fire({
            title: "Araucaria Nutricion",
            text: "El paciente se ha cargado con éxito",
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
        })
    }

    let paciente = {
        nombre: nombre,
        peso: peso,
        altura: altura,
        gordura: gordura,
        imc: imc,
    }
    agregarPacienteATabla(paciente)
    guardarPaciente(paciente)
})


window.addEventListener('load', function () {
 cargarPacientes()
})

    function calcularIMC(peso, altura) {
        let imc = peso / (altura * altura)
        return imc.toFixed(2)
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

function cargarPacientes() {
    fetch("./json1.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(paciente => {
                agregarPacienteATabla(paciente)
            })
        })
        .catch(error => {
            console.error('Error al cargar pacientes:', error)
        })
}

function guardarPaciente(paciente) {
    // Obtener los pacientes existentes del almacenamiento local
    let pacientesGuardados = JSON.parse(localStorage.getItem('pacientes')) || []

    // Agregar el nuevo paciente a la lista
    pacientesGuardados.push(paciente)

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem('pacientes', JSON.stringify(pacientesGuardados))
}

    let pacientes = document.querySelectorAll(".paciente")

    for (let i = 0; i < pacientes.length; i++) {
        let paciente = pacientes[i]
        let tdPeso = paciente.querySelector(".info-peso")
        let peso = parseFloat(tdPeso.textContent)
        let tdAltura = paciente.querySelector(".info-altura")
        let altura = parseFloat(tdAltura.textContent)
        let tdIMC = paciente.querySelector(".info-imc")
        let pesoEsValido = true
        let alturaEsValida = true

        if ((peso < 0) || (peso > 1000)) {
            console.log("Peso incorrecto")
            tdIMC.textContent = "Peso incorrecto"
            pesoEsValido = false;
            paciente.classList.add("paciente-incorrecto")
        }

        if ((altura < 0) || (altura > 3.00)) {
            console.log("Altura incorrecta")
            tdIMC.textContent = "Altura incorrecta"
            alturaEsValida = false;
            paciente.classList.add("paciente-incorrecto")
        }

        if (pesoEsValido && alturaEsValida) {
            tdIMC.textContent = calcularIMC(peso, altura)
        }
    

    }

