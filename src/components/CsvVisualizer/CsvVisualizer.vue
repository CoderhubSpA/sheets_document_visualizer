<template>
  <div class="csv-visualizer">
    <!-- Toolbar: Muestra barra de herramientas para interaccion con el document -->
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
    <!-- Content: Zona de renderizado de todas las paginas del documento -->
    <slot name="content">
      <div class="csv-content" ref="content" v-html="result">

      </div>
    </slot>
    <!--   Footer: Pie de pagina del documento. Por defecto esta en blanco     -->
    <slot name="footer">

    </slot>
  </div>
</template>

<script>
import CommonProps from "@/components/CommonProps";
export default {
  name: "CsvVisualizer",
  mixins: [CommonProps],
  data: () => ({
    // texto a buscar
    search: '',
    // mostrar/ocultar opcion de busqueda
    showSearch: false,
    // informacion original
    csv: '',
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
    async load() {
      this.result = this.csv = await this.blob.text();
    },
    /**
     * Descarga de documento csv
     * @return void
     */
    download() {
      const url  = URL.createObjectURL(this.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sheets.csv';
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
        this.result = this.csv.replaceAll(search, `<span class="highlight">${search}</span>`);
      } else {
        this.result = this.csv;
      }
    }
  }
}
</script>

<style scoped>

</style>