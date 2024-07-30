<template>
  <div style="height: 100%">
    <input type="file" name="file" id="file" @change="onChange">
    
    <document-visualizer :src="file" style="overflow:hidden"/>
  </div>
</template>

<script>
import DocumentVisualizer from '@/components/DocumentVisualizer';
// import DocxVisualizer from "@/components/DocxVisualizer";
export default {
  name: 'App',
  components: {
    DocumentVisualizer,
    // DocxVisualizer
  },
  data: () => ({
    file: 'http://127.0.0.1:8000/file',
  }),
  methods: {
    onChange(event) {
      // const file = event.target.files[0];
      this.file = event.target.files[0];
    },
  }
}
</script>
