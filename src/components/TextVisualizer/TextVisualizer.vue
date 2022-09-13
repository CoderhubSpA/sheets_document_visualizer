<template>
    <div class="text-visualizer">
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
              <!-- Imprimir -->
<!--              <div class="toolbar-item" @click="print">-->
<!--                <i class="bi bi-printer-fill"></i>-->
<!--              </div>-->
              <!-- Descargar -->
              <div class="toolbar-item" @click="download">
                <i class="bi bi-cloud-arrow-down-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </slot>
      <!-- Content: Zona de renderizado de todas las paginas del documento -->
      <slot name="content">
        <div class="text-content" ref="content" v-html="result">

        </div>
      </slot>
      <!--   Footer: Pie de pagina del documento. Por defecto esta en blanco     -->
      <slot name="footer">

      </slot>
    </div>
</template>
<script>
import CommonProps from '../CommonProps.vue';

export default {
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