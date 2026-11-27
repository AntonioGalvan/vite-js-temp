import './proteccion.js'
import { formatearFecha, crearEtiqueta } from './main.js'
import { obtenerReporte, eliminarReporte } from './datos.js'
import { puedeEntrar } from './permisos.js'
import { obtenerUsuario } from './sesion.js'

const mensaje = document.querySelector('#mensaje-reporte')
const detalle = document.querySelector('#detalle-reporte')

async function mostrarReporte() {
    const id = Number(new URLSearchParams(location.search).get('id'))

    try {
        const reporte = await obtenerReporte(id)

        document.title = `${reporte.titulo} · Reporta`
        document.querySelector('#titulo-reporte').textContent = reporte.titulo
        document.querySelector('#estado-reporte').append(crearEtiqueta(reporte.estado))
        document.querySelector('#descripcion-reporte').textContent = reporte.descripcion
        document.querySelector('#colonia-reporte').textContent = reporte.colonia
        document.querySelector('#fecha-reporte').textContent = formatearFecha(reporte.fecha)
        document.querySelector('#folio-reporte').textContent = `#${String(reporte.id).padStart(4, '0')}`
        document.querySelector('#editar-reporte').href = `reporte-form.html?id=${reporte.id}`
        configurarEliminar(reporte)

        mensaje.hidden = true
        detalle.hidden = false
    } catch (error) {
        mensaje.textContent = error.message
    }
}

function configurarEliminar(reporte) {
    const boton = document.querySelector('#eliminar-reporte')
    const error = document.querySelector('#error-reporte')

    if (!puedeEntrar('eliminar-reporte', obtenerUsuario().role)) {
        boton.remove()
        return
    }

    boton.addEventListener('click', async () => {
        if (!confirm(`¿Eliminar el reporte "${reporte.titulo}"? Esta acción no se puede deshacer.`)) return

        error.hidden = true
        boton.disabled = true

        try {
            await eliminarReporte(reporte.id)
            location.href = 'reportes.html'
        } catch (e) {
            error.textContent = e.message
            error.hidden = false
            boton.disabled = false
        }
    })
}

await mostrarReporte()
