<template>
  <div id="xlsx-visualizer">
    <slot name="toolbar">
        <div class="toolbar">
          <div class="toolbar-items">
            <div class="left-options">
              <div class="toolbar-item">
                <!-- <i class="bi bi-search" @click="showSearch = !showSearch"></i> -->
                <!-- <div class="toolbar-item-option" v-if="showSearch"> -->
                  <!-- <input type="text" name="search" id="search" placeholder="Buscar..." v-model="search">
                  <span class="match-text">
                    {{ match_text }}
                  </span> -->
                  <!-- <i class="bi bi-x" @click="showSearch = false"></i> -->
                <!-- </div> -->
              </div>
            </div>
            <div class="center-options">

            </div>
            <div class="right-options">
              <div class="toolbar-item" @click="download">
                <i class="bi bi-cloud-arrow-down-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </slot>
    <div class="xlsx-container">
      <table class="spreadsheet" ref="spreadsheet">
        <thead>
          <td v-for="(column, i) in columns" :key="i" class="spreadsheet-column">
            {{ column }}
          </td>
        </thead>
        <tbody>
          <tr v-for="(row, key) in dataSheet" :key="key">
            <td class="spreadsheet-column">
              {{ key + 1}}
            </td>
            <td v-for="(content, i) in unifyRowLength(row)" :key="i" class="spreadsheet-cell-value">
              {{ content }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--  -->
    <div class="sheets-name">
      <div class="sheet-name" v-for="(sn, key) in sheetsName" :key="key" @click="openSheet(sn)">
        {{ sn }}
      </div>
    </div>
  </div>
</template>
<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
import CommonProps from '../CommonProps.vue';

export default {
  name: 'xlsx-visualizer',
  mixins: [CommonProps],
  data: () => ({
    sheetsName: [],
    workbook: null,
    activeSheet: ''
  }),
  computed: {
    dataSheet() {
      let data = [];
      if (this.workbook) {
        const content = XLSX.utils.sheet_to_row_object_array(this.workbook.Sheets[this.activeSheet]);
        let header = {}
        Object.keys(content[0]).map((key) => {
          header[key] = key  
        })
        data = [header, ...content]
      }
      return data;
    },
    columns() {
      // 
      const columns = [''];
      let max = 0;
      this.dataSheet.forEach((row) => {
        const columns_per_row = Object.keys(row).length
        if ( columns_per_row > max)
          max = columns_per_row;
      });
      for (let index = 0; index <= max + 3; index++) {
        columns.push(this.intToChar(index));
      }
      return columns;
    }
  },
  methods: {
    /**
     * Realiza la descarga del documento con su respectivo nombre
     */
    async download() {
      const response  = await axios.get(this.dataEndpoint);

          const parts  = this.dataEndpoint.split('/');
          const id = parts[parts.length -1];
          const row = response.data.content.entities_fk.document.find((el) => {
            return el.id === id;
          })

          const name = row.name || 'sheets.pdf';

          const objectURL  = URL.createObjectURL(this.blob);
          const link = document.createElement('a');
          link.href = objectURL;
          link.download = name;
          link.click()
          link.remove();
      // const url  = URL.createObjectURL(this.blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = 'sheets.xlsx';
      // link.click()
      // link.remove();
    },
    unifyRowLength(row) {
      let result = new Array(this.columns.length -1).fill('')
      Object.keys(row).forEach((key, index) => {
        result[index] = row[key]
      });
      return result;
    },
    intToChar(num) {
      const code = 'A'.charCodeAt(0);
      return String.fromCharCode(code + num);
    },
    openSheet(sheetName) {
      console.log(sheetName)
      this.activeSheet = sheetName
    },
    openCity(cityName) {
      var i;
      var x = document.getElementsByClassName("city");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(cityName).style.display = "block";
    },
    load() {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        this.workbook = XLSX.read(data, {type: 'binary'});
        console.log(this.workbook)
        this.activeSheet = this.workbook.SheetNames[0]
        this.sheetsName = this.workbook.SheetNames;
      }
      reader.readAsBinaryString(this.blob);

    },
  },
};
</script>
<style lang="css">

</style>