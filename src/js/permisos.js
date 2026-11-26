export const permisos = {
    usuarios: ['admin'],
    usuario: ['admin'],
    'eliminar-reporte': ['admin'],
}

export function puedeEntrar(pagina, rol) {
    const roles = permisos[pagina]
    return !roles || roles.includes(rol)
}