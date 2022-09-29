# ErrorComponent

## Props

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `blob` | `object` | &nbsp;      |

## Data

| Name     | Type     | Description | Initial value |
| -------- | -------- | ----------- | ------------- |
| `server` | `string` |             | `""`          |

## Computed Properties

| Name            | Type     | Description                |
| --------------- | -------- | -------------------------- |
| `statusText`    | `object` | **Dependencies:** `blob`   |
| `statusNumber`  | `object` | **Dependencies:** `blob`   |
| `serverMessage` | `object` | **Dependencies:** `server` |

## Methods

### load()

**Syntax**

```typescript
async load(): Promise
```

