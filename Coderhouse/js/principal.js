

let inicio = prompt("Bienvenido ¿cual es tu nombre?")
console.log(inicio)

let pacientes = ["Paciente 1", "Paciente 2", "Paciente 3","Paciente 4"]
//let pesos = [50, 80, 100,70]
//let alturas = [1.3, 1.5, 1.9,1.2]

function calcularIMC(peso, altura) {
    return peso / (altura * altura)
}

for (let i = 0; i < pacientes.length; i++) {
    let paciente = pacientes[i]
    let peso = parseInt(prompt("Ingrese el peso en Kg de"+paciente))
    let altura = parseFloat(prompt("Ingrese la altura en Metros de"+paciente))

    if (peso < 0 || peso > 500) {
        console.log("El peso de " + paciente + " es incorrecto")
        continue
    }

    if (altura < 0 || altura > 3.0) {
        console.log("La altura de " + paciente + " es incorrecta")
        continue
    }

    let imc= calcularIMC(peso,altura)
    console.log("El IMC de " + paciente + " es: " + imc.toFixed(2))


    if (imc > 25) {
        console.log(paciente + " tiene sobrepeso")
    } else if (imc < 18.5) {
        console.log(paciente + " tiene bajo peso")
    } else {
        console.log(paciente + " tiene un peso saludable")
    }
    if (i < pacientes.length - 1) {
        prompt("Presione Enter para continuar con el siguiente paciente...")
    }
    }

        git add clinica
        git commit -m clinica