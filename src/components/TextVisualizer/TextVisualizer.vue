<template>
  <layout-visualizer :canDownloadFile="canDownloadFile" :dataEndpoint="dataEndpoint">
    <template #left>
      <div class="toolbar-item">
        <i class="bi bi-search" @click="showSearch = !showSearch"></i>
        <div class="toolbar-item-option" v-if="showSearch">
          <input type="text" name="search" id="search" placeholder="Buscar..." v-model="search" />
          <span class="match-text" v-text="match_text"></span>
        </div>
      </div>
    </template>
    <div class="document-conent">
      <div class="text-visualizer">
        <div class="text-content" ref="content" v-html="result">

        </div>
      </div>
    </div>
  </layout-visualizer>
</template>
<script>
import Visualizer from '../Layout/Visualizer.vue';
import CommonProps from '../CommonProps.vue';

export default {
  components: {
    'layout-visualizer': Visualizer,
  },
  /**
 * Nombre del componente para ser usado de 
 * forma individual
 */
  name: 'text-visualizer',
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
    text: '',
    // informacion despues de realizar una busqueda
    result: '',
  }),
  computed: {
    /**
     * Calcula todas las coincidencias de busquedas
     * y muestra la cantidad
     * @returns {string}
     */
    match_text() {
      let text = '';
      // const matches = this.$.querySelector('span.highlight');
      const matches = this.result.split(' ').filter((w) => {
        return w.includes('<span')
      });
      if (matches) {
        text = `${matches.length} match`;
      }
      return text;
    }
  },
  watch: {
    search(val) {
      this.searchInContent(val)
    }
  },
  methods: {
    /**
     * Carga del documento .txt
     * en el visor
     * @return Void
     */
    async load() {
      this.result = this.text = await this.blob.text();
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
        this.result = this.text.replaceAll(search, `<span class="highlight">${search}</span>`);
      } else {
        this.result = this.text;
      }
    },
    print() {
      const text = this.$refs.content.textContent;
      const printWindow = window.open();
      printWindow.document.open('text/plain')
      printWindow.document.write(text);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }

  },

}
</script>