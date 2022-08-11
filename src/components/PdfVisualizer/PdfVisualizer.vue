<template>
  <div>
    <i class="bi bi-list"></i>
    <vue-pdf-app 
    v-if="pdf"
    :pdf="pdf"
    style="height: 90vh;"/>
  </div>
</template>
<script>
import VuePdfApp from 'vue-pdf-app';
import CommonProps from '../CommonProps.vue';

export default {
  /**
   * Nombre del componente para ser usado de 
   * forma individual
   */
  name: 'pdf-viewer',
  components: {
    VuePdfApp,
  },
  /**
   * Insercion de props comunes entre todos los 
   * componente
   */
  mixins: [CommonProps],
  data: () => ({
    pdf: null,
  }),
  methods: {
    /**
     * Carga del documento PDF
     * en el visor
     * @return Void
     */
    load() {
      this.pdf = URL.createObjectURL(this.blob);
    },
  },
};
</script>
<style src="vue-pdf-app/dist/icons/main.css">
</style>
