# A Vue component to render filterable tables with sticky headers

This repo contains a Vue component that can render a filterable table with sticky headers.

# Installation

```
npm install simple-table-vue
```

# Usage

```
import {SimpleTable} from 'simple-table-vue'
```

# Props

You can pass these props  to the component:
- `rows`: (required) the data the component will operate on. An Array of Objects.
- `nowrap`: `False` by deafult. If set to `True` each `<td>` of the table will have `white-space: nowrap` in its style.
- `searchable`: `False` by deafult. If set to `True` a searchable field will appear below each header.
- `checkable`: `False` by deafult. If set to `True` a checkbox field will appear to the left of each record.
- `cellMaxHeight`: Set the table `<td>` maximum height. Use a number followed by a unit indentifier, for example `12px'.
- `hiddenKeys`: An Array of Strings. Use this if you want to not render some keys from the `rows` property.
- `editablekeys`: An Array of Strings. Use this if you want to allow the edition of some keys from the `rows` property.

# Events

The component emits the following events:
- `rowClick`: Fired when a row is selected. Returns an Object with the entire row.
- `checkClick`: Fired when the checkbox of a row is clicked. Returns an Array with the indexes of the rows checked.

