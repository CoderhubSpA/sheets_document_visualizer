<template>
  <div style="height: 100%">
    <input type="file" name="file" id="file" @change="onChange">
    
    <document-visualizer :src="file" style="overflow:hidden"/>
  </div>
</template>

<script>
import DocumentVisualizer from '@/components/DocumentVisualizer';


export default {
  name: 'App',
  components: {
    DocumentVisualizer
  },
  data: () => ({
    file: 'http://sheets.developement/document/{id}',
  }),
  methods: {
    onChange(event) {
      // const file = event.target.files[0];
      this.file = event.target.files[0];
    },
  }
}
</script>
