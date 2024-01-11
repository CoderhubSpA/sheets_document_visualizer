<template>
   <layout-visualizer :canDownloadFile="canDownloadFile" :dataEndpoint="dataEndpoint">
    <div class="xlsx-visualizer">
      <div class="xlsx-container" ref="xlsx-container" v-html="dataSheet" />
      <div class="sheets-name">
        <div class="sheet-name" v-for="(sn, key) in sheetsName" :key="key" @click="openSheet(sn)" :class="{'active': activeSheet == sn}">
          {{ sn }}
        </div>
      </div>
    </div>
  </layout-visualizer>
</template>
<script>
import * as XLSX from 'xlsx';
import axios from 'axios';
import CommonProps from '../CommonProps.vue';
import { DEFAULT_TABLE_BODY } from '../../helpers/Constants';
import Visualizer from '../Layout/Visualizer.vue';
export default {
  components: {
    'layout-visualizer': Visualizer,
  },
  name: 'xlsx-visualizer',
  mixins: [CommonProps],
  data: () => ({
    sheetsName: [],
    workbook: null,
    activeSheet: null,
    loading: false,
    dataSheet: DEFAULT_TABLE_BODY
  }),
  watch: {
    activeSheet(value) {
      if (value) {
        const sheet = this.workbook.Sheets[value];
        const table = document.createElement('table');
        let dataToRender = '';
        if (Object.keys(sheet).length > 0) {
          const HTML = XLSX.utils.sheet_to_html(sheet);
          dataToRender = HTML.split('<table>')[1].split('</table>')[0].trim();
          
        } else {
          dataToRender = DEFAULT_TABLE_BODY;
        }
        table.innerHTML = dataToRender
        // agregar las filas de indice
        this.addIndexRowToTable(table);
        // agregar las columnas
        this.addColumnsHeaderToTable(table);
        // renderizar tabla
        this.renderTable(table);
      }
    }
  },
  methods: {
    /**
     * Dada una tabla agrega la columna asignada 
     * a los numeros de las filas
     * @param {HTMLTableElement} table 
     */
    addIndexRowToTable(table) {
      for (let index = 0; index < table.rows.length; index++) {
        const element = table.rows[index];
        const indexColumn = document.createElement('td');
        indexColumn.classList.add('index-column');
        indexColumn.innerHTML = index + 1
        element.insertBefore(indexColumn, element.firstChild)
      }
    },
    /**
     * Dada una tabla determina cuantas cols
     * deberian existir
     * @param {HTMLTableElement} table 
     */
    addColumnsHeaderToTable(table) {
      const rows = table.getElementsByTagName('tr');
      // debe asignar 
      const numCols = [1];
      for (const row in Array.from(rows)) {
        // debe existir al menos 1 columna
        let acc = 1;
        const cols = rows[row].getElementsByTagName('td')
        // la fila en la posicion actual contiene N columnas
        // considerar que el colSpan por defecto siempre es 1
        numCols.push(Array.from(cols).reduce((acc, cell) => acc + cell.colSpan, acc))
      }
      // numero de columnas a generar
      const colsToGenerate = Math.max.apply(null, numCols)
      const alpha = Array.from(Array(26)).map((e, i) => i + 65);
      const alphabet = alpha.map((x) => String.fromCharCode(x));
      
      const columnsId = this.generarArrayEncabezado(alphabet, colsToGenerate);
      columnsId.unshift('');

      const header = table.createTHead();
      const row = header.insertRow(0);
      columnsId.forEach((id, index) => {
        const cell = row.insertCell(index)
        cell.innerHTML = id;
      });
    },
    /**
     * Transforma la tabla en un string
     * para ser renderizada mendiante la directiva
     * v-html
     * @param {*} table 
     */
    renderTable(table) {
      this.dataSheet = table.outerHTML;
    },
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

      const objectURL  = URL.createObjectURL(this.blob);
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = row.name || 'sheets.xlsx';
      link.click()
      link.remove();
    },
    /**
     * Cambia la hoja a visualizar
     * @param {string} sheetName 
     */
    openSheet(sheetName) {
      this.activeSheet = sheetName
    },
    /**
     * Carga del documento desde un blob
     */
    load() {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        this.workbook = XLSX.read(data, {type: 'binary'});
        this.sheetsName = this.workbook.SheetNames;
        this.activeSheet = this.workbook.SheetNames[0]
      }
      reader.readAsBinaryString(this.blob);
    },
    generarArrayEncabezado(letras, cantidadColumnas) {
      // Inicializa el array
      const arrayEncabezado = [];

      // Agrega las letras del alfabeto
      for (let letra of letras) {
        arrayEncabezado.push(letra);
      }

      // Agrega las combinaciones de letras
      for (let i = 0; i < cantidadColumnas; i++) {
        // Obtiene la letra actual
        const letraActual = arrayEncabezado[i];

        // Agrega la combinación de letras
        for (let j = 0; j < letras.length; j++) {
          arrayEncabezado.push(`${letraActual}${letras[j]}`);
        }

        if (arrayEncabezado.length > cantidadColumnas -2) {
          break;
        }
      }

      return arrayEncabezado.slice(0, cantidadColumnas - 2);
    }
  },
};
</script>
<style lang="css">

</style>