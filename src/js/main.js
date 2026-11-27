import { obtenerUsuario, cerrarSesion } from './sesion.js'
import { puedeEntrar } from './permisos.js'

const usuario = obtenerUsuario()

document.querySelector('#nombre-usuario').textContent = usuario.name
document.querySelector('#avatar-usuario').textContent = iniciales(usuario.name)
document.querySelector('#cerrar-sesion').addEventListener('click', cerrarSesion)

for (const enlace of document.querySelectorAll('.menu a')) {
    const pagina = enlace.getAttribute('href').replace('.html', '')
    if (!puedeEntrar(pagina, usuario.role)) enlace.remove()
}

const seccion = document.body.dataset.seccion
document.querySelector(`.menu a[data-seccion="${seccion}"]`)?.classList.add('activo')

export function formatearFecha(fecha) {
    return new Date(`${fecha}T00:00`).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

export function iniciales(nombre) {
    return nombre
        .split(' ')
        .slice(0, 2)
        .map((palabra) => palabra[0])
        .join('')
        .toUpperCase()
}

export function crearEtiqueta(texto) {
    const etiqueta = document.createElement('span')
    const clase = texto.toLowerCase().replace('en ', '')
    etiqueta.className = `etiqueta etiqueta-${clase}`
    etiqueta.textContent = texto
    return etiqueta
}