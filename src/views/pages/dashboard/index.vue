<template>
    <div class="app-container">
        <DynamicComponent :pathUrl="`/template/test/index.js`" :templateData="initParams" templateUrl="/template/test"></DynamicComponent>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
// import DialogFullScreen from '@/components/DialogFullScreen/index'
import DynamicComponent from '@/components/DynamicComponent/DynamicCompile'
export default {
    components: { DynamicComponent },
    created() {

    },
    mounted(){
        // document.onkeydown=function(ev){
        //     var event=ev ||event
        //     if(event.keyCode==13){
        //         alert('按了enter键')
        //     }
        // }
    },
    data() {
        return {
            currentComponent:null,
            initParams:{
                test:"我是父组件传过去展示的数据"
            },
            dialogInfo:{
                visible:false
            }
        }
    },
    methods:{
        dialog:function(){
            this.dialogInfo.visible=true;
        }
    }
    
}
</script>
