<template>
  <div>
    pptx visualizer
  </div>
</template>

<script>
import commonProps from "@/components/CommonProps";

export default {
  name: "PptxVisualizer",
  mixins: [commonProps],
  methods: {
    async load() {
      const data = await this.blob.text()
      // const dom = new DOMParser.parseFromString(data)
      const dom = new DOMParser()

      console.log(dom.parseFromString(data))
    }
  }
}
</script>

<style scoped>

</style>