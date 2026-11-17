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
