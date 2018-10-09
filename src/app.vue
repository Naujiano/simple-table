<template>
<div style="width:100vw;height:100vh;box-sizing:border-box;border:0px solid red">
    <h1 style="margin:auto;width:600px">Simple Table Vue Working Example</h1>
    <h3>Component Props</h3>
    <div style="width: 80vw;">
        <div class="divParam form-group" style="float:left;padding-top:0px;width:40vw">
            <label>rows (Array of objects)</label>
            <textarea class="form-control" style="width:100%;height:385px" @blur="changeParameter('rows',$event)">{{rows}}</textarea>
        </div>
        <div class="divParam">
            <label>checkable</label>
            <select class="form-control" @change="changeParameter('checkable',$event)">
                <option value="0">False</option>
                <option value="1">True</option>
            </select>
        </div>
        <div class="divParam">
            <label>singlecheck</label>
            <select class="form-control" @change="changeParameter('singlecheck',$event)">
                <option value="0">False</option>
                <option value="1">True</option>
            </select>
        </div>
        <div class="divParam">
            <label>searchable</label>
            <select class="form-control" @change="changeParameter('searchable',$event)">
                <option value="0">False</option>
                <option value="1">True</option>
            </select>
        </div>
        <div class="divParam">
            <label>nowrap</label>
            <select class="form-control" @change="changeParameter('nowrap',$event)">
                <option value="0">False</option>
                <option value="1">True</option>
            </select>
        </div>
        <div class="divParam">
            <label>overflow</label>
            <select class="form-control" @change="changeParameter('overflow',$event)">
                <option value="auto">auto</option>
                <option value="scroll">scroll</option>
            </select>
        </div>
        <div class="divParam">
            <label>hiddenKeys (Array of strings)</label>
            <input class="form-control" @blur="changeParameter('hiddenKeys',$event)" :value="JSON.stringify(hiddenKeys)"/>
        </div>
        <div class="divParam">
            <label>editablekeys (Array of strings)</label>
            <input class="form-control" @blur="changeParameter('editablekeys',$event)" :value="JSON.stringify(editablekeys)"/>
        </div>
    </div>
    <!--
    <div class="divParam" style="padding-top:10px;width:40vw">
        <label>actions</label>
        <textarea style="width:100%;height:200px" @blur="changeParameter('gridActions',$event)">{{gridActions}}</textarea>
    </div>
    -->
    <h3 style="display:block;clear:both;padding-top:20px">Component Render</h3>
    <p>Resize the table to check the behavior.</p>
    <div style="width:600px;height:200px;border:5px solid gray;clear:both" ref="simpleTable">
        <Tabla 
            style="background:white" 
            height="100%" 
            :hiddenKeys="hiddenKeys" 
            :rows="rows"
            :overflow="overflow" 
            v-on:orderBy="orderBy" 
            v-on:rowClick="rowClick" 
            v-on:checkClick="checkClick" 
            :checkable="checkable"
            :singlecheck="singlecheck"
            :nowrap="nowrap"
            :searchable="searchable"
            :actions="[]"
            :editablekeys = "editablekeys"
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
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj añlsdkfjañlsdjfñadfjñadkfjwñefklsdanfkahfaldkflñadksfnwlfnwelfnwlfkadf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"},
                {name:"juan","Last Name":"migliorini",dni:"12345678z",Address:"Calle pescador del romero, 13. San Jacinto del monte.",email:"midirecciondeemail@midominion.com","C.V.":"asldj ñaskd ñq je ñasdklf ahdfqw fkajdhf asgjkha dlkjashqkw l dlsfkjh qlehj lqewkh fljewh lqwhje qlehf lajdhsf aldkfmfq mefnjvbavjba lkjhfq lkjher qlwjeh lkbdlkjsdhf lkjhq erlw h"}
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
            , singlecheck: false
            , nowrap: false
            , searchable: false
            , overflow: "auto"
            , hiddenKeys: []
            , editablekeys: ["name"]
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
        } else if ( param != "overflow" ) {
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
    font-size: 12px;
}
.divParam {
    float: right;
    clear: right;
    width: 38vw;
    padding-top: 5px;
    font-family: arial;
    font-size: 12px;
}
select {
    display:block;
    font-family: arial;
    font-size: 12px;
}
label {
    font-weight: normal;
    padding: 0 0 5px 0;
    margin: 0;
}
input {
    display:block;
    font-family: arial;
    font-size: 12px;
}
</style>