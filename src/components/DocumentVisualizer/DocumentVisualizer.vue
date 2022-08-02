<template>
    <div>
        <component :is="viewer" :blob="blob" :format="format" />
    </div>
</template>
<script>
import axios from 'axios';
import TextVisualizer from '../TextVisualizer';
import PdfVisualizer from '../PdfVisualizer';
import DocxVisualizer from '../DocxVisualizer';
import LoadingDocument from '../LoadingDocument';
import XlsxVisualizer from '../XlsxVisualizer';

export default {
    name: 'document-visualizer',
    props: {
        /**
         * URL del file a visualizar
         */
        src: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        /**
         * Formato del archivo obtenido
         * @format String
         */
        format: '',
        /**
         * Representacion Blob del archivo
         * @format Blob
         */
        blob: null
    }),
    computed: {
        /**
         * Importa el componente adecuado, para la visualizacion 
         * del file segun su formato
         * @return component
         */
        viewer() {
            let component;
            switch (this.format) {
                // text y csv
                case 'text/plain':
                    component = TextVisualizer;
                    // component = () => import('../TextVisualizer');
                    break;
                // pdf
                case 'application/pdf':
                    component = PdfVisualizer;
                    // component = () => import('../PdfVisualizer');
                    break;
                // docx
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    component = DocxVisualizer;
                    // component = () => import('../DocxVisualizer');
                    break;
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    component = XlsxVisualizer;
                    break;
                default:
                    component = LoadingDocument;
                    // component = () => import('../LoadingDocument');
                    break;
            }
            return component;
        },
    },
    /**
     * Una vez creado el componente
     * procede a realizar la solicitud al endpoint
     * indicado
     */
    async created() {
        axios.get(this.src, {
            responseType: 'blob',
        }).then((response) => {
            console.log(response)
            this.format = response.data.type;
            this.blob = new Blob([response.data]);
        }).catch((error) => {
            this.format = 'error';
            this.blob = new Blob([error.response.data]);
            
        });
    }
};
</script>