<template>
    <div class="visualizer-template">
        <div class="toolbar">
            <div class="toolbar-items">
                <div class="left-options">
                    <slot name="left">
                        <!-- content -->
                    </slot>
                </div>
                <div class="center-options">
                    <slot name="center">
                        <!-- content -->
                    </slot>
                </div>
                <div class="right-options">
                    <slot name="right">
                        <!-- content -->
                    </slot>
                    <div class="toolbar-item" v-if="canDownloadFile" @click="download">
                        <i class="bi bi-cloud-arrow-down-fill"></i>
                    </div>
                </div>
            </div>
        </div>
        <slot>
            <!-- CONTENIDO -->
        </slot>
    </div>
</template>
<script>
const packageJSON = require('../../../package.json');


export default {
    name: 'layout-visualizer',
    props: {
        canDownloadFile: {
            type: Boolean,
            default: true,
        },
        blob: {
            type: Blob,
            require: true,
        },
         fileName: {
            type: String,
            default: '',
        },
        fileNameExtension: {
            type: String,
            default: '',
        },
    },
    computed: {
        version() {
            return `version:${packageJSON.version}`;
        },
    },
    methods: {
        /**
         * Realiza la descarga del archivo
         * @return {Void}
         */
        async download() {
            const name = this.fileName || `sheets.${this.fileNameExtension}`;
            const objectURL = URL.createObjectURL(this.blob);
            const link = document.createElement('a');

            link.href = objectURL;
            link.download = name;
            link.click()
            link.remove();
        },
    }
};
</script>
