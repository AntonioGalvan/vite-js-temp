import { iniciales, crearEtiqueta, formatearFecha } from './main.js'
import { obtenerUsuario } from './datos.js'

const mensaje = document.querySelector('#mensaje-usuario')
const detalle = document.querySelector('#detalle-usuario')

async function mostrarUsuario() {
    const id = Number(new URLSearchParams(location.search).get('id'))

    try {
        const usuario = await obtenerUsuario(id)

        if (!usuario) {
            mensaje.textContent = 'No existe ese usuario.'
            return
        }

        document.title = `${usuario.nombre} · Reporta`
        document.querySelector('#avatar-detalle').textContent = iniciales(usuario.nombre)
        document.querySelector('#nombre-detalle').textContent = usuario.nombre
        document.querySelector('#correo-detalle').textContent = usuario.correo
        document.querySelector('#rol-detalle').append(crearEtiqueta(usuario.rol))
        document.querySelector('#estado-detalle').append(crearEtiqueta(usuario.estado))
        document.querySelector('#telefono-detalle').textContent = usuario.telefono
        document.querySelector('#registro-detalle').textContent = formatearFecha(usuario.fechaRegistro)

        mensaje.hidden = true
        detalle.hidden = false
    } catch {
        mensaje.textContent = 'No se pudo cargar el usuario. Intenta más tarde.'
    }
}

await mostrarUsuario()
