<template>
    <el-dialog title='全屏Dialog' :visible.sync="dialogInfo.visible" class="fullDialog" :fullscreen="true" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar class="scrollbar">
            
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    props:['dialogInfo'],
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
           
        }
    },
	methods: {
        
	},
}
</script>
<style lang="less" scoped>
    .fullDialog{
        /deep/ .el-dialog__body{
            height: calc(100% - 115px);
        }
    }
</style>
