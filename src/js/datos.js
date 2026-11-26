import { api } from './api.js'

export async function obtenerUsuarios() {
    return api.get('/api/usuarios')
}

export async function obtenerUsuario(id) {
    return api.get(`/api/usuarios/${id}`)
}

export async function obtenerReportes() {
    return api.get('/api/reportes')
}

export async function obtenerReporte(id) {
    return api.get(`/api/reportes/${id}`)
}

export async function crearReporte(datos) {
    return api.post('/api/reportes', datos)
}

export async function actualizarReporte(id, datos) {
    return api.put(`/api/reportes/${id}`, datos)
}

export async function eliminarReporte(id) {
    return api.delete(`/api/reportes/${id}`)
}
