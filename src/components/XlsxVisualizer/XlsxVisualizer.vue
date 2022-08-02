<template>
    <div ref="excel-viewer"></div>
</template>
<script>
import ExcelViewer from 'excel-viewer';
import CommonProps from '../CommonProps.vue';

export default {
    name: 'xlsx-viewer',
    mixins: [CommonProps],
    data: () => ({
        viewer: null,
    }),
    methods: {
        load() {
            this.blob.arrayBuffer()
            .then((arrayBuffer) => {
                this.viewer = new ExcelViewer(this.$refs['excel-viewer'], arrayBuffer);
            });
        },
    },
};
</script>