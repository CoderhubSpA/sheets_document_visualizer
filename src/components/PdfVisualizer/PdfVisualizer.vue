<template>
    <div class="pdf-viewer">
        <!-- Toolbar: Muestra barra de herramientas para interaccion con el document -->
      <slot name="toolbar">
        <div class="pdf-toolbar">
          <div class="pdf-toolbar-items">

            <div class="left-options">
              <div class="pdf-toolbar-item" @click="showSideBar = !showSideBar">
                <i class="bi bi-list"></i>
              </div>
              <div class="pdf-sidebar-container" ref="sidebar" id="sidebar" :class="{'active': showSideBar }">
                <!-- THUMBNAILS -->
              </div>
            </div>

            <div class="center-options">
              <div class="pdf-toolbar-item" @click="nextPage" :class="{'disable' : !can_go_next_page }">
                <i class="bi bi-arrow-down-short"></i>
              </div>
              <div class="pdf-toolbar-item" @click="prevPage" :class="{'disable' : !can_go_prev_page }">
                <i class="bi bi-arrow-up-short"></i>
              </div>
              <div class="pdf-toolbar-item">
                <input type="number" class="go-to-page" min="1" v-model="page" />
              </div>
              <!-- Num. Pages -->
              <div class="pdf-toolbar-item">
                <span v-text="numPages"></span>
                <i class="bi bi-file-earmark-fill page-number"></i>
              </div>
              <!-- Zoom In -->
              <div class="pdf-toolbar-item" @click="zoomIn">
                <i class="bi bi-zoom-in"></i>
              </div>
              <!-- Zoom Out -->
              <div class="pdf-toolbar-item" @click="zoomOut">
                <i class="bi bi-zoom-out"></i>
              </div>
            </div>

            <div class="right-options">
              <!-- Imprimir -->
              <div class="pdf-toolbar-item" @click="print">
                <i class="bi bi-printer-fill"></i>
              </div>
              <!-- Descargar -->
              <div class="pdf-toolbar-item" @click="download">
                <i class="bi bi-cloud-arrow-down-fill"></i>
              </div>
            </div>

          </div>
        </div>
      </slot>
      <!-- Content: Zona de renderizado de todas las paginas del documento -->
      <slot name="content">
        <div class="pdf-content" ref="pdf-content">
          <!--  -->
        </div>
      </slot>
      <!--   Footer: Pie de pagina del documento. Por defecto esta en blanco     -->
      <slot name="footer">

      </slot>
    </div>
</template>
<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';
import CommonProps from '../CommonProps.vue';
import printJS from "print-js";

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default {
    name: 'pdf-visualizer',
    mixins: [CommonProps],
    data: () => ({
        pdf: null,
        numPages: 0,
        thumbnails: [],
        scale: 1,
        page: 1,
        showSideBar: false
    }),
    computed: {
      /**
       * Permitir ir a la siguiente pagina, si esta existe
       * @returns {boolean}
       */
        can_go_next_page() {
            return (this.page + 1) <= this.numPages
        },
      /**
       * Permitir ir a la pagina anterior, si esta existe
       * @returns {boolean}
       */
        can_go_prev_page() {
            return 1 <= (this.page - 1);
        }
    },
    watch: {
        page(value) {
            if (value > 0 && value <= this.numPages) {
                const page = document.querySelector(`canvas[document-page="${value}"]`);
                page.scrollIntoView();
                
            }
        },
      /**
       * Mostrar u ocultar el sidebar segun el estado
       * de showSideBar
       * @param val
       */
        showSideBar(val) {
          document.getElementById('sidebar').style.width = val ? '150px' : '0px';
        }
    },
    methods: {
        /**
         * Desplaza el focus en el visor 
         * a la siguiente pagina
         */
        nextPage() {
            if (this.page + 1 <= this.numPages) {
                this.page++;
            }
        },
        /**
         * Desplaza el focus en el visor
         * a la pagina anterior
         */
        prevPage() {
            if (1 >= this.page - 1) {
                this.page--;
            }
        },
        /**
         * Acercamiento (zoom in) del documento
         */
        zoomIn() {
            if (this.scale < 2) {
                this.scale += 0.25
                // elimina el renderizado anterior
                this.$refs['pdf-content'].innerHTML = '';
                // realiza la carga del documento con la nueva escala
                this.load();
            }
            
        },
        /**
         * Alejamiento del documento
         */
        zoomOut() {
            if (this.scale > 0) {
                this.scale -= 0.25
                // elimina el renderizado anterior
                this.$refs['pdf-content'].innerHTML = '';
                // realiza la carga del documento con la nueva escala
                this.load();
            }
        },
        /**
         * Carga de documento en el componente
         */
        async load() {
            const data = URL.createObjectURL(this.blob);
            this.pdf = await pdfjsLib.getDocument(data);
            this.$refs['sidebar'].innerHTML = '';
            this.renderDocument()
        },
        /**
         * Renderiza una pagina concreta del documento pdf
         * @param {Object} ctx objeto pdf (loadingTask)
         * @param {Number} num numero de pagina
         * @param {HTML} canvas elemento HTML donde se hara la renderizacion
         */
        renderPage(ctx, num, canvas) {
            ctx.getPage(num).then((page) => {
                
                const viewport = page.getViewport({scale: this.scale});
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // const outputScale = window.devicePixelRatio || 1;
                // const transform = outputScale !== 1
                //         ? [outputScale, 0, 0, outputScale, 0, 0]
                //         : null;
                page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport: viewport,
                    // transform: transform,
                });
            })
        },
        /**
         * Renderiza los thumbnails de las paginas
         * draw page to fit into 96x96 canvas
         * @param {Object} ctx objeto pdf (loadingTask)
         * @param {Number} num numero de pagina
         * @param {HTML} thumb elemento HTML donde se hara la renderizacion
         */
        renderThumbnail(ctx, num, thumb) {
            ctx.getPage(num).then((page) => {
                // const viewport = page.getViewport(1);

                thumb.height = 96;
                thumb.width = 80;
                // const scale = Math.min(thumb.width / viewport.width, thumb.height / viewport.height);
                
                page.render({
                    canvasContext: thumb.getContext('2d'),
                    viewport: page.getViewport({scale: 0.126}),
                    
                })
            })
        },
        /**
         * Procesa el documento e inicia el trabajo de 
         * renderizado de las paginas
         */
        renderDocument() {
            this.pdf.promise.then((pdf) => {
                // obtiene el numero de paginas del documento
                this.numPages = pdf.numPages;
                for (let page = 1; page <= pdf.numPages; page++) {
                    const canvas = document.createElement('canvas');
                    canvas.className = 'pdf-page';
                    canvas.setAttribute('document-page', page)
                    this.$refs['pdf-content'].appendChild(canvas);
                    this.renderPage(pdf, page, canvas);

                    const thumb = document.createElement('canvas')
                    thumb.className = 'pdf-thumbnail'
                    thumb.addEventListener('click', () => {
                        this.page = page
                    })
                    
                    this.$refs['sidebar'].appendChild(thumb);
                    this.renderThumbnail(pdf, page, thumb)
                }
            });
        },
        /**
         * Descarga de documento PDF
         * @return void
         */
        download() {
            const url  = URL.createObjectURL(this.blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'sheets.pdf';
            link.click()
            link.remove();
        },
        /**
         * Imprimir document
         * @return void
         */
        print() {
            printJS(URL.createObjectURL(this.blob))
        }
    }
};
</script>