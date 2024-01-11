<template>
    <div>
        <div class="toolbar">
            <div class="toolbar-items">
                <div class="left-options">
                    <slot name="left">

                    </slot>
                </div>
                <div class="center-options">
                    <slot name="center">
                        
                    </slot>
                    <!--  -->

                </div>
                <div class="right-options">
                    <slot name="right">
                        <div class="toolbar-item" v-if="canDownloadFile" @click="download">
                            <i class="bi bi-cloud-arrow-down-fill"></i>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
        <slot>
            <!-- CONTENIDO -->
        </slot>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props: {
        canDownloadFile: {
            type: Boolean,
            default: true,
        },
        dataEndpoint: {
            type: String,
            default: ''
        }
    },
    name: 'layout-visualizer',
    methods: {
        /**
         * Realiza la descarga del archivo
         * @return {Void}
         */
        async download() {
            const response = await axios.get(this.dataEndpoint);

            const parts = this.dataEndpoint.split('/');
            const id = parts[parts.length - 1];

            const row = response.data.content.entities_fk.document.find((el) => {
                return el.id === id;
            });

            const name = row.name;

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