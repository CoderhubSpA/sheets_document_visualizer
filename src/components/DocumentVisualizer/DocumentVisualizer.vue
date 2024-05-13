<template>
  <div>
    <component :is="viewer" :blob="blob" :format="format" :canDownloadFile="canDownloadFile"/>
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
    blob: null
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
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YWQ3MzYwYi1mZWVjLTRlNGItOTJkOS1hZGUzYWYyNjJlMTIiLCJqdGkiOiI4MWUwMjI4M2RhZGFmOTkxZTI1NDkzYWVjMmM2NDA3YTRhOWVmZjRiOGRmMWE0YThmYjI4MDRlODg5OTg0NTcwYzRiNDE5NTEzODZhM2E3NSIsImlhdCI6MTcxNTYzNTQyOS43MzI3NywibmJmIjoxNzE1NjM1NDI5LjczMjc3MiwiZXhwIjoxNzQ3MTcxNDI5LjcwODU4MSwic3ViIjoiYmZjYzI5OGQtNTNlNC00Mzk3LWFiN2UtZjM2YzhlYzU0ZjlkIiwic2NvcGVzIjpbXX0.L5mXL3vYtAfivgWRj_y6x-s4GFvpo57w8MBFGcPDADQoLlAPqRguLK4x8v13SMEqPazMtjlFpZhZoDyW6MNdGlm1ePKGcNyCvZIyKiNEZjcdh-iALImIrQXuEji0IJzJ-auX_5SleE8rZfOv9gyGC-b1vy0i7JrQ_ESX1GMP0TH56XsaH4K09yKUK0ktj62gAzIeuZvETlsD0k-CcXEsttZfR0Z5esMJ5H7eMX4WzTMXYtGeBoJ2YgYf_Rj2zMH3DKWejvhXbF8VlQt6riaPMBBiIi4Z9yEH8owL6hMCZw1Bn4DFRWE97m4m3Ps5X8SLWBwlA_OPLICU6TzlXab1gZ4poApoI1vqSVoHT8FvJT40W3_FmBs3cSc7dXKLSEL6k71S5LUTaY_UTrLI8dH0YGX6PcreLpy_f-iRZ8wS0bi5LYrPT4QZDTnjfvjTcSM8Ga8FM8uRqWhrC1z0rZeSNkWnbTTwxUp6FSOzokVPbcmpvVPI14S-VTc3-GapOIH00lRrtHCIby35hfI_Dc8pQ0YuJKXELE_viWam6WEaT_oHFv-VY7alxX0zo2PKdihX_QUQ_q8G0iSwuLSRHHOpyRVm0-GgZb4mm5N-1MhSA4PzeHaObqIh7Xji7Z1v9aNea3hXdZ52PmvI09ngXunEuE_Vx_GU4OFqsnux9piXkzk`}
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

      }).catch((error) => {
        console.log(error)
        this.format = 'error';
        this.blob = error.response;
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
