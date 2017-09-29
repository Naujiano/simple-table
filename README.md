# A Vue component to render filterable tables with sticky headers

This repository contains a Vue.js component that can render a filterable table with sticky headers.

This component aims to be efficient at handling big tables with loads of rows.

For the moment it is dependent on jQuery.

jQuery UI is not used by the component itself, only by the [working example](https://rawgit.com/Naujiano/simple-table/master/working-example/index.html) to make the component container resizable.

# Installation

```
npm install simple-table-vue
```

# Usage

Vue.js code:

```
<template>

    <SimpleTable :rows="rows"/>

</template>

<script>

    import {SimpleTable} from 'simple-table-vue'

    export default {
        data () {
            return {
              rows: [
                    {nombre:"javier",apellido:"",dni:""}
                    ,{nombre:"juan",apellido:"migliorini",dni:"12345678z"}
                    ,{nombre:"javier",apellido:"de la quintana",dni:"12345678z"}
                    ,{nombre:"javier",apellido:"de la quintana",dni:"12345678z"}
                    ,{nombre:"javier",apellido:"de la quintana",dni:"12345678z"}
                    ,{nombre:"javier",apellido:"de la quintana",dni:"12345678z"}
                    ,{nombre:"javier",apellido:"de la quintana",dni:"12345678z"}
                    ,{nombre:"javier",apellido:"de la quintana",dni:"12345678z"}
                ]
            }
        }
    }

</script>
```

# Props

You can pass these props  to the component:
- `rows`: (required) the data the component will operate on. An Array of Objects.
- `nowrap`: `False` by default. If set to `True` each `<td>` of the table will have `white-space: nowrap` in its style.
- `searchable`: `False` by default. If set to `True` a searchable field will appear below each header. The searched value will be treated as a regular expression.
- `checkable`: `False` by default. If set to `True` a checkbox field will appear to the left of each record.
- `overflow`: `auto` by default. This value is assigned to the `overflow-x` css parameter of the component. The `overflow-y` css parameter is hardcoded to `scroll` in the component, so the vertical scrollbar is always shown.
- `cellMaxHeight`: Set the table `<td>` maximum height. Use a number followed by a unit indentifier, for example `12px`.
- `hiddenKeys`: An Array of Strings. Use this if you want to not render some keys from the `rows` property. You will usually want to hide an ID field that you pass for editing purposes.
- `editablekeys`: An Array of Strings. Use this if you want to allow the edition of some keys from the `rows` property.
- `actions`: An Array of objects. Each Object of the Array defines a user button that will appear to the right of the each record and must have the properties: `button` and `func`. The first being the HTML code to define the button and the second a function that will be called when the button is clicked. This function receives two parameters: `event` and `rowIndex`.

# Events

The component emits the following events:
- `checkClick`: Fired when the checkbox of a row is clicked. Returns an Array with the indexes of the rows checked.
- `rowClick`: Fired when a row is selected. Returns an Object with the entire row.
- `rowEdit`: Fired when a row is edited. Returns an Object with the following keys: `rowIndex`, `key`, `value`, with the index of the edited row, they edited keyname and the value after the edition is done.

The component listen to the following events:
- `resize`: Fired when the browser window is resized. The component recalculates the headers size and position each time this event is fired. You can fire this event from Javascript if you need to make the component react to a container resize event on your code.

# Interactive working example

You can see the component in action and test its properties in the following [working example](https://rawgit.com/Naujiano/simple-table/master/working-example/index.html).

