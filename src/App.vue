<template>
  <div>
    <document-visualizer src="http://localhost:8000/pdf"/>
  </div>
  
</template>

<script>
import DocumentVisualizer from '@/components/DocumentVisualizer';

export default {
  name: 'App',
  components: {
    DocumentVisualizer
  }
}
</script>

<style>

</style>
