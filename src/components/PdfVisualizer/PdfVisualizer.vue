<template>
  <layout-visualizer :canDownloadFile="canDownloadFile" :dataEndpoint="dataEndpoint">
    <template #left>
      <div class="toolbar-item" @click="showSideBar = !showSideBar">
        <i class="bi bi-list"></i>
      </div>
      <div class="sidebar-container" ref="sidebar" id="sidebar" :class="{ 'active': showSideBar }">
        <!-- THUMBNAILS -->
      </div>
    </template>
    <template #center>
      <div class="toolbar-item" @click="nextPage" :class="{ 'disable': !can_go_next_page }">
        <i class="bi bi-arrow-down-short"></i>
      </div>
      <div class="toolbar-item" @click="prevPage" :class="{ 'disable': !can_go_prev_page }">
        <i class="bi bi-arrow-up-short"></i>
      </div>
      <div class="toolbar-item">
        <input type="number" class="go-to-page" min="1" :value="page" @keyup="changePage" />
      </div>
      <!-- Num. Pages -->
      <div class="toolbar-item">
        <span v-text="numPages"></span>
        <i class="bi bi-file-earmark-fill page-number"></i>
      </div>
      <!-- Zoom In -->
      <div class="toolbar-item" @click="zoomIn">
        <i class="bi bi-zoom-in"></i>
      </div>
      <!-- Zoom Out -->
      <div class="toolbar-item" @click="zoomOut">
        <i class="bi bi-zoom-out"></i>
      </div>
    </template>
    <template #right>
      <!-- Imprimir -->
      <div class="toolbar-item" @click="print">
        <i class="bi bi-printer-fill"></i>
      </div>
      <!-- Descargar -->
      <div class="toolbar-item" @click="download">
        <i class="bi bi-cloud-arrow-down-fill"></i>
      </div>

    </template>
    <div class="document-content">
      <div class="pdf-content" ref="pdf-content">
        <!--  -->
      </div>
    </div>
    
  </layout-visualizer>
</template>
<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.mjs';
import CommonProps from '../CommonProps.vue';
import printJS from "print-js";
import axios from 'axios';
import Visualizer from '../Layout/Visualizer.vue';
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default {
  components: {
    'layout-visualizer': Visualizer,
  },
  name: 'pdf-visualizer',
  mixins: [CommonProps],
  data: () => ({
    pdf: null,
    numPages: 0,
    thumbnails: [],
    scale: 1,
    page: 1,
    showSideBar: true
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
    page(newest, oldest) {
      const oldThumb = document.getElementById(`thumb-page-${oldest}`);
      const activeClass = ['active'];
      oldThumb.classList.remove(activeClass);
      const newThumb = document.getElementById(`thumb-page-${newest}`);
      newThumb.classList.add(activeClass);
      newThumb.scrollIntoView();
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
    setPage(p) {
      const page = document.querySelector(`canvas[document-page="${p}"]`);
      page.scrollIntoView();
    },
    /**
     * Desplaza el focus en el visor
     * a la siguiente pagina
     */
    nextPage() {
      if (this.page + 1 <= this.numPages) {
        this.page++;
        this.setPage(this.page);
      }
    },
    /**
     * Desplaza el focus en el visor
     * a la pagina anterior
     */
    prevPage() {
      if (1 <= this.page - 1) {
        this.page--;
        this.setPage(this.page);
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

        const viewport = page.getViewport({ scale: this.scale });
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
          viewport: page.getViewport({ scale: 0.126 }),

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
        const io = this.intersectionObserver();
        this.numPages = pdf.numPages;
        for (let page = 1; page <= pdf.numPages; page++) {
          const canvas = document.createElement('canvas');
          canvas.className = 'pdf-page';
          canvas.setAttribute('id', `page-${page}`);
          canvas.setAttribute('document-page', page)
          io.observe(canvas)
          this.$refs['pdf-content'].appendChild(canvas);
          this.renderPage(pdf, page, canvas);

          const thumb = document.createElement('canvas')
          thumb.className = 'thumbnail'
          const thumbId = `thumb-page-${page}`;
          thumb.setAttribute('id', thumbId)
          thumb.setAttribute('ref', thumbId)
          thumb.addEventListener('click', () => {
            this.setPage(page)
          })

          this.$refs['sidebar'].appendChild(thumb);
          this.renderThumbnail(pdf, page, thumb)
        }
        const fThumb = document.getElementById(`thumb-page-1`);
        fThumb.classList.add(['active'])
      });
    },
    /**
     * Descarga de documento PDF
     * @return void
     */
    async download() {
      const response = await axios.get(this.dataEndpoint);

      const parts = this.dataEndpoint.split('/');
      const id = parts[parts.length - 1];
      const row = response.data.content.entities_fk.document.find((el) => {
        return el.id === id;
      })

      const name = row.name || 'sheets.pdf';

      const objectURL = URL.createObjectURL(this.blob);
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = name;
      link.click()
      link.remove();
    },
    /**
     * Imprimir document
     * @return void
     */
    print() {
      printJS(URL.createObjectURL(this.blob))
    },
    /**
     * Provee una vía asíncrona para observar cambios en la intersección 
     * de un elemento con un elemento ancestro o con el viewport del 
     * documento de nivel superior.
     * @retrun { IntersectionObserver } 
     */
    intersectionObserver() {
      const options = {
        root: this.$refs['pdf-content'],
        rootMargin: "0px",
        thresholds: [0.7],
      };
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const num = entry.target.id.split('-')[1];
            this.page = Number(num);
          }
        }, options);
      });
      return io;
    },
    changePage(e) {
      const { key } = e;
      if (!Number.isNaN(key)) {
        const { value } = e.target;
        const num = Number(value);
        if ((num >= 1 && num <= this.numPages) && num) {
          this.setPage(num);
        }
      }
    }
  }
};
</script>