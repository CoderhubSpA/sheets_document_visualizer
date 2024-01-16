# document-visualizer

## Props

| Name             | Type                   | Description                                              |
| ---------------- | ---------------------- | -------------------------------------------------------- |
| `src` *required* | `string` &#124; `File` | URL del archivo a visualizar o el File de un input[file] |

## Data

| Name     | Type      | Description                     | Initial value |
| -------- | --------- | ------------------------------- | ------------- |
| `format` | `string`  | Formato del archivo obtenido    | `""`          |
| `blob`   | `unknown` | Representacion Blob del archivo | `null`        |

## Computed Properties

| Name              | Type                      | Description                                                                                                    |
| ----------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `canDownloadFile` | `boolean`                 | Determina si el archivo en visualizacion es descargable o no<br/>**Dependencies:** `src`                       |
| `type_of_src`     | `boolean`                 | Determina si la fuente entregada es de tipo String o File<br/>**Dependencies:** `src`                          |
| `viewer`          | `unknown`                 | Importa el componente adecuado, para la visualizacion del file segun su formato<br/>**Dependencies:** `format` |
| `url`             | `unknown`                 | Determina si la fuente entregada es de tipo String o no<br/>**Dependencies:** `src`                            |
| `dataEndpoint`    | `string` &#124; `unknown` | Construye el endpoint para la descarga del archivo<br/>**Dependencies:** `type_of_src`, `src`                  |

## Methods

### download()

Realiza la descarga del archivo

**Syntax**

```typescript
async download(): Void
```

### readSrc()

Si el visualizador posee una URL
realiza un llamado al backend
o lee desde un archivo cargado desde un input

**Syntax**

```typescript
readSrc(): Void
```

### readFromURL()

Realiza un llamado al backend
esperando que el tipo de respuesta sea manejada
como un blob

**Syntax**

```typescript
readFromURL(): Void
```

### readFromFile()

Cuando el input del visualizador
es un Archivo no cargado a la plataforma
recibe un {File} y este se encarga de transformarlo como blob

**Syntax**

```typescript
readFromFile(): Void
```
