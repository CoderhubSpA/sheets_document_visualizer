<template>
  <div class="visualizer-container">
    <component :is="viewer" :blob="blob" :format="format" :canDownloadFile="true" :fileName="fileName" :fileURL="fileURL"/>
  </div>
</template>
<script>
import LayoutVisualizer from '../Layout/Visualizer';
import axios from 'axios';
import DocxVisualizer from '../DocxVisualizer';
import LoadingDocument from '../LoadingDocument';
import PdfVisualizer from '../PdfVisualizer';
import TextVisualizer from '../TextVisualizer';
import XlsxVisualizer from '../XlsxVisualizer';
import ErrorComponent from "@/components/ErrorComponent";
import ImageVisualizer from "@/components/ImageVisualizer";
import UnsupportedFormat from "@/components/UnsupportedFormat/UnsupportedFormat";
import { Formats } from "@/helpers/Formats";

export default {
  components: {
    LayoutVisualizer,
  },
  name: 'document-visualizer',
  props: {
    /**
     * URL del archivo a visualizar
     * o el File de un input[file]
     */
    src: {
      type: [String, File],
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
    blob: null,
    /**
     * Nombre del archivo a descargar
     * @format String
     */
    fileName: '',
    fileURL: '',
  }),
  computed: {
    /**
     * Determina si el archivo en visualizacion 
     * es descargable o no
     * @return {Boolean}
     */
     canDownloadFile() {
      return typeof (this.src) === 'string' ? true : false;
    },
    /**
     * Determina si la fuente 
     * entregada es de tipo String o File
     * @return {String}
     */
    type_of_src() {
      return typeof (this.src);
    },
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
        case 'text/csv':
        case 'application/csv':
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
        case 'error':
          component = ErrorComponent;
          break;
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
        case 'image/svg+xml':
        case 'image/webp':
        // case 'image/tiff':
          component = ImageVisualizer;
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
    /**
     * Determina si la fuente entregada es de tipo String
     * o no
     * @return {String|null}
     */
    url() {
      return this.src instanceof String ? this.src : null;
    },
    /**
     * Construye el endpoint para la descarga del archivo
     */
    dataEndpoint() {
      return this.type_of_src === 'string' ? `${this.src}` : null;
    }
  },
  watch: {
    src() {
      this.readSrc()
    }
  },
  /**
   * Una vez creado el componente
   * procede a realizar la solicitud al endpoint
   * indicado
   */
  async mounted() {
    this.readSrc()
  },
  methods: {
    /**
     * Si el visualizador posee una URL
     * realiza un llamado al backend
     * o lee desde un archivo cargado desde un input
     * @return {Void}
     */
    readSrc() {
      if (this.type_of_src == 'string') {
        this.readFromURL()
      } else {
        this.readFromFile()
      }
    },
    /**
     * Realiza un llamado al backend
     * esperando que el tipo de respuesta sea manejada
     * como un blob
     * @return {Void}
     */
    readFromURL() {
      axios.get(this.src, {
        responseType: 'blob',
      }).then((response) => {
        if (Formats.isSupported(response.data.type)) {
          this.format = response.data.type;

          this.blob = new Blob([response.data], { type: this.format });
        } else {
          this.format = 'unsupported';

          const data = {
            src: this.src
          }

          this.blob = new Blob([JSON.stringify(data)]);
        }

        this.fileURL = this.src;

        // obtiene el nombre del archivo desde las cabeceras
        const disposition = response.headers['x-file-name'];
        if (disposition && disposition.indexOf('filename') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);

          if (matches != null && matches[1]) { 
            this.fileName = matches[1].replace(/['"]/g, '');
          }
        }
      }).catch((error) => {
        console.log(error)
        this.format = 'error';
        this.blob = { statusText: error.response.data, status: 'HTTP_ERROR' };
      });
    },
    /**
     * Cuando el input del visualizador
     * es un Archivo no cargado a la plataforma
     * recibe un {File} y este se encarga de transformarlo como blob
     * @return {Void}
     */
    readFromFile() {
      this.format = this.src.type;
      this.blob = new Blob([this.src], { type: this.format });
    }
  },
};
</script>
