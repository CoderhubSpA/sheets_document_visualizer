# ErrorComponent

## Props

| Name                | Type      | Description | Default |
| ------------------- | --------- | ----------- | ------- |
| `blob`              | `object`  |             |         |
| `format`            | `string`  |             | `""`    |
| `can-download-file` | `boolean` |             | `true`  |
| `data-endpoint`     | `string`  |             | `""`    |

## Computed Properties

| Name            | Type      | Description                |
| --------------- | --------- | -------------------------- |
| `statusText`    | `unknown` | **Dependencies:** `blob`   |
| `statusNumber`  | `unknown` | **Dependencies:** `blob`   |
| `serverMessage` | `unknown` | **Dependencies:** `server` |

## Methods

### load()

**Syntax**

```typescript
async load(): Promise<void>
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

Descarga de documento PDF

**Syntax**

```typescript
download(): void
```
