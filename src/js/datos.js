// Datos de prueba con la misma forma que devolverá la API.
// En el ordinario solo cambia el interior de cada función por una llamada con fetch;
// las páginas que las usan no tienen que cambiar.

const reportes = [
    { id: 1, titulo: 'Fuga en calle 5 de Mayo', colonia: 'Centro', estado: 'Pendiente', fecha: '2026-10-28' },
    { id: 2, titulo: 'Sin agua desde ayer', colonia: 'Las Flores', estado: 'En proceso', fecha: '2026-10-30' },
    { id: 3, titulo: 'Agua turbia', colonia: 'San José', estado: 'Atendido', fecha: '2026-11-02' },
]

export async function obtenerReportes() {
    return reportes
}

export async function obtenerReporte(id) {
    return reportes.find((reporte) => reporte.id === id)
}
