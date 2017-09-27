<template>
<div id="component-container" :style="{border:'0px solid red',width:width,height:height,overflow:'hidden','box-sizing':'border-box',position:'relative','padding-top':(searchable?'59px':'26px'),background:'#f4f4f4'}">
    <div :style="{height:'100%','overflow-x':overflow,'overflow-y':'scroll'}" v-on:scroll="scrollHeaders" id="scrollableDiv" ref="scrollableDiv">
        <table v-if="!multiline" style="margin:0" class="table table-condensed header">
            <tbody :style="{position:'absolute','margin-top':(searchable?'-59px':'-27px')} " ref="header">
                <tr><td style="text-align:center;" v-if="checkable && editedRows.length"><input type="checkbox" style="" @click="editedRows.forEach(row=>{row._checked=$event.target.checked})"></td><td v-for="key in keys" style="cursor:" @click="orderBy(key,$event.target)" :data-order="getOrder(key)">{{key}}</td></tr>
                <tr v-if="searchable"><td v-if="checkable">&nbsp;</td><td v-for="(key,i) in keys" ><div contenteditable="true" style="width:100%;cursor:text" @keyup="filterTable()"/></td></tr>
            </tbody>
        </table>
        <table data-component="Tabla" ref="tabla" class="table table-condensed" style="background:white">
            <tbody ref="tbody">
                <tr v-for="(row,rowIndex) in editedRows" @click="onRowClick(row,rowIndex)" v-if="row._filterPassed" :class="{rowSelected:selectedRowIndex==row._rowIndex}">
                    <td v-if="checkable" :class="tdClass" style="text-align:center">
                        <input type="checkbox" :checked="row._checked" @click="onCheckClick(row,rowIndex,$event);"/>
                    </td>
                    <template v-for="key in keys">
                        <td v-if="editablekeys.length && editablekeys.indexOf(key)!=-1" :contenteditable="editablekeys.indexOf(key)!=-1" :class="tdClass" @blur="editTable($event,key,row._rowIndex)" @keyup="resizeHeaders()"  :data-help-code="editablekeys.indexOf(key)!=-1?'general-cell-canedit':''">{{row[key]}}</td>
                        <td v-else :class="tdClass">
                            <div :style="wrapperStyle" :title="row[key]">{{row[key]}}</div>
                        </td>
                    </template>
                    <td :class="tdClass" v-if="deleteable || actions.length" style="white-space:nowrap">
                        <button v-if="deleteable" @click="onRowDelete($event,row._rowIndex)" style="" data-help-code="general-record-delete">
                            <svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M26 0C11.7 0 0 11.7 0 26s11.7 26 26 26 26-11.7 26-26S40.3 0 26 0zM38.5 28h-25c-1.1 0-2-0.9-2-2s0.9-2 2-2h25c1.1 0 2 0.9 2 2S39.6 28 38.5 28z"/></svg>
                        </button>
                        <button v-for="action in actions" @click="action.func($event,row._rowIndex)" style="" data-help-code="general-record-delete" v-html="action.button">
                        </button>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="!multiline" style="visibility:hidden">
                <tr><td style="text-align:center;" v-if="checkable"><input type="checkbox"></td><td v-for="key in keys" style="padding-top:0;padding-bottom:0"><div style="height:0;overflow:hidden">{{key}}</div></td></tr>
            </tfoot>
        </table>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  //props: [ 'rows', 'multiline', 'nowrap', 'searchable' ],
  props: {
    rows: {
        type: Array
        , required: true
    }
    , multiline: Boolean
    , nowrap: Boolean
    , searchable: Boolean
    , deleteable: Boolean
    , orderable: Boolean
    , checkable: Boolean
    , width: String
    , height: String
    , cellMaxHeight: String
    , overflow: String
    , hiddenKeys: {
        type: Array
        , default: function (){return []}
    }
    , editablekeys: {
        type: Array
        , default: function (){return []}
    }
    , actions: {
        type: Array
        , default: function (){return []}
    }
  },
  data: function () {
    return {
        orderby: {}
        , editedRows: this.generateEditedRows()
        , selectedRowIndex: {}
        , wrapperStyle: (function() {
            const style = {}
            if ( !this.cellMaxHeight ) return style
            Object.assign( style, {'max-height':this.cellMaxHeight,overflow:'hidden','text-overflow':'ellipsis'} )
            return style
        }.bind(this))()
        //, checkable: false
    }
  },
  watch: {
    rows(){
        this.editedRows = this.generateEditedRows()
        this.selectedRowIndex = -1
        //this.$emit('rowClick',{})
    }
  },
  computed: {
      keys: function  () {
          //console.log(this.editedRows)
          if ( ! this.rows.length ) return []
          //console.log(this.rows.length)
          const llaves = Object.keys(this.rows[0]).filter ( key => {
              return this.hiddenKeys.indexOf(key)==-1
          })
          //if ( this.deleteable ) llaves.push('_util')
          return llaves 
      },
      tdClass() {
          const classes = {nowrap:false}
          if ( this.nowrap ) classes.nowrap = 1
          return classes
      }
  },
  methods: {
      generateEditedRows() {
        if ( ! this.rows.length ) return []
        const editedRows = this.rows.map ( (row,i) => {
            return Object.assign ( {}, row, { _rowIndex: i, _filterPassed: true, _checked: false } )
        } )
        return editedRows
      },
      reIndexRows(rows) {
        if ( ! this.rows.length ) return rows
        this.rows.forEach ( (row,i) => {
            row._rowIndex = i
        } )
        return rows
      },
      editTable ( event, key, rowIndex ) {
            const value =  $(event.target).text()
            $(event.target).text(value)
            this.editedRows[rowIndex][key] = value
            const row = Object.assign({},this.editedRows[rowIndex])
            delete row._rowIndex
            delete row._filterPassed
            this.$emit('rowEdit',{rowIndex,key,value})
            //filterTable()
      },
      onRowDelete ( event, rowIndex ) {
          event.stopPropagation();
            if ( ! confirm ( 'Eliminar este registro?' ) ) return false
            this.$emit('rowDelete',rowIndex)
            //filterTable()
      },
      filterTable () {
          const searchFields = $('.header [contenteditable="true"]')
          //this.filteredRows = this.editedRows
          this.editedRows.forEach ( (row,i) => {
              let filterPassed = true
              Object.keys(this.rows[0]).forEach ( (key,i) => {
                  if ( filterPassed ) {
                    const val = searchFields.eq(i).text()
                    , rowVal = row[key]
                    , re = new RegExp ( val , "gi" )
                    , matches = ( rowVal && rowVal != null && typeof rowVal != "undefined" ) ? rowVal.toString().match(re) : false
                    //this.filteredRows = this.filteredRows.filter ( row => row[key].indexOf(val) != -1 )
                    //filterPassed = val == "" ? true : ( val == "*" ? ( row[key] != "" ) : ( row[key].indexOf(val) != -1 ) )
                    filterPassed = val == "" ? true : matches

                  }
              })
              this.editedRows[i]._filterPassed = filterPassed
          })
          this.resizeHeaders()
          //console.log(this.editedRows)
        //, filteredRows = this.rows.filter ( row => row[key].indexOf(val) != -1 )
        //this.filteredRows = filteredRows

      },
      onRowClick (row,rowIndex) {
        this.selectedRowIndex = row._rowIndex
          this.$emit('rowClick',row)
      },
      onCheckClick (row,rowIndex,event) {
          event.stopPropagation()
          const newRow = JSON.parse(JSON.stringify(row))
          newRow._checked = event.target.checked
          this.editedRows[rowIndex]=newRow;
          const checklist = this.editedRows.filter ( row => row._checked ).map ( row => row._rowIndex )//
          this.$emit('checkClick',checklist)
      },
      orderBy ( key, target ) {
          if ( !this.orderable ) return false
          const order = this.orderby[key] 
          let newOrder
          switch ( order ) {
              case 'asc':
                newOrder = 'desc'
                break
              case 'desc':
                newOrder = false
                break
              default:
                newOrder = 'asc'
          }
          delete this.orderby[key]
          $(target).removeAttr('data-order')
          if ( newOrder ) {
            this.orderby[key] = newOrder
            $(target).attr('data-order',newOrder)
          }
          this.$emit('orderBy',this.orderby)
        //log(this.orderby)
      },
      getOrder ( key ) {
          const order = this.orderby[key]
          return order
      },
      resizeHeaders() {
        const $header = $(this.$refs.header)
        , $tbody = $(this.$refs.tbody)
        , $columns = $tbody.find('tr:visible').eq(0).find('td')
        , $headerColumns = $header.find('tr').eq(0).find('td')
        //console.log('hc:'+$headerColumns.length)
        $header.width($tbody.width())
        $columns.each ( function (i) {
            const $col = $(this)
            , $headerCol = $headerColumns.eq(i)
            , width = $col.width()
            //console.log(i+'*'+width)
            $headerCol.width ( width )
        })
        this.scrollHeaders()
        //$table.css({background:'red'})
      },
      scrollHeaders() {
          //this.resizeHeaders()
          const div = this.$refs.scrollableDiv //$('#scrollableDiv')[0]
          , $header = $(this.$refs.header)
          , scrollLeft = ( div.scrollLeft * -1 ) 
          , width = $('#component-container').width()
          $header.css({'margin-left':scrollLeft+ 'px'})//.width (width-scrollLeft-20)
          //$(this.$refs.header).css({clip:`rect(0px,${width-scrollLeft-16}px,100px,0px)`})
          //console.log(width
      }
  },
  updated(){
    //if ( this.editedRows.length ) this.onRowClick(this.editedRows[0],0)
      this.resizeHeaders()
  },
    mounted () {
      window.addEventListener('resize', this.resizeHeaders )
      this.resizeHeaders()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.resizeHeaders)
    }    
}
</script>

<style scoped>
    .table {
        margin: 0;
    }
    tfoot, tfoot * {
        max-height: 0;
        height: 0;
    }
    .header {
        border:0px solid gray;
        //margin-top:-1px;
    }
    .header tr {
        background:#f4f4f4;
        //color: white;
    }
    [data-component="Tabla"] tr:hover {
        background: #eee;
    }
    tr.rowSelected {
        background: #ddd;
    }
    td {
        border:1px solid #ddd;
        box-sizing:border-box;
        font-size:11px;
    }
    .header td {
        //border:0;
    }
    .header td div {
        background: white;
        border:1px solid lightgray;
        padding: 2px;
        box-sizing: border-box;
    }
    td.nowrap {
        white-space: nowrap;
    }
    [data-order="asc"] {
        background: blue
    }
    [data-order="desc"] {
        background: green
    }
    table {
        border-collapse: collapse;
        //cursor: default;
    }
    td[contenteditable="true"] {
        cursor: text;
    }
    td[contenteditable="true"]:hover {
        border-color: gray;
    }
    td[contenteditable="true"]:focus {
        background:white;
        color: #444;
    }
    button {
        padding:0;
        margin:2px;
        height:20px;
        float: left;
        background:transparent;border:0;cursor:default;
        opacity: 0.7;
    }
    button svg {
        opacity: inherit;
    }
    button:hover{
        opacity: 0.9;
    }
    input[type="checkbox"] {
        margin:0;
        padding: 0;
    }
</style>