<template>
  <div class="pdf-viewer">
    <!-- Toolbar: Muestra barra de herramientas para interaccion con el document -->
    <slot name="toolbar">
      <div class="pdf-toolbar">
        <div class="pdf-toolbar-items">

          <div class="left-options">
           
          </div>

          <div class="center-options">
            <!-- <div class="pdf-toolbar-item" @click="nextPage" :class="{ 'disable': !can_go_next_page }">
              <i class="bi bi-arrow-down-short"></i>
            </div>
            <div class="pdf-toolbar-item" @click="prevPage" :class="{ 'disable': !can_go_prev_page }">
              <i class="bi bi-arrow-up-short"></i>
            </div> -->
            <div class="pdf-toolbar-item">
              <input type="number" class="go-to-page" min="1" v-model="section" />
            </div>
            <!-- Num. Pages -->
            <div class="pdf-toolbar-item">
              <span v-text="numOfSections"></span>
              <i class="bi bi-file-earmark-fill page-number"></i>
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
      <div ref="docx-viewer" id="docx-content" v-html="result"></div>
    </slot>
    <!--   Footer: Pie de pagina del documento. Por defecto esta en blanco     -->
    <slot name="footer">

    </slot>
  </div>
  <!-- <div class="docx-container">
    <slot name="toolbar">
      <div class="toolbar">
        <div class="toolbar-items">
          <div class="left-options">
            <div class="toolbar-item">
              <i class="bi bi-search" @click="showSearch = !showSearch"></i>
              <div class="toolbar-item-option" v-if="showSearch">
                <input type="text" name="search" id="search" placeholder="Buscar..." v-model="search">
                <span class="match-text">
                  {{ match_text }}
                </span>
                <i class="bi bi-x" @click="showSearch = false"></i>
              </div>
            </div>
          </div>
          <div class="center-options" style="padding-top: 4px">
            <div class="pdf-toolbar-item" @click="nextPage" :class="{ 'disable': !can_go_next_page }">
              <i class="bi bi-arrow-down-short"></i>
            </div>
            <div class="pdf-toolbar-item" @click="prevPage" :class="{ 'disable': !can_go_prev_page }">
              <i class="bi bi-arrow-up-short"></i>
            </div>
            <div class="pdf-toolbar-item">
              <input type="number" class="go-to-page" min="1" v-model="section" />
            </div>
            <div class="pdf-toolbar-item" style="margin-left: 4px;">
              <span v-text="numOfSections"></span>
              <i class="bi bi-file-earmark-fill page-number"></i>
            </div>
          </div>
          <div class="right-options">
            <div class="toolbar-item" @click="download">
              <i class="bi bi-cloud-arrow-down-fill"></i>
            </div>
          </div>
        </div>
      </div>
    </slot>
    <slot name="content">
      <div ref="docx-viewer" id="docx-content" v-html="result"></div>
    </slot>
    <slot name="footer">

    </slot>
  </div> -->
</template>
<script>
import { renderAsync } from 'docx-preview';
import CommonProps from '../CommonProps.vue';
import axios from 'axios';
export default {
  /**
   * Nombre del componente para ser usado de
   * forma individual
   */
  name: 'docx-visualizer',
  /**
   * Insercion de props comunes entre todos los
   * componente
   */
  mixins: [CommonProps],
  data: () => ({
    // texto a buscar
    search: '',
    // mostrar/ocultar opcion de busqueda
    showSearch: false,
    // informacion original
    docx: '',
    // informacion despues de realizar una busqueda
    result: '',
    // secciones del documento (pag)
    sections: [],
    section: 1,
  }),
  computed: {
    /**
     * Calcula la cantidad de seciones (pag)
     * detectadas en el documento
     * @return {Number}
     */
    numOfSections() {
      return this.sections.length;
    }
  },
  watch: {
    search(val) {
      this.searchInContent(val)
    }
  },
  methods: {
    /**
     * Convierte el Un Blob de un documento .docx
     * en HTML para ser visualizado en el componente
     * @return Void
     */
    load() {
      const content = document.getElementById('docx-content')
      const options = {
        ignoreLastRenderedPageBreak: false,
        //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
        useBase64URL: true
      }
      renderAsync(this.blob, content, null, options)
        .then(() => {
          // obtiene todas las secciones encontradas
          this.sections = content.querySelectorAll('section');
        })
    },
    /**
     * Descarga de documento docx
     * @return void
     */
    async download() {
      const response = await axios.get(this.dataEndpoint);

      const parts = this.dataEndpoint.split('/');
      const id = parts[parts.length - 1];
      const row = response.data.content.entities_fk.document.find((el) => {
        return el.id === id;
      })

      const name = row.name || 'sheets.docx';

      const objectURL = URL.createObjectURL(this.blob);
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = name;
      link.click()
      link.remove();
    },
    /**
     * Busqueda de texto en el contenido
     * y coloca las coincidencias dentro de un
     * span.highlight y renderiza nuevamente el documento
     * con las modificaciones, en caso de no haber parametro de busqueda
     * coloca el texto original
     */
    searchInContent(search) {
      if (search) {
        this.result = this.docx.replaceAll(search, `<span class="highlight">${search}</span>`);
      } else {
        this.result = this.docx;
      }
    }
  }
};
</script>