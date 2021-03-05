<template>
    <div class="app-container">
        <div @click="dialog">测试</div>
        <DialogFullScreen v-if="dialogInfo.visible" :dialogInfo="dialogInfo"></DialogFullScreen>
    </div>
</template>

<script>
import DialogFullScreen from '@/components/DialogFullScreen/index'
export default {
    components: { DialogFullScreen },
    created() {

    },
    mounted(){
        
        document.onkeydown=function(ev){
            var event=ev ||event
            if(event.keyCode==13){
                alert('按了enter键')
            }
        }
    },
    data() {
        return {
            dialogInfo:{
                visible:true
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
