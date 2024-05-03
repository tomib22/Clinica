async function cargarPacientes() {
    
    try {
        let response = await fetch ("./json1.json")
        if (!response.ok) {
            throw new Error('Error al obtener datos del archivo JSON')
        }
        let data = await response.json()
        procesarDatos(data)
    } catch (error) {
        console.error('Error en la carga de datos JSON:', error)
    }
}

function procesarDatos(data) {
    // Recorre cada paciente en los datos cargados
    data.forEach(paciente => {
        // Agrega el paciente a la tabla de pacientes
        agregarPacienteATabla(paciente)
        // Guarda el paciente en el almacenamiento local.
        guardarPaciente(paciente)
    })
}

