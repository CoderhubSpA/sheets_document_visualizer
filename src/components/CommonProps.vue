<script>
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
    }
  }
};
</script>
