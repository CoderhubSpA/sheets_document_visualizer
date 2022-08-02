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
    /**
   * Nombre del componente para ser usado de 
   * forma individual
   */
    name: 'text-visualizer',
    /**
     * Insercion de props comunes entre todos los 
     * componente
     */
    mixins: [CommonProps],
    data: () => ({
        text: '',
    }),
    methods: {
        /**
         * Carga del documento .txt
         * en el visor
         * @return Void
         */
        async load() {
            this.text = await this.blob.text();
        }
    }
}
</script>