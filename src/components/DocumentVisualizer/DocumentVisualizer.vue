<template>
    <div>
        <component :is="viewer" :blob="blob" :type="type" />
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'document-visualizer',
    props: {
        src: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        type: '',
        blob: null
    }),
    computed: {
        url() {
            return this.src;
        },
        viewer() {
            let component;
            switch (this.type) {
                case 'text/plain':
                    component = () => import('../TextVisualizer');
                    break;
                case 'application/pdf':
                    component = () => import('../PdfVisualizer');
                    break;
                // docx
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    component = () => import('../DocxVisualizer');
                    break;
                default:
                    component = () => import('../LoadingDocument');
                    break;
            }
            return component;
        }
    },
    async mounted() {
        axios.get(this.url, {
            responseType: 'blob',
        }).then((response) => {
            this.type = response.data.type;
            this.blob = new Blob([response.data]);
        });
    }
};
</script>