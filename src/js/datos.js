import { api } from './api.js'

export async function obtenerUsuarios() {
    return api.get('/api/plantilla/usuarios')
}

export async function obtenerUsuario(id) {
    return api.get(`/api/plantilla/usuarios/${id}`)
}

export async function obtenerReportes() {
    return api.get('/api/plantilla/reportes')
}

export async function obtenerReporte(id) {
    return api.get(`/api/plantilla/reportes/${id}`)
}

export async function crearReporte(datos) {
    return api.post('/api/plantilla/reportes', datos)
}

export async function actualizarReporte(id, datos) {
    return api.put(`/api/plantilla/reportes/${id}`, datos)
}
