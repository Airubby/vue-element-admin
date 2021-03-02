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
            v-scrollBar="'table'"
            :url="baseURL+'/getTable'"
            :size="themeSize"
            type="local"
            :data="tableData"
            @selection-change="selectionChange"
            :params="initParams"
            :columns="tableColumns" ref="tableRef">  
                <el-table-column slot="prepend" type="selection" align="center" :selectable="checkSelectable"></el-table-column>
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
            tableForms: {
                inline: true,
                size:'small',
                submitBtnText: '搜索',
                initParams:{queryKey:''},
                forms: [
                    //propValue监听做联动用的，选择了项目，根据选择的项目拉设备
                    { prop: 'queryKey1', placeholder:'项目',itemType: 'select',options:[],valueKey:'id',labelKey:'name',propValue:'' },
                    {prop:'queryKey2', placeholder:'设备',itemType: 'select',options:[],valueKey:'id',labelKey:'name',propValue:'' },
                ],
                rules:{

                }
            },
            tableData:[
                {'id':1,'a':'admin','name':'管理员管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1',check:true},
                {'id':2,'a':'admin','name':'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2',check:true},
                {'id':3,'a':'admin','name':'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2',check:false}
            ],
            tableColumns:[
                { prop: 'a', label: '参数编码',minWidth:'100px'},
                { prop: 'name', label: '参数名称',minWidth:'100px'},
                { prop: 'c', label: '参数等级',minWidth:'100px'},
                { prop: 'd', label: '数据类型',minWidth:'100px'},
                { prop: 'e', label: '参数值',minWidth:'100px'},
                { prop: 'f', label: '设定范围',minWidth:'100px'},
                { prop: 'g', label: '扩展参数1',minWidth:'100px'},
                { prop: 'h', label: '备注',slotName:'preview-h',minWidth:'100px'},
                { prop: 'handle', label: '操作',fixed:'right',slotName:'preview-handle',width:90},
            ],
            backSelect:{}
        }
    },
    methods:{
        checkSelectable:function(row,index){
            console.log(row,index)
            return row.check
        },
        selectionChange:function(selection){
            console.log(selection)
            if(selection.length>0){
                if(this.backSelect&&JSON.stringify(this.backSelect)!='{}'){
                    for(let i=0;i<selection.length;i++){
                        if(this.backSelect.id!=selection[i].id){
                            this.$refs.tableRef.clearSelection();
                            this.$refs.tableRef.setRowSelection(selection[i],true)
                            this.backSelect=selection[i];
                        }
                    }
                }else{
                    this.backSelect=selection[0];
                }
                
            }else{
                this.backSelect={};
            }
        }
    }
    
}
</script>
<style lang="less" scoped>

</style>