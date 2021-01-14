<template>
    <div class="app-container flex">
        <div class="container-left">
            <div class="container-left-top">
                <el-input placeholder="关键字" v-model.trim="params.name" clearable class="container-left-input">
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                </el-input>
                <div class="container-left-btn">
                    <el-button type="primary" @click="handleAddEdit">添加</el-button>
                    <el-button type="primary" plain @click="handleRemove">删除</el-button>
                </div>
            </div>
            <el-table-pagination
                v-scrollBar="'table'"
                :url="baseURL+'/getTable'"
                :size="themeSize"
                :params="params"
                type="local"
                :data="data"
                pagination-layout="total, prev, pager, next"
                :columns="columns" ref="table">   
                <el-table-column slot="prepend" type="selection"></el-table-column>
                <template v-slot:preview-handle="scope">
                    <el-button type="text" @click="handleAddEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
                </template>
            </el-table-pagination>
        </div>
        <div class="container-right">
            <el-form :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateF">
                <el-row>
                    <el-col :span="16">
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <el-form-item prop="name">
                                    <el-input placeholder="关键字" v-model.trim="initParams.name" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button type="primary" @click="searchT">提交</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="align-right">
                            <el-button type="primary" @click="handleAE">添加</el-button>
                            <el-button type="primary" plain @click="handleS">保存</el-button>
                            <el-button type="primary" plain @click="handleR">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table-pagination
                v-scrollBar="'table'"
                :url="baseURL+'/testpostTable'"
                :size="themeSize"
                :data="tableD"
                list-field="data" 
                total-field="total"
                method='get' 
                type="local"
                @sort-change="sortChange"
                :params="initParams"
                :columns="tableColumns" ref="tableR">   
                <el-table-column slot="prepend" type="selection"></el-table-column>
                <template v-slot:preview-a="scope">
                    <el-input v-model="scope.row.a"></el-input>
                </template>
                <template v-slot:preview-b="scope">
                    <el-input v-model="scope.row.b"></el-input>
                </template>
                <template v-slot:preview-c="scope">
                    <el-input v-model="scope.row.c"></el-input>
                </template>
                <template v-slot:preview-d="scope">
                    <el-input v-model="scope.row.d"></el-input>
                </template>
                <template v-slot:preview-handle="scope">
                    <el-button type="text" @click="handleR(scope.row)">删除</el-button>
                </template>
            </el-table-pagination>
        </div>
        <add v-if="handleInfo.visible" :dialogInfo="handleInfo"></add>
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
            params:{
                name:''
            },
            data:[
                {'a':'admin',b:'管理员','c':'345345',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'WEB'},
            ],
            columns:[
                { prop: 'a', label: '编码',minWidth:10},
                { prop: 'b', label: '名称',minWidth:10},
                { prop: 'd', label: '类型',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
            initParams:{
                name:''
            },
            tableD:[
                {'a':'admin',b:'管理员','c':'345345',d:'玩儿',e:'123@qq.com',f:'1',g:'1',h:'WEB'},
                {'a':'admin1',b:'管理员','c':'345345',d:'手动阀',e:'123@qq.com',f:'1',g:'2',h:'WEB23'}
            ],
            tableColumns:[
                { prop: 'a', label: '单位1',slotName:'preview-a',minWidth:100},
                { prop: 'b', label: '单位2',slotName:'preview-b',minWidth:100},
                { prop: 'c', label: '单位1-单位2公式',slotName:'preview-c',minWidth:100},
                { prop: 'd', label: '单位2-单位1公式',slotName:'preview-d',minWidth:100},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
            rules:{
                name:[
                    {  required: true, message: '请输入', trigger: ['blur', 'change'] }
                ]
            },
        }
    },
    methods:{
        searchT:function(){
            this.$refs['ValidateF'].validate((valid) => {
                if(valid){ //验证通过
                    this.$refs['tableR'].searchHandler();
                }
            })
        },
        handleAE:function(){
            this.tableD.unshift({'a':'',b:'','c':'',d:''})
        },
        handleR:function(row){
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                // await deleteRole(row.key)
                // this.rolesList.splice($index, 1)
                // this.$message({
                //     type: 'success',
                //     message: 'Delete succed!'
                // })
                this.$api.post('deleteApi',{id:row.id}).then(()=>{
                    this.$refs['tableR'].searchHandler(false);
                })
            })
        }


    }
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .container-left{
        width: 35%;
        .container-left-top{
            width: 100%;
            display: flex;
            margin-bottom: @boxMargin;
            justify-content: space-between;
            .container-left-input{
                width: calc(100% - 140px);
            }
        }
    }
    .container-right{
        padding-left: 20px;
        width: 65%;
    }
}
</style>