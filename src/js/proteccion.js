import { obtenerUsuario } from './sesion.js'
import { puedeEntrar } from './permisos.js'

const usuario = obtenerUsuario()

if (!usuario) {
    location.replace('login.html')
    throw new Error('Sin sesión')
}

const paginaActual = location.pathname.split('/').pop().replace('.html', '')

if (!puedeEntrar(paginaActual, usuario.role)) {
    location.replace('home.html')
    throw new Error('Sin permiso para esta página')
}
