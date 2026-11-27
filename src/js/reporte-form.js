import './proteccion.js'
import './main.js'
import { obtenerReporte, crearReporte, actualizarReporte } from './datos.js'

const formulario = document.querySelector('#form-reporte')
const error = document.querySelector('#error-reporte')
const boton = formulario.querySelector('button[type="submit"]')
const id = new URLSearchParams(location.search).get('id')

function mostrarError(texto) {
    error.textContent = texto
    error.hidden = false
}

async function cargarReporte() {
    document.title = 'Editar reporte · Reporta'
    document.querySelector('#titulo-form').textContent = 'Editar reporte'
    document.querySelector('#cancelar').href = `reporte.html?id=${id}`

    try {
        const reporte = await obtenerReporte(id)

        for (const [campo, valor] of Object.entries(reporte)) {
            if (formulario.elements[campo]) formulario.elements[campo].value = valor
        }
    } catch (e) {
        mostrarError(e.message)
        boton.disabled = true
    }
}

if (id) {
    await cargarReporte()
} else {
    formulario.elements.fecha.value = new Date().toLocaleDateString('en-CA')
}

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    error.hidden = true
    boton.disabled = true
    boton.textContent = 'Guardando...'

    try {
        const datos = Object.fromEntries(new FormData(formulario))
        const reporte = id ? await actualizarReporte(id, datos) : await crearReporte(datos)

        location.href = `reporte.html?id=${reporte.id}`
    } catch (e) {
        mostrarError(e.message)
        boton.disabled = false
        boton.textContent = 'Guardar'
    }
})
