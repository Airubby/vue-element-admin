<template>
    <div class="app-container">

        <DynamicComponent :pathUrl="`/template/air/AirSys.js`" :templateData="initParams" templateUrl="/template/air"></DynamicComponent>
    
        <div @click="dialog" v-for="item in 10" :key="item">测试1</div>
    </div>
</template>

<script>
// import DialogFullScreen from '@/components/DialogFullScreen/index'
import DynamicComponent from '@/components/DynamicComponent/index'
export default {
    components: { DynamicComponent },
    created() {

    },
    mounted(){
        this.$api.get('/getMenuData').then(res=>{
            console.log(res)
        })
        // document.onkeydown=function(ev){
        //     var event=ev ||event
        //     if(event.keyCode==13){
        //         alert('按了enter键')
        //     }
        // }
    },
    data() {
        return {
            initParams:{

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
