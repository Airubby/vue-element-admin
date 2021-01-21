<template>
    <div class="app-container">
        <el-form :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm">
            <el-row>
                <el-col :span="24">
                    <el-form-item class="align-right">
                        <el-button type="primary" @click="handleSearch()">添加</el-button>
                        <el-button type="primary" plain @click="handleRemove">删除</el-button>
                        <el-button type="primary" plain @click="handleSearch()">Excel导入</el-button>
                        
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table-pagination
            v-scrollBar="'table'"
            :url="baseURL+'/getTable'"
            :size="themeSize"
            type="local"
            :data="tableData"
            :params="initParams"
            :columns="tableColumns" ref="tableRef">  
                <el-table-column slot="prepend" type="selection"></el-table-column>
                <template v-slot:preview-handle="scope">
                    <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
                </template>
        </el-table-pagination>
        <add v-if="handleInfo.visible" :dialogInfo="handleInfo" @back="handleFlush"></add>
    </div>
</template>
<script>
import add from './baseInfoAdd'
import TableMixin from '@/mixins/TableMixin'
let tableMixin=new TableMixin({deleteApi:'/delete/table'}) 
export default {
    components: { add },
    mixins:[tableMixin],
    created() {
    },
    mounted(){

    },
    data() {
        return {
            options:[],
            initParams:{
                name:''
            },
            rules:{},
            tableData:[
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
            ],
            tableColumns:[
                { prop: 'a', label: '对象编码',minWidth:100},
                { prop: 'b', label: '对象名称',minWidth:100},
                { prop: 'c', label: '工程名称',minWidth:100},
                { prop: 'd', label: '型号名称',minWidth:100},
                { prop: 'e', label: '位置名称',minWidth:100},
                { prop: 'f', label: '接入端名称',minWidth:100},
                { prop: 'handle', label: '操作' ,fixed:'right',slotName:'preview-handle',width:90},
            ],
        }
    },
    methods:{
        
    }
    
}
</script>
<style lang="less" scoped>

</style>