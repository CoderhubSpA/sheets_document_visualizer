<template>
  <div class="error-container">
    <div class="error-icon">
      <img src="@/assets/img/error.svg" alt="" />
    </div>
    <div class="error-message">
      <div class="error-status-number">
        {{ statusNumber }}
      </div>
      <div class="error-status-text">
        {{  statusText }}
      </div>
      <div class="error-server-message">
        {{ serverMessage }}
      </div>
    </div>
  </div>
</template>

<script>

import CommonProps from "../CommonProps";

export default {
  name: "ErrorComponent",
  mixins: [CommonProps],
  props: {
    blob: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    server: ''
  }),
  computed: {
      statusText() {
        return this.blob.statusText;
      },
      statusNumber() {
        return this.blob.status;
      },
    serverMessage() {
        return this.server.message;
    }
  },
  methods: {
    async load() {
      const server_response = await this.blob.data.text();
      this.server = JSON.parse(server_response);
    }
  }

}
</script>

<style scoped>

</style>