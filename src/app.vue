<template>
<div style="width:100vw;height:100vh">
    <div>
        <label>checkable</label>
        <select @change="changeParameter('checkable',$event)">
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
    </div>
    <div style="width:80vw;height:80vh;margin-top:30px;border:1px solid red" ref="simpleTable">
        <Tabla 
            style="background:white" 
            height="100%" 
            :hiddenKeys="['PK_ID']" 
            :rows="rows" overflow="scroll" 
            :multiline="multiline" 
            v-on:orderBy="orderBy" 
            v-on:rowClick="rowClick" 
            v-on:checkClick="checkClick" 
            :checkable="checkable"
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
            , checkable: false
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
        const val = event.target.value * 1 
        this[param] = val * 1
        console.log(val)
    }
  }
  , mounted(){
        $(this.$refs.simpleTable).resizable({
        })

  }
}
</script>
