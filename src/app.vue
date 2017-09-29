<template>
<div style="width:100vw;height:100vh;box-sizing:border-box;border:0px solid red">
    <h1 style="margin:auto;width:300px">Simple Table Vue</h1>
    <h3>Component Props</h3>
    <div class="divParam">
        <label>checkable</label>
        <select @change="changeParameter('checkable',$event)">
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
    </div>
    <div class="divParam">
        <label>searchable</label>
        <select @change="changeParameter('searchable',$event)">
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
    </div>
    <div class="divParam">
        <label>deleteable</label>
        <select @change="changeParameter('deleteable',$event)">
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
    </div>
    <div class="divParam">
        <label>nowrap</label>
        <select @change="changeParameter('nowrap',$event)">
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
    </div>
    <div class="divParam">
        <label>hiddenKeys (Array of strings)</label>
        <input style="height:15px" @blur="changeParameter('hiddenKeys',$event)" :value="JSON.stringify(hiddenKeys)"/>
    </div>
    <div class="divParam" style="clear:left;padding-top:10px;width:40vw">
        <label>rows (Array of objects)</label>
        <textarea style="width:100%;height:200px" @blur="changeParameter('rows',$event)">{{rows}}</textarea>
    </div>
    <!--
    <div class="divParam" style="padding-top:10px;width:40vw">
        <label>actions</label>
        <textarea style="width:100%;height:200px" @blur="changeParameter('gridActions',$event)">{{gridActions}}</textarea>
    </div>
    -->
    <h3 style="display:block;clear:both;padding-top:20px">Component Render</h3>
    <p>Resize the table to check the behavior.</p>
    <div style="width:80vw;height:400px;border:5px solid gray;clear:both" ref="simpleTable">
        <Tabla 
            style="background:white" 
            height="100%" 
            :hiddenKeys="hiddenKeys" 
            :rows="rows"
            overflow="scroll" 
            v-on:orderBy="orderBy" 
            v-on:rowClick="rowClick" 
            v-on:checkClick="checkClick" 
            :checkable="checkable"
            :deleteable="deleteable"
            :nowrap="nowrap"
            :searchable="searchable"
            :actions="[]"
        />
    </div>
</div>
</template>
<script>
import Tabla from './components/simple-table.vue'
import $ from 'jquery'
import resizable from 'jquery-ui/ui/widgets/resizable'

export default {
    components: {Tabla}
    , data () {
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
            , gridActions: [
                {
                    button: `<svg style="width:20px;opacity:inherit" data-help-code="general-sql-get" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><path d="M28 0C12.6 0 0 12.6 0 28s12.6 28 28 28 28-12.6 28-28S43.4 0 28 0zM40 41H16c-1.1 0-2-0.9-2-2s0.9-2 2-2h24c1.1 0 2 0.9 2 2S41.1 41 40 41zM40 30H16c-1.1 0-2-0.9-2-2s0.9-2 2-2h24c1.1 0 2 0.9 2 2S41.1 30 40 30zM40 19H16c-1.1 0-2-0.9-2-2s0.9-2 2-2h24c1.1 0 2 0.9 2 2S41.1 19 40 19z"/></svg>`
                    , func: function (event,_rowIndex) {
                        event.stopPropagation();
                        alert("Clicked on _rowIndex:" + _rowIndex)
                    }.bind(this)
                }
            ]            
            , checkable: false
            , deleteable: false
            , nowrap: false
            , searchable: false
            , hiddenKeys: []
        }
	}
  , methods: {
    orderBy(){

    },
    rowClick() {

    },
    checkClick() {
      
    },
    changeParameter(param,event) {
        var val = event.target.value
        if ( param == "hiddenKeys" || param == "rows" ) {
            val = JSON.parse ( val )
        } else {
            val = val * 1
        }
        this[param] = val
        //console.log(val)
    }
  }
  , mounted(){
        $(this.$refs.simpleTable).resizable({
            resize: function(){
                window.dispatchEvent(new Event('resize'));
            }

        })

  }
}
</script>
<style scoped>
p {
    font-family: arial;
    font-size: 11px;
}
.divParam {
    float: left;
    width: 150px;
}
select {
    display:block;
}
</style>