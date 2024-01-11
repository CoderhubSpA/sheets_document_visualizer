export class Formats {
    static formats = [
        'text/plain',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/csv',
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/svg+xml',
        'image/webp',
        // 'image/tiff',
        // 'application/vnd.ms-powerpoint',
        // 'application/mspowerpoint',
        // 'application/powerpoint',
        // 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]

    /**
     * Verifica si un formato es soportado
     * segun un listado de formatos desarrollado (formats) dentro de la lib
     * @param format
     * @returns {boolean}
     */
    static isSupported(format) {
        return this.formats.includes(format);
    }

    static imports = {
        'text/plain': 'TextVisualizer',
        'text/csv': 'TextVisualizer',
        'application/csv': 'TextVisualizer',
    }
}