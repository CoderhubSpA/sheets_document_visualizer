<template>
  <layout-visualizer 
    :canDownloadFile="canDownloadFile" 
    :dataEndpoint="dataEndpoint">
    <template #left>
      <!-- <div class="toolbar-item">
        <i class="bi bi-search" @click="showSearch = !showSearch"></i>
        <div class="toolbar-item-option" v-if="showSearch">
          <input type="text" name="search" id="search" placeholder="Buscar..." v-model="search">
          <span class="match-text" v-text="match_text"></span>
        </div>
      </div> -->
    </template>
    <template #center>
      <div class="toolbar-item" @click="nextSection">
        <i class="bi bi-arrow-down-short"></i>
      </div>
      <div class="toolbar-item" @click="prevSection">
        <i class="bi bi-arrow-up-short"></i>
      </div>
      <div class="toolbar-item">
        <input type="number" class="go-to-page" min="1" :value="section" @keyup="changePage" />
      </div>
      <div class="toolbar-item">
        <span v-text="numSections"></span>
        <i class="bi bi-file-earmark-fill page-number"></i>
      </div>
    </template>
    <div class="document-content">
        <div ref="docx-viewer" id="docx-content" v-html="result" />
    </div>
  </layout-visualizer>
</template>
<script>
import Visualizer from '../Layout/Visualizer.vue';
import {renderAsync} from 'docx-preview'
import CommonProps from '../CommonProps.vue';
import axios from 'axios';
export default {
  components: {
    'layout-visualizer': Visualizer,
  },
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
    numSections: 0,
    section: 1
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
    nextSection() {
      if (this.section + 1 <= this.numSections) {
        this.section++;
        this.setSection(this.section)
      }
    },
    prevSection() {
      if (1 <= this.section -1) {
        this.section--;
        this.setSection(this.section);
      }
    },
    changePage(e) {
      const { key } = e;
      if (!Number.isNaN(key)) {
        const { value } = e.target;
        const num = Number(value);
        if ((num >= 1 && num <= this.numSections) && num) {
          this.setSection(num);
        }
      }
    },
    setSection(s) {
      const sections = document.querySelectorAll('section');
      const section = sections[s -1];
      section.scrollIntoView(); 
    },
    /**
     * Convierte el Un Blob de un documento .docx
     * en HTML para ser visualizado en el componente
     * @return Void
     */
    load() {
      const docContainer = document.getElementById('docx-content')
      const options = {
        // inWrapper: false
      };
      renderAsync(this.blob, docContainer, null, options)
      .then(() => {
        const sections = docContainer.querySelectorAll('section');
        this.numSections =  sections.length;
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

        const sections = document.querySelectorAll('div.docx-wrapper > section');
        sections.forEach(s => {
          console.log(s.innerHTML)
          s.innerHTML.replaceAll(search, `<span class="highlight">${search}</span>`)
        });
      }
    }
  }
};
</script>