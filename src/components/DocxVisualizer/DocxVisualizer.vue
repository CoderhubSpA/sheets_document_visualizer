<template>
    <div class="docx-container">
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
            <div class="center-options">

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
    </div>
</template>
<script>
import mammoth from 'mammoth/mammoth.browser';
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
  }),
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
      mammoth.convertToHtml({ arrayBuffer: this.blob.arrayBuffer() })
      .then((result) => {

        this.result = this.docx = result.value;
      });
    },
    /**
     * Descarga de documento docx
     * @return void
     */
     async download() {
          const response  = await axios.get(this.dataEndpoint);

          const parts  = this.dataEndpoint.split('/');
          const id = parts[parts.length -1];
          const row = response.data.content.entities_fk.document.find((el) => {
            return el.id === id;
          })

          const name = row.name || 'sheets.docx';

          const objectURL  = URL.createObjectURL(this.blob);
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