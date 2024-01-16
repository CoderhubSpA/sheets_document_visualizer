<template>
  <div ref="image-viewer" class="image-viewer">
    <div class="image-container">
      <img :src="img" alt="" />
    </div>
  </div>
</template>

<script>
import CommonProps from "../CommonProps";

export default {
  name: "ImageVisualizer",
  mixins: [CommonProps],
  data: () => ({
      img: ''
  }),
  computed: {
    src() {
      return `data:${this.format};base64, ${this.img}`
    }
  },
  methods: {
    async load() {
      const reader = new FileReader();

      if (this.format === 'image/svg+xml') {
        const svg = await this.blob.text()
        // this.$refs['image-viewer'].firstChildremoveChild();
        this.$refs['image-viewer'].innerHTML = svg;
      } else {
        reader.readAsDataURL(this.blob);
        reader.onloadend = () => {
          this.img = reader.result
        }
      }

    }
  }
}
</script>