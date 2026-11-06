import { obtenerReporte } from './datos.js'

const mensaje = document.querySelector('#mensaje-reporte')
const detalle = document.querySelector('#detalle-reporte')

async function mostrarReporte() {
    // Lee el id de la dirección de reporte.html?id=2 
    const id = Number(new URLSearchParams(location.search).get('id'))

    try {
        const reporte = await obtenerReporte(id)

        if (!reporte) {
            mensaje.textContent = 'No existe ese reporte.'
            return
        }

        document.querySelector('#titulo-reporte').textContent = reporte.titulo
        document.querySelector('#colonia-reporte').textContent = reporte.colonia
        document.querySelector('#estado-reporte').textContent = reporte.estado
        document.querySelector('#fecha-reporte').textContent = reporte.fecha

        mensaje.hidden = true
        detalle.hidden = false
    } catch {
        mensaje.textContent = 'No se pudo cargar el reporte. Intenta más tarde.'
    }
}

await mostrarReporte()
