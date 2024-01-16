# xlsx-visualizer

## Props

| Name                | Type      | Description | Default |
| ------------------- | --------- | ----------- | ------- |
| `blob`              | `Blob`    |             |         |
| `format`            | `string`  |             | `""`    |
| `can-download-file` | `boolean` |             | `true`  |
| `data-endpoint`     | `string`  |             | `""`    |

## Methods

### load()

Carga del documento desde un blob

**Syntax**

```typescript
load(): void
```

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

Realiza la descarga del documento con su respectivo nombre

**Syntax**

```typescript
async download(): Promise<void>
```

### addIndexRowToTable()

Dada una tabla agrega la columna asignada
a los numeros de las filas

**Syntax**

```typescript
addIndexRowToTable(table: HTMLTableElement): void
```

### addColumnsHeaderToTable()

Dada una tabla determina cuantas cols
deberian existir

**Syntax**

```typescript
addColumnsHeaderToTable(table: HTMLTableElement): void
```

### renderTable()

Transforma la tabla en un string
para ser renderizada mendiante la directiva
v-html

**Syntax**

```typescript
renderTable(table: any): void
```

### openSheet()

Cambia la hoja a visualizar

**Syntax**

```typescript
openSheet(sheetName: string): void
```

### generarArrayEncabezado()

**Syntax**

```typescript
generarArrayEncabezado(letras: unknown, cantidadColumnas: unknown): unknown
```
