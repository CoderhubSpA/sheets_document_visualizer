# Document Visualizer

Visualizador de documentos para Sheets

## Instalacion en Laravel
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