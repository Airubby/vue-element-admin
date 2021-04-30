<template>
    <div class="app-container">
        <div @click="dialog" v-for="item in 1" :key="item">测试</div>
    </div>
</template>

<script>
import DialogFullScreen from '@/components/DialogFullScreen/index'
export default {
    components: { DialogFullScreen },
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
