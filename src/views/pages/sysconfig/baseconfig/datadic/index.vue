<template>
    <div class="app-container flex">
        <div class="container-left">
            <div class="container-left-top">
                <el-input placeholder="关键字" v-model.trim="params.name" @keydown.enter.native="handleSearch" clearable class="container-left-input">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
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
                    <el-col :span="20">
                        <el-row :gutter="10">
                            <el-col :span="5">
                                <el-form-item prop="name">
                                    <el-input placeholder="关键字" v-model.trim="initParams.name" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item prop="name">
                                    <el-select v-model="initParams.name" clearable placeholder="等级">
                                        <el-option
                                        key="1"
                                        label="等级1"
                                        value="1">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item>
                                    <el-button type="primary" @click="searchT">提交</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item>
                                    <el-button type="primary" @click="test">跳转</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item class="align-right">
                            <el-button type="primary" @click="handleAE">添加</el-button>
                            <el-button type="primary" plain @click="handleR">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table-pagination
                v-scrollBar="'table'"
                :url="baseURL+'/testpostTable'"
                :size="themeSize"
                :data="tableData"
                list-field="data" 
                total-field="total"
                method='get' 
                @sort-change="sortChange"
                :params="initParams"
                :columns="tableColumns" ref="tableR">   
                <el-table-column slot="prepend" type="selection"></el-table-column>
                <template v-slot:preview-handle="scope">
                    <el-button type="text" @click="handleAE(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleR(scope.row)">删除</el-button>
                </template>
            </el-table-pagination>
        </div>
        <add v-if="handleInfo.visible" :dialogInfo="handleInfo"></add>
        <add-more v-if="addMoreInfo.visible" :dialogInfo="addMoreInfo"></add-more>
    </div>
</template>

<script>
import add from './component/add'
import addMore from './component/addMore'
import TableMixin from '@/mixins/TableMixin'
let tableMixin=new TableMixin({deleteApi:'/delete/table'}) 
export default {
    components: { add, addMore },
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
                { prop: 'd', label: '数据类型',minWidth:10},
                { prop: 'e', label: '备注',showOverflowTooltip:true,minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
            initParams:{
                name:''
            },
            tableData:[
                {'a':'admin',b:'管理员','c':'345345',d:'玩儿',e:'123@qq.com',f:'1',g:'1',h:'WEB'},
                {'a':'admin1',b:'管理员','c':'345345',d:'手动阀',e:'123@qq.com',f:'1',g:'2',h:'WEB23'}
            ],
            tableColumns:[
                { prop: 'a', label: '参数编码',sortable:'custom',minWidth:100},
                { prop: 'b', label: '参数名称',minWidth:100},
                { prop: 'c', label: '参数等级',minWidth:100},
                { prop: 'd', label: '数据类型',minWidth:100},
                { prop: 'e', label: '参数值',minWidth:100},
                { prop: 'f', label: '设定范围',minWidth:100},
                { prop: 'g', label: '扩展参数1',minWidth:100},
                { prop: 'h', label: '扩展参数2',minWidth:100},
                { prop: 'h', label: '备注',minWidth:100},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
            rules:{
                name:[
                    {  required: true, message: '请输入', trigger: ['blur', 'change'] }
                ]
            },
            addMoreInfo:{
                visible:false,
                row:null
            }
        }
    },
    methods:{
        test:function(){
            this.$router.push({name:'SysconfigBaseconfigDatadicAdd',query:{params:JSON.stringify({"id":"23234"})}});
        },
        handleSearch:function(){
            console.log('enter 请求')
        },
        searchT:function(){
            this.$refs['ValidateF'].validate((valid) => {
                if(valid){ //验证通过
                    this.$refs['tableR'].searchHandler();
                }
            })
        },
        handleAE:function(){
            this.addMoreInfo.visible=true;
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