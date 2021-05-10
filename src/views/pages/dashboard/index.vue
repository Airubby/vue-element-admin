<template>
    <div class="app-container">
        <div @click="dialog">测试</div>
         <el-tree
            :data="data"
            :check-strictly="true"
            @check-change="checkChange"
            show-checkbox
            ref="tree"
            node-key="id">
        </el-tree>
        <!-- <DialogFullScreen v-if="dialogInfo.visible" :dialogInfo="dialogInfo"></DialogFullScreen> -->
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
                visible:false
            },
            treeCheck:[],
            data : [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                    id: 5,
                    label: '二级 2-1'
                    }, {
                    id: 6,
                    label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                    id: 7,
                    label: '二级 3-1'
                    }, {
                    id: 8,
                    label: '二级 3-2'
                    }]
                }]
        }
    },
    methods:{
        dialog:function(){
            this.dialogInfo.visible=true;
        },
        checkChange:function(data,checked,info){
            console.log(data,checked,info)
            // if (checked) {
            //     this.$refs.tree.setCheckedKeys([data.id]);
            // }else{
            //     this.$refs.tree.setCheckedKeys([]);
            // }
        }
    }
    
}
</script>
