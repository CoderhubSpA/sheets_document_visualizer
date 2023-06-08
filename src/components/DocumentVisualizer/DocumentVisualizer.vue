<template>
    <div>
        <component :is="viewer" :blob="blob" :format="format" :dataEndpoint="dataEndpoint"/>
    </div>
</template>
<script>

import axios from 'axios';
import DocxVisualizer from '../DocxVisualizer';
import LoadingDocument from '../LoadingDocument';
import PdfVisualizer from '../PdfVisualizer';
import TextVisualizer from '../TextVisualizer';
import XlsxVisualizer from '../XlsxVisualizer';
import CsvVisualizer from "@/components/CsvVisualizer/CsvVisualizer";
import ErrorComponent from "@/components/ErrorComponent";
import ImageVisualizer from "@/components/ImageVisualizer";
import UnsupportedFormat from "@/components/UnsupportedFormat/UnsupportedFormat";
import {Formats} from "@/helpers/Formats";
import PptxVisualizer from "@/components/PptxVisualizer";

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
                    component = TextVisualizer; //() => import('../TextVisualizer');
                    break;
                // pdf
                case 'application/pdf':
                    component = PdfVisualizer; // () => import('../PdfVisualizer');
                    break;
                // docx
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    component = DocxVisualizer; //() => import('../DocxVisualizer');
                    break;
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    component = XlsxVisualizer; // () => import('../XlsxVisualizer');
                    break;
              case 'text/csv':
              case 'application/csv':
                component = CsvVisualizer;
                  break;
              case 'error':
                  component = ErrorComponent;
                  break;
              case 'image/png':
              case 'image/jpeg':
              case 'image/gif':
              case 'image/svg+xml':
                  component = ImageVisualizer;
                break;
              case 'application/vnd.ms-powerpoint':
              case 'application/mspowerpoint':
              case 'application/powerpoint':
              case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                component = PptxVisualizer;
                break;
              case 'unsupported':
                component = UnsupportedFormat;
                break;
              default:
                  component = LoadingDocument; //() => import('../LoadingDocument');
                  break;
            }
            return component;
        },
        url() {
          return this.src;
        },
        dataEndpoint() {
          return `/entity/data${this.src}`;
        }
    },
    /**
     * Una vez creado el componente
     * procede a realizar la solicitud al endpoint
     * indicado
     */
    async created() {
        axios.get(this.url, {
            responseType: 'blob',
        }).then((response) => {
            if (Formats.isSupported(response.data.type)) {
              this.format = response.data.type;
              this.blob = new Blob([response.data]);
            } else {
              this.format = 'unsupported';
              const data = {
                src: this.src
              }
              this.blob =  new Blob([JSON.stringify(data)]);
            }

        }).catch((error) => {
          console.log(error)
            this.format = 'error';
            this.blob = error.response;
        });
    }
};
</script>
<style lang="scss">

</style>