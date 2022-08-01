<template>
    <div class="docx-container">
      <div ref="docx-viewer" id="docx-content"></div>
    </div>
</template>
<script>
import mammoth from 'mammoth/mammoth.browser';
import CommonProps from '../CommonProps.vue';

export default {
  name: 'docx-visualizer',
  mixins: [CommonProps],
  mounted() {
    mammoth.convertToHtml({ arrayBuffer: this.blob.arrayBuffer() })
      .then((result) => {
        const container = this.$refs['docx-viewer'];
        container.innerHTML = result.value;
      });
  },
};
</script>