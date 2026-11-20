import { formatearFecha, crearEtiqueta } from './main.js'
import { obtenerReportes } from './datos.js'

const tabla = document.querySelector('#tabla-reportes')
const cuerpo = document.querySelector('#body-reportes')
const mensaje = document.querySelector('#mensaje-reportes')

async function mostrarReportes() {
    try {
        const reportes = await obtenerReportes()

        if (reportes.length === 0) {
            mensaje.textContent = 'Todavía no hay reportes.'
            return
        }

        for (const reporte of reportes) {
            const fila = document.createElement('tr')

            const celdaTitulo = document.createElement('td')
            const enlace = document.createElement('a')
            enlace.href = `reporte.html?id=${reporte.id}`
            enlace.textContent = reporte.titulo
            celdaTitulo.append(enlace)

            const celdaColonia = document.createElement('td')
            celdaColonia.textContent = reporte.colonia

            const celdaEstado = document.createElement('td')
            celdaEstado.append(crearEtiqueta(reporte.estado))

            const celdaFecha = document.createElement('td')
            celdaFecha.textContent = formatearFecha(reporte.fecha)

            fila.append(celdaTitulo, celdaColonia, celdaEstado, celdaFecha)
            cuerpo.append(fila)
        }

        mensaje.hidden = true
        tabla.hidden = false
    } catch (error) {
        mensaje.textContent = error.message
    }
}

await mostrarReportes()
