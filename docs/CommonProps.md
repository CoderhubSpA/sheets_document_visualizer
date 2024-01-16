# CommonProps

Mix Base para la definicion de propiedades
y metodos de los visualizadores

## Props

| Name                | Type      | Description | Default |
| ------------------- | --------- | ----------- | ------- |
| `blob`              | `Blob`    |             |         |
| `format`            | `string`  |             | `""`    |
| `can-download-file` | `boolean` |             | `true`  |
| `data-endpoint`     | `string`  |             | `""`    |

## Methods

### load()

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

Descarga de documento PDF

**Syntax**

```typescript
download(): void
```
