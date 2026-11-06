import { obtenerReportes } from './datos.js'

const tabla = document.querySelector('#tabla-reportes')
const cuerpo = tabla.querySelector('#body-reportes')
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

            const filaReporte = [reporte.titulo, reporte.colonia, reporte.estado, reporte.fecha]

            for (const valor of filaReporte) {
                const celda = document.createElement('td')
                celda.textContent = valor
                fila.append(celda)
            }

            // Convierte el título en un enlace al detalle (reporte.html?id=...).
            // Comentar si no es necesario.
            const enlace = document.createElement('a')
            enlace.href = `reporte.html?id=${reporte.id}`
            enlace.textContent = reporte.titulo
            fila.cells[0].replaceChildren(enlace)

            cuerpo.append(fila)
        }

        mensaje.hidden = true
        tabla.hidden = false
    } catch {
        mensaje.textContent = 'No se pudieron cargar los reportes. Intenta más tarde.'
    }
}

await mostrarReportes()
