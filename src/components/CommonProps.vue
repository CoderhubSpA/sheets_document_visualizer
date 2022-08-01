<script>
export default {
  props: {
    blob: {
      type: Blob,
      require: true,
    },
    type: {
      type: String,
      require: true,
      default: '',
    },
  },
};
</script>
