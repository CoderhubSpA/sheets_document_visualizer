# docx-visualizer

## Props

| Name                | Type      | Description | Default |
| ------------------- | --------- | ----------- | ------- |
| `blob`              | `Blob`    |             |         |
| `format`            | `string`  |             | `""`    |
| `can-download-file` | `boolean` |             | `true`  |
| `data-endpoint`     | `string`  |             | `""`    |

## Computed Properties

| Name         | Type      | Description                                                                                            |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------ |
| `match_text` | `unknown` | Calcula todas las coincidencias de busquedas y muestra la cantidad<br/>**Dependencies:** `$`, `result` |

## Methods

### load()

Convierte el Un Blob de un documento .docx
en HTML para ser visualizado en el componente

**Syntax**

```typescript
load(): void
```

**Return value**

Void

### print()

**Syntax**

```typescript
print(): void
```

### validUrl()

Validacion de url

**Syntax**

```typescript
validUrl(str: unknown, String: unknown): boolean
```

**Parameters**

- `str: unknown`

- `String: unknown`<br/>
  url

**Return value**

Boolean

### download()

Descarga de documento docx

**Syntax**

```typescript
async download(): Promise<void>
```

**Return value**

void

### nextSection()

**Syntax**

```typescript
nextSection(): void
```

### prevSection()

**Syntax**

```typescript
prevSection(): void
```

### changePage()

**Syntax**

```typescript
changePage(e: unknown): void
```

### setSection()

**Syntax**

```typescript
setSection(s: unknown): void
```

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
