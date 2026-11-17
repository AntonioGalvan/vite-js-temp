const usuarios = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@example.com', telefono: '222 123 4567', rol: 'admin', estado: 'Activo', fechaRegistro: '2026-08-12' },
    { id: 2, nombre: 'María López', correo: 'maria.lopez@example.com', telefono: '222 234 5678', rol: 'ciudadano', estado: 'Activo', fechaRegistro: '2026-09-03' },
    { id: 3, nombre: 'Carlos Sánchez', correo: 'carlos.sanchez@example.com', telefono: '222 345 6789', rol: 'tecnico', estado: 'Activo', fechaRegistro: '2026-09-21' },
    { id: 4, nombre: 'Ana Torres', correo: 'ana.torres@example.com', telefono: '222 456 7890', rol: 'ciudadano', estado: 'Activo', fechaRegistro: '2026-10-05' },
    { id: 5, nombre: 'Luis Ramírez', correo: 'luis.ramirez@example.com', telefono: '222 567 8901', rol: 'ciudadano', estado: 'Inactivo', fechaRegistro: '2026-10-19' },
]

const reportes = [
    { id: 1, titulo: 'Fuga en calle 5 de Mayo', descripcion: 'Sale agua de la banqueta frente al número 120 desde la mañana.', colonia: 'Centro', estado: 'Pendiente', fecha: '2026-10-28' },
    { id: 2, titulo: 'Sin agua desde ayer', descripcion: 'Toda la cuadra lleva más de 24 horas sin servicio.', colonia: 'Las Flores', estado: 'En proceso', fecha: '2026-10-30' },
    { id: 3, titulo: 'Agua turbia', descripcion: 'El agua sale color café en las mañanas.', colonia: 'San José', estado: 'Atendido', fecha: '2026-11-02' },
    { id: 4, titulo: 'Tapa de registro rota', descripcion: 'La tapa del registro está hundida y es peligrosa para los autos.', colonia: 'La Paz', estado: 'Pendiente', fecha: '2026-11-06' },
    { id: 5, titulo: 'Baja presión', descripcion: 'El agua apenas llega al tinaco en la tarde.', colonia: 'Centro', estado: 'En proceso', fecha: '2026-11-10' },
    { id: 6, titulo: 'Fuga en toma domiciliaria', descripcion: 'La toma de la esquina gotea todo el día.', colonia: 'Las Flores', estado: 'Atendido', fecha: '2026-11-12' },
]

export async function obtenerUsuarios() {
    return usuarios
}

export async function obtenerUsuario(id) {
    return usuarios.find((usuario) => usuario.id === id)
}

export async function obtenerReportes() {
    return reportes
}

export async function obtenerReporte(id) {
    return reportes.find((reporte) => reporte.id === id)
}
