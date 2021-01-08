<template>
    <div class="app-container flex">
        <div class="container-left">
            <el-input placeholder="关键字" v-model.trim="params.name" clearable>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <div class="container-left-btn">
                <el-button type="primary" @click="add">添加</el-button>
                <el-button type="primary" plain>删除</el-button>
            </div>
            <el-table-pagination
                :url="'/getTable'"
                list-field="data" 
                size="mini"
                total-field="total"
                type="local"
                :data="data"
                method='get' 
                :params="params"
                :columns="columns" ref="table">   
            </el-table-pagination>
        </div>
        <div class="container-right">
            <el-form :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm">
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
                                    <el-button type="primary" @click="submitForm()">提交</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item class="align-right">
                            <el-button type="primary" @click="handleAdd">添加</el-button>
                            <el-button type="primary" plain>批量删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table-pagination
                :url="'/getTable'"
                list-field="data" 
                size="mini"
                total-field="total"
                type="local"
                :data="tableData"
                method='get' 
                :params="initParams"
                :columns="tableColumns" ref="tableRef">   
                <template v-slot:preview-handle="scope">
                    <p>
                        <el-button type="text" @click="handleAdd(scope.row)">编辑</el-button>
                        <el-button type="text">删除</el-button>
                    </p>
                </template>
            </el-table-pagination>
        </div>
    </div>
</template>

<script>
export default {
    components: {  },
    created() {

    },
    mounted(){

    },
    data() {
        return {
            params:{
                name:''
            },
            data:[],
            columns:[
                { prop: 'a', label: '编码',minWidth:10},
                { prop: 'b', label: '名称',minWidth:10},
                { prop: 'd', label: '数据类型',minWidth:10},
                { prop: 'e', label: '备注',minWidth:10},
            ],
            initParams:{

            },
            tableData:[
                {'a':'admin',b:'管理员','c':'2020-3-10~2021-2-22',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'WEB'},
                {'a':'admin',b:'管理员','c':'2020-3-10~2021-2-22',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'WEB'}
            ],
            tableColumns:[
                { prop: 'a', label: '参数编码',minWidth:10},
                { prop: 'b', label: '参数名称',minWidth:10},
                { prop: 'c', label: '参数等级',minWidth:10},
                { prop: 'd', label: '数据类型',minWidth:10},
                { prop: 'e', label: '参数值',minWidth:10},
                { prop: 'f', label: '设定范围',minWidth:10},
                { prop: 'g', label: '扩展参数1',minWidth:10},
                { prop: 'h', label: '扩展参数2',minWidth:10},
                { prop: 'h', label: '备注',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
        }
    },
    methods:{

    }
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .container-left{
        width: 35%;
    }
    .container-right{
        padding-left: 20px;
        width: 65%;
    }
}
</style>