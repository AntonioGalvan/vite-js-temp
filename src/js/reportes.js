import { formatearFecha, crearEtiqueta } from './main.js'
import { obtenerReportes, eliminarReporte } from './datos.js'
import { puedeEntrar } from './permisos.js'
import { obtenerUsuario as obtenerSesion } from './sesion.js'

const tabla = document.querySelector('#tabla-reportes')
const cuerpo = document.querySelector('#body-reportes')
const mensaje = document.querySelector('#mensaje-reportes')
const puedeEliminar = puedeEntrar('eliminar-reporte', obtenerSesion().role)

function crearAcciones(reporte, fila) {
    const celda = document.createElement('td')
    const acciones = document.createElement('div')
    acciones.className = 'acciones-fila'

    const editar = document.createElement('a')
    editar.className = 'boton boton-secundario boton-chico'
    editar.href = `reporte-form.html?id=${reporte.id}`
    editar.textContent = 'Editar'
    acciones.append(editar)

    if (puedeEliminar) {
        const eliminar = document.createElement('button')
        eliminar.type = 'button'
        eliminar.className = 'boton boton-peligro boton-chico'
        eliminar.textContent = 'Eliminar'

        eliminar.addEventListener('click', async () => {
            if (!confirm(`¿Eliminar el reporte "${reporte.titulo}"? Esta acción no se puede deshacer.`)) return

            eliminar.disabled = true
            try {
                await eliminarReporte(reporte.id)
                fila.remove()

                if (cuerpo.children.length === 0) {
                    tabla.hidden = true
                    mensaje.textContent = 'Todavía no hay reportes.'
                    mensaje.hidden = false
                }
            } catch (e) {
                alert(e.message)
                eliminar.disabled = false
            }
        })

        acciones.append(eliminar)
    }

    celda.append(acciones)
    return celda
}

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

            fila.append(celdaTitulo, celdaColonia, celdaEstado, celdaFecha, crearAcciones(reporte, fila))
            cuerpo.append(fila)
        }

        mensaje.hidden = true
        tabla.hidden = false
    } catch (error) {
        mensaje.textContent = error.message
    }
}

await mostrarReportes()
