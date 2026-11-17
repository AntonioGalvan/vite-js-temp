import { formatearFecha, crearEtiqueta } from './main.js'
import { obtenerReportes, obtenerUsuarios } from './datos.js'

const mensaje = document.querySelector('#mensaje-recientes')
const lista = document.querySelector('#lista-recientes')

async function mostrarResumen() {
    try {
        const reportes = await obtenerReportes()
        const usuarios = await obtenerUsuarios()

        const pendientes = reportes.filter((reporte) => reporte.estado === 'Pendiente')

        document.querySelector('#total-reportes').textContent = reportes.length
        document.querySelector('#total-pendientes').textContent = pendientes.length
        document.querySelector('#total-usuarios').textContent = usuarios.length

        const recientes = [...reportes].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3)

        for (const reporte of recientes) {
            const item = document.createElement('li')

            const texto = document.createElement('div')
            texto.className = 'detalle-item'

            const enlace = document.createElement('a')
            enlace.href = `reporte.html?id=${reporte.id}`
            enlace.textContent = reporte.titulo

            const extra = document.createElement('small')
            extra.textContent = `${reporte.colonia} · ${formatearFecha(reporte.fecha)}`

            texto.append(enlace, extra)
            item.append(texto, crearEtiqueta(reporte.estado))
            lista.append(item)
        }

        mensaje.hidden = true
    } catch {
        mensaje.textContent = 'No se pudo cargar el resumen. Intenta más tarde.'
    }
}

await mostrarResumen()
