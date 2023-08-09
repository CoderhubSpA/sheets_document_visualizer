<template>
  <div class="error-container">
    <div class="error-icon">
      <img src="@/assets/img/not_support.svg" alt="">
    </div>
    <div class="error-message">
      <div class="error-server-message">
        Archivo no soportado. Descargue su archivo desde
        <a :href="this.src">
          aquí
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import CommonProps from "@/components/CommonProps";
export default {
  name: "UnsupportedFormat",
  mixins: [CommonProps],
  data: () => ({
    src: '',
  }),
  methods: {
    async load() {
      const raw = await this.blob.text();
      const data = JSON.parse(raw);
      this.src = data.src;
    },
    
  }
}
</script>

<style scoped>

</style>