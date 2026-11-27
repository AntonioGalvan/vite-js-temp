import './proteccion.js'
import { iniciales, crearEtiqueta } from './main.js'
import { obtenerUsuarios } from './datos.js'

const tabla = document.querySelector('#tabla-usuarios')
const cuerpo = document.querySelector('#body-usuarios')
const mensaje = document.querySelector('#mensaje-usuarios')

async function mostrarUsuarios() {
    try {
        const usuarios = await obtenerUsuarios()

        if (usuarios.length === 0) {
            mensaje.textContent = 'Todavía no hay usuarios.'
            return
        }

        for (const usuario of usuarios) {
            const fila = document.createElement('tr')

            const celdaNombre = document.createElement('td')
            const nombre = document.createElement('div')
            nombre.className = 'nombre'

            const avatar = document.createElement('span')
            avatar.className = 'avatar'
            avatar.textContent = iniciales(usuario.nombre)

            const enlace = document.createElement('a')
            enlace.href = `usuario.html?id=${usuario.id}`
            enlace.textContent = usuario.nombre

            nombre.append(avatar, enlace)
            celdaNombre.append(nombre)

            const celdaCorreo = document.createElement('td')
            celdaCorreo.textContent = usuario.correo

            const celdaRol = document.createElement('td')
            celdaRol.append(crearEtiqueta(usuario.rol))

            const celdaEstado = document.createElement('td')
            celdaEstado.append(crearEtiqueta(usuario.estado))

            fila.append(celdaNombre, celdaCorreo, celdaRol, celdaEstado)
            cuerpo.append(fila)
        }

        mensaje.hidden = true
        tabla.hidden = false
    } catch (error) {
        mensaje.textContent = error.message
    }
}

await mostrarUsuarios()
