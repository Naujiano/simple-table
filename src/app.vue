<template>
    <div style="width:80vw;height:80vh;margin-top:30px;border:1px solid red">
        <Tabla style="background:white" height="100%" :hiddenKeys="['PK_ID']" :rows="rows" overflow="scroll" :multiline="multiline" v-on:orderBy="orderBy" v-on:rowClick="rowClick" v-on:checkClick="checkClick" :checkable="true"/>
    </div>
</template>
<script>
import Tabla from './components/simple-table.vue'
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
        }
	}
  , methods: {
    orderBy(){

    },
    rowClick() {

    },
    checkClick() {
      
    }
  }
}
</script>
