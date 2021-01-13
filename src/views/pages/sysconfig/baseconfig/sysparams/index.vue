<template>
    <div class="app-container">
        <el-form :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm">
            <el-row>
                <el-col :span="20">
                    <el-row :gutter="10">
                        <el-col :span="4">
                            <el-form-item prop="name">
                                <el-input placeholder="关键字" v-model.trim="initParams.name" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop="name">
                                <el-select v-model="initParams.name" clearable placeholder="等级">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-button type="primary" @click="handleSearch()">提交</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4">
                    <el-form-item class="align-right">
                        <el-button type="primary" @click="handleAddEdit">添加</el-button>
                        <el-button type="primary" plain @click="handleRemove">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table-pagination
            :url="$baseURL+'/getTable'"
            type="local"
            :data="tableData"
            :params="initParams"
            :columns="tableColumns" ref="tableRef">  
                <template v-slot:preview-handle="scope">
                    <el-button type="text" @click="handleAddEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
                </template>
        </el-table-pagination>
        <add v-if="handleInfo.visible" :dialogInfo="handleInfo" @back="handleFlush"></add>
    </div>
</template>
<script>
import add from './component/add'
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
                {'a':'admin',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2'}
            ],
            tableColumns:[
                { prop: 'a', label: '参数编码',minWidth:100},
                { prop: 'b', label: '参数名称',minWidth:100},
                { prop: 'c', label: '参数等级',minWidth:100},
                { prop: 'd', label: '数据类型',minWidth:100},
                { prop: 'e', label: '参数值',minWidth:100},
                { prop: 'f', label: '设定范围',minWidth:100},
                { prop: 'g', label: '扩展参数1',minWidth:100},
                { prop: 'h', label: '扩展参数2',minWidth:100},
                { prop: 'h', label: '备注',slotName:'preview-h',minWidth:100},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
        }
    },
    methods:{
        
    }
    
}
</script>
<style lang="less" scoped>

</style>