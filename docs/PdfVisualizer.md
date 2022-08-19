# pdf-visualizer

## Data

| Name          | Type      | Description | Initial value |
| ------------- | --------- | ----------- | ------------- |
| `pdf`         | `unknown` |             | `null`        |
| `numPages`    | `number`  |             | `0`           |
| `thumbnails`  | `array`   |             | `[]`          |
| `scale`       | `number`  |             | `1`           |
| `page`        | `number`  |             | `1`           |
| `showSideBar` | `boolean` |             | `false`       |

## Computed Properties

| Name               | Type     | Description                          |
| ------------------ | -------- | ------------------------------------ |
| `can_go_next_page` | `binary` | **Dependencies:** `page`, `numPages` |
| `can_go_prev_page` | `binary` | **Dependencies:** `page`             |

## Methods

### fromThumbToPage()

Permite hacer click en un thumbnail
para ir a esa pagina

**Syntax**

```typescript
fromThumbToPage(page: Number): void
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

### load()

Carga de documento en el componente

**Syntax**

```typescript
async load(): Promise
```

### renderPage()

Renderiza una pagina concreta del documento pdf

**Syntax**

```typescript
renderPage(ctx: Object, num: Number, canvas: HTML): void
```

**Parameters**

- `ctx: Object`<br/>
  objeto pdf (loadingTask)

- `num: Number`<br/>
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

- `ctx: Object`<br/>
  objeto pdf (loadingTask)

- `num: Number`<br/>
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

### download()

Descarga de documento PDF

**Syntax**

```typescript
download(): void
```

### print()

Imprimir document

**Syntax**

```typescript
print(): void
```

