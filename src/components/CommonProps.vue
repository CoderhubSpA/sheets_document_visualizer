<script>
import printJS from "print-js";

/**
 * Mix Base para la definicion de propiedades
 * y metodos de los visualizadores
 */
export default {
  props: {
    blob: {
      type: Blob,
      require: true,
    },
    format: {
      type: String,
      require: true,
      default: '',
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    /**
     * @return Void
     */
    load() {
      throw 'Metodo load debe ser sobreescrito';
    },
    print() {
      printJS(URL.createObjectURL(this.blob))
    },
    /**
     * Validacion de url
     * @param String url
     * @return Boolean
     */
    validUrl(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    },
    /**
     * Descarga de documento PDF
     */
    download() {
      const url  = URL.createObjectURL(this.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sheets.txt';
      link.click()
      link.remove();
    },
  }
};
</script>
