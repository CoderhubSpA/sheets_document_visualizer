# CsvVisualizer

## Slots

| Name      | Description                                                             |
| --------- | ----------------------------------------------------------------------- |
| `toolbar` | Toolbar: Muestra barra de herramientas para interaccion con el document |
| `content` | Content: Zona de renderizado de todas las paginas del documento         |
| `footer`  | Footer: Pie de pagina del documento. Por defecto esta en blanco         |

## Data

| Name         | Type      | Description                                  | Initial value |
| ------------ | --------- | -------------------------------------------- | ------------- |
| `search`     | `string`  | texto a buscar                               | `""`          |
| `showSearch` | `boolean` | mostrar/ocultar opcion de busqueda           | `false`       |
| `csv`        | `string`  | informacion original                         | `""`          |
| `result`     | `string`  | informacion despues de realizar una busqueda | `""`          |

## Computed Properties

| Name         | Type      | Description                                                                                            |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------ |
| `match_text` | `unknown` | Calcula todas las coincidencias de busquedas y muestra la cantidad<br/>**Dependencies:** `$`, `result` |

## Methods

### load()

**Syntax**

```typescript
async load(): Promise
```

### download()

Descarga de documento csv

**Syntax**

```typescript
download(): void
```

**Return value**

void

### searchInContent()

Busqueda de texto en el contenido
y coloca las coincidencias dentro de un
span.highlight y renderiza nuevamente el documento
con las modificaciones, en caso de no haber parametro de busqueda
coloca el texto original

**Syntax**

```typescript
searchInContent(search: unknown): void
```

