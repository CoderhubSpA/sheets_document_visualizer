# pdf-visualizer

## Props

| Name                | Type      | Description | Default |
| ------------------- | --------- | ----------- | ------- |
| `blob`              | `Blob`    |             |         |
| `format`            | `string`  |             | `""`    |
| `can-download-file` | `boolean` |             | `true`  |
| `data-endpoint`     | `string`  |             | `""`    |

## Computed Properties

| Name               | Type      | Description                                                                                |
| ------------------ | --------- | ------------------------------------------------------------------------------------------ |
| `can_go_next_page` | `boolean` | Permitir ir a la siguiente pagina, si esta existe<br/>**Dependencies:** `page`, `numPages` |
| `can_go_prev_page` | `boolean` | Permitir ir a la pagina anterior, si esta existe<br/>**Dependencies:** `page`              |

## Methods

### load()

Carga de documento en el componente

**Syntax**

```typescript
async load(): Promise<void>
```

### print()

Imprimir document

**Syntax**

```typescript
print(): void
```

**Return value**

void

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

Descarga de documento PDF

**Syntax**

```typescript
async download(): Promise<void>
```

**Return value**

void

### setPage()

**Syntax**

```typescript
setPage(p: unknown): void
```

### nextPage()

Desplaza el focus en el visor
a la siguiente pagina

**Syntax**

```typescript
nextPage(): void
```

### prevPage()

Desplaza el focus en el visor
a la pagina anterior

**Syntax**

```typescript
prevPage(): void
```

### zoomIn()

Acercamiento (zoom in) del documento

**Syntax**

```typescript
zoomIn(): void
```

### zoomOut()

Alejamiento del documento

**Syntax**

```typescript
zoomOut(): void
```

### renderPage()

Renderiza una pagina concreta del documento pdf

**Syntax**

```typescript
renderPage(ctx: Object, num: Number, canvas: HTML): void
```

**Parameters**

- `ctx: object`<br/>
  objeto pdf (loadingTask)

- `num: number`<br/>
  numero de pagina

- `canvas: HTML`<br/>
  elemento HTML donde se hara la renderizacion

### renderThumbnail()

Renderiza los thumbnails de las paginas
draw page to fit into 96x96 canvas

**Syntax**

```typescript
renderThumbnail(ctx: Object, num: Number, thumb: HTML): void
```

**Parameters**

- `ctx: object`<br/>
  objeto pdf (loadingTask)

- `num: number`<br/>
  numero de pagina

- `thumb: HTML`<br/>
  elemento HTML donde se hara la renderizacion

### renderDocument()

Procesa el documento e inicia el trabajo de
renderizado de las paginas

**Syntax**

```typescript
renderDocument(): void
```

### intersectionObserver()

Provee una vía asíncrona para observar cambios en la intersección
de un elemento con un elemento ancestro o con el viewport del
documento de nivel superior.

**Syntax**

```typescript
intersectionObserver(): unknown
```

### changePage()

**Syntax**

```typescript
changePage(e: unknown): void
```
