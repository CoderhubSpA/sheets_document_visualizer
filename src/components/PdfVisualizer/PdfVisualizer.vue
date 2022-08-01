<template>
  <div>
    <vue-pdf-app :pdf="pdf" v-if="pdf" style='height: 100vh;'></vue-pdf-app>
  </div>
</template>
<script>
import VuePdfApp from 'vue-pdf-app';
import CommonProps from '../CommonProps.vue'

export default {
  name: 'pdf-viewer',
  components: {
    VuePdfApp,
  },
  mixins: [CommonProps],
  data: () => ({
    pdf: null,
  }),
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.pdf = URL.createObjectURL(this.blob);
    },
  },
};
</script>
<style>
@import '~vue-pdf-app/dist/icons/main.css';
/**  ! No funciona fuera del componente */
.pdf-viewer{
  height: 100vh;
}
</style>
