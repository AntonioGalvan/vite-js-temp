export const permisos = {
    usuarios: ['usuario'],
    usuario: ['usuario'],
}

export function puedeEntrar(pagina, rol) {
    const roles = permisos[pagina]
    return !roles || roles.includes(rol)
}