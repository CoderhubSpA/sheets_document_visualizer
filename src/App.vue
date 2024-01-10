<template>
  <div>
    <input type="file" name="file" id="file" @change="onChange">
    <document-visualizer :src="file"/>
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
    file: '',
  }),
  methods: {
    onChange(event) {
      // const file = event.target.files[0];
      this.file = event.target.files[0];
    },
  }
}
</script>
<style lang="scss">
.nested-form {
    position: fixed;
    z-index: 170;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.151);
    border: 1px solid rgb(240, 239, 239);
    border-radius: 4px;

    .content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        width: 80%;

        .header {
            background-color: #fefefe;
            margin-bottom: 1rem;

            button {
                float: right;
            }
        }
    }
}
</style>
