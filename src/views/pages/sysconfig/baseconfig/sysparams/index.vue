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
                                <el-button type="primary" @click="submitForm()">提交</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4">
                    <el-form-item class="align-right">
                        <el-button type="primary" @click="handleAdd">新建</el-button>
                        <el-button type="primary" plain>同步缓存</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table-pagination
            v-scrollBar="'table'"
            :url="'/getTable'"
            list-field="data" 
            total-field="total"
            size="mini"
            type="local"
            :data="tableData"
            method='get' 
            :params="initParams"
            :columns="tableColumns" ref="tableRef">   
            <template v-slot:preview-handle="scope">
                <el-button type="text" @click="handleAdd(scope.row)">编辑</el-button>
                <el-button type="text">删除</el-button>
            </template>
        </el-table-pagination>
        <add v-if="addInfo.visible" :dialogInfo="addInfo" @back="flushTable"></add>
    </div>
</template>
<script>
import add from './component/add'
export default {
    components: { add },
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
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'WEB'},
                {'a':'admin',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'WEB'}
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
            addInfo:{
                visible:false,
                data:{}
            }
        }
    },
    methods:{
        handleAdd:function(info){
            if(info){
                this.addInfo.data=info
            }else{
                this.addInfo.data={};
            }
            this.addInfo.visible=true;
        },
        flushTable:function(){

        }
    }
    
}
</script>
<style lang="less" scoped>

</style>