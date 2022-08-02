# document-visualizer

## Props

| Name             | Type     | Description               |
| ---------------- | -------- | ------------------------- |
| `src` *required* | `string` | URL del file a visualizar |

## Data

| Name     | Type      | Description                     | Initial value |
| -------- | --------- | ------------------------------- | ------------- |
| `format` | `string`  | Formato del archivo obtenido    | `""`          |
| `blob`   | `unknown` | Representacion Blob del archivo | `null`        |

## Computed Properties

| Name     | Type      | Description                                                                                                    |
| -------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| `viewer` | `unknown` | Importa el componente adecuado, para la visualizacion del file segun su formato<br/>**Dependencies:** `format` |

