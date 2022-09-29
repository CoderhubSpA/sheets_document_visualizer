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
    load() {
      const file = new FileReader(this.blob);
    }
  }
}
</script>

<style scoped>

</style>