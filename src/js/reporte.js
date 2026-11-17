import { formatearFecha, crearEtiqueta } from './main.js'
import { obtenerReporte } from './datos.js'

const mensaje = document.querySelector('#mensaje-reporte')
const detalle = document.querySelector('#detalle-reporte')

async function mostrarReporte() {
    const id = Number(new URLSearchParams(location.search).get('id'))

    try {
        const reporte = await obtenerReporte(id)

        if (!reporte) {
            mensaje.textContent = 'No existe ese reporte.'
            return
        }

        document.title = `${reporte.titulo} · Reporta`
        document.querySelector('#titulo-reporte').textContent = reporte.titulo
        document.querySelector('#estado-reporte').append(crearEtiqueta(reporte.estado))
        document.querySelector('#descripcion-reporte').textContent = reporte.descripcion
        document.querySelector('#colonia-reporte').textContent = reporte.colonia
        document.querySelector('#fecha-reporte').textContent = formatearFecha(reporte.fecha)
        document.querySelector('#folio-reporte').textContent = `#${String(reporte.id).padStart(4, '0')}`

        mensaje.hidden = true
        detalle.hidden = false
    } catch {
        mensaje.textContent = 'No se pudo cargar el reporte. Intenta más tarde.'
    }
}

await mostrarReporte()
