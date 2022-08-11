# Document Visualizer

Visualizador de documentos para Sheets

## Instalacion
```js
require('./bootstrap');
import Vue from 'vue';
# Vue Lib
import DocumentVisualizer  from 'sheets_document_visualizer';
# Estilos
import 'sheets_document_visualizer/src/sass/app.scss';
# ...
Vue.use(DocumentVisualizer)
#...
new Vue({
    el: '#app'
});

```
Tambien es posible la instalacion individual de componentes
```js
import DocumentVisualizer  from 'sheets_document_visualizer';
Vue.component('alias-component', DocumentVisualizer.PdfVisualizer)
```

## Listado de componentes accesibles
| Componente | Funcionalidad |
|---|---|
|DocumentVisualizer| Realiza la solicitud a un endpoint dado y busca el visualizador para el archivo entregado desde el backend|
|PdfVisualizer| Muestra un visor de documentos pdf |
|DocxVisualizer| Parsea un documento **.docx** a HTML para realizar una previsualizacion del archivo|
|TextVisualizer| Muestra el contenido de un archivo **.txt** o **.csv**|
|XlsxVisualizer| Muestra un visor de documentos **.xlsx**|
## Posibles errores al momento de instalar
```bash
ERROR in ../sheets_document_visualizer/dist/index.umd.min.js 2121:82-89
Module not found: Error: Can't resolve 'process/browser.js' in '.../sheets_document_visualizer/dist'
```
Agregar en webpack.mix.js
```js
mix.options({
    legacyNodePolyfills: false
});
mix.js()...
```
[Fuente](https://laravel-mix.com/docs/6.0/legacy-node-polyfills)