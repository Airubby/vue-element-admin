<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="7">
                <div>
                    <el-input placeholder="关键字" v-model.trim="initParams.name" clearable>
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-checkbox v-model="initParams.check">3状态切换</el-checkbox>
                </div>
                <el-table-pagination
                    v-scrollBar="'table'"
                    :url="baseURL+'/getTable'"
                    :size="themeSize"
                    type="local"
                    :data="tableData"
                    :params="initParams"
                    :columns="tableColumns" ref="tableRef">  
                </el-table-pagination>
            </el-col>
            <el-col :span="17">
                <el-form>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item class="align-right">
                                <el-button type="primary" @click="handleAddEdit">新增</el-button>
                                <el-button type="primary" plain @click="handleRemove">删除</el-button>
                                <el-button type="primary" plain @click="handleRemove">Excel导入</el-button>
                                <el-button type="primary" plain @click="handleRemove">Excel导出</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table-pagination
                    v-scrollBar="'table'"
                    :url="baseURL+'/getTable'"
                    :size="themeSize"
                    type="local"
                    :data="tableData1"
                    :columns="tableColumns1" ref="tableRef">  
                        <template v-slot:preview-handle="scope">
                            <el-button type="text" @click="handleAddEdit(scope.row)">编辑</el-button>
                            <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
                        </template>
                </el-table-pagination>
                <el-form>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item class="align-right">
                                <el-button type="primary" @click="handleAddEdit(null,'handleInfoMore')">新增</el-button>
                                <el-button type="primary" plain @click="handleRemove(null,'tableRefMore')">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table-pagination
                    v-scrollBar="'table'"
                    :url="baseURL+'/getTable'"
                    :size="themeSize"
                    type="local"
                    :data="tableData2"
                    :columns="tableColumns2" ref="tableRefMore">  
                        <el-table-column slot="prepend" type="selection"></el-table-column>
                        <template v-slot:preview-handle="scope">
                            <el-button type="text" @click="handleAddEdit(scope.row,'handleInfoMore')">编辑</el-button>
                            <el-button type="text" @click="handleRemove(scope.row,'tableRefMore')">删除</el-button>
                        </template>
                </el-table-pagination>
            </el-col>
        </el-row>
        <add v-if="handleInfo.visible" :dialogInfo="handleInfo" @back="handleFlush"></add>
        <addmore v-if="handleInfoMore.visible" :dialogInfo="handleInfoMore" @back="handleFlushMore"></addmore>
    </div>
</template>
<script>
import add from './eventruleAdd'
import addmore from './eventruleAddmore'
import TableMixin from '@/mixins/TableMixin'
let tableMixin=new TableMixin({deleteApi:'/delete/table'}) 
export default {
    components: { add,addmore },
    mixins:[tableMixin],
    created() {
    },
    mounted(){

    },
    data() {
        return {
            options:[],
            
            initParams:{
                name:'',
                check:false
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
                { prop: 'a', label: '编码',minWidth:100},
                { prop: 'b', label: '名称',minWidth:100},
                { prop: 'c', label: '状态',minWidth:100},
            ],
            tableData1:[
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
            ],
            tableColumns1:[
                { prop: 'a', label: '场景名称',minWidth:100},
                { prop: 'b', label: '指标编码',minWidth:100},
                { prop: 'c', label: '事件编码',minWidth:100},
                { prop: 'c', label: '事件名称',minWidth:100},
                { prop: 'c', label: '告警死区',minWidth:100},
                { prop: 'c', label: '是否启用',minWidth:100},
                { prop: 'handle', label: '操作' ,fixed:'right',slotName:'preview-handle',width:90},
            ],
            tableData2:[
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
            ],
            tableColumns2:[
                { prop: 'a', label: '规则内容',minWidth:100},
                { prop: 'b', label: '是否fel表达式',minWidth:100},
                { prop: 'c', label: '动作',minWidth:100},
                { prop: 'c', label: '方向',minWidth:100},
                { prop: 'c', label: '序号',minWidth:100},
                { prop: 'c', label: '是否启用',minWidth:100},
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