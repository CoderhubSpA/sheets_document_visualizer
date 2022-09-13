<template>
  <div id="spreadsheet" ref="spreadsheet"></div>
</template>
<script>

import CommonProps from '../CommonProps.vue';
import jspreedsheet from 'jspreadsheet-ce';

export default {
    name: 'xlsx-visualizer',
    mixins: [CommonProps],
    data: () => ({
        body: [
          ["Jazz", "Honda", "2019-02-12", '', true, "$ 2.000,00", "#777700"],
          ["Civic", "Honda", "2018-07-11", "", true, "$ 4.000,01", "#007777"],
          ["Z4", "BMW", "2017-11-24", "", false, "$ 324.072,58", "#700d0d"],
          ["Boxter S", "Porshe", "2019-08-24", "", true, "$ 307.839,45", "#0e0438"]
        ]
    }),
  computed: {
      options() {
        return {
          data: this.body,
          columns: [
            { type: "text", title: "Car", width: "120px" },
            {
              type: "dropdown",
              title: "Make",
              width: "250px",
              source: ["Alfa Romeo", "Audi", "BMW", "Honda", "Porshe"]
            },
            { type: "calendar", title: "Available", width: "250px" },
            { type: "image", title: "Photo", width: "120px" },
            { type: "checkbox", title: "Stock", width: "80px" },
            {
              type: "numeric",
              title: "Price",
              width: "120px",
              mask: "$ #.##,00",
              decimal: ","
            },
            { type: "color", width: "100px", render: "square" }
          ]
        }
      }
  },
    methods: {
        load() {
            const obj = jspreedsheet(this.$refs['spreadsheet'], this.options);
            Object.assign(this, {obj});

        },
    },
};
</script>
<style lang="css">
@import url('jspreadsheet-ce/dist/jspreadsheet.css');
</style>