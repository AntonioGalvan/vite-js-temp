import { api } from './api.js'
import { guardarSesion, obtenerUsuario } from './sesion.js'

if (obtenerUsuario()) location.replace('home.html')

const formulario = document.querySelector('#form-login')
const error = document.querySelector('#error-login')
const boton = formulario.querySelector('button')

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    error.hidden = true
    boton.disabled = true
    boton.textContent = 'Entrando...'

    try {
        const datos = Object.fromEntries(new FormData(formulario))
        const respuesta = await api.post('/api/auth/login', datos)

        guardarSesion(respuesta.token, respuesta.user)
        location.href = 'home.html'
    } catch (e) {
        error.textContent = e.message
        error.hidden = false
    } finally {
        boton.disabled = false
        boton.textContent = 'Entrar'
    }
})