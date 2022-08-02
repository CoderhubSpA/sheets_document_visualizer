<template>
    <div class="docx-container">
      <div ref="docx-viewer" id="docx-content"></div>
    </div>
</template>
<script>
import mammoth from 'mammoth/mammoth.browser';
import CommonProps from '../CommonProps.vue';

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
  methods: {
    /**
     * Convierte el Un Blob de un documento .docx
     * en HTML para ser visualizado en el componente
     * @return Void
     */
    load() {
      mammoth.convertToHtml({ arrayBuffer: this.blob.arrayBuffer() })
      .then((result) => {
        const container = this.$refs['docx-viewer'];
        container.innerHTML = result.value;
      });
    }
  }
};
</script>