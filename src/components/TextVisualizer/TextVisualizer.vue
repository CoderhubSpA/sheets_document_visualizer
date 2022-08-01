<template>
    <div class="text-visualizer">
        <div class="text-content">
            {{ text }}
        </div>
    </div>
</template>
<script>
import CommonProps from '../CommonProps.vue';

export default {
    name: 'text-visualizer',
    mixins: [CommonProps],
    data: () => ({
        text: '',
    }),
    mounted() {
        this.parseBlobToText();
    },
    methods: {
        async parseBlobToText() {
            this.text = await this.blob.text();
        }
    }
}
</script>