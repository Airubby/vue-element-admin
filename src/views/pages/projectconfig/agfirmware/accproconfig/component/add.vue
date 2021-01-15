<template>
    <el-dialog title='新增/编辑' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:460px;" class="scrollbar">
            <div class="app-container">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='接入端编码' prop="name">
                                <el-input v-model="initParams.a" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='型号名称' prop="name">
                                <el-input v-model="initParams.b" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='接入端名称' prop="name">
                                <el-input v-model="initParams.b" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='协议编码' prop="name">
                                <el-input v-model="initParams.b" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='协议名称' prop="name">
                                <el-input v-model="initParams.b" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='位置信息' prop="name">
                                <el-input v-model="initParams.b" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='是否启用' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option
                                    key="1"
                                    label="等级1"
                                    value="1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label='固件配置参数' prop="name">
                                <div class="table-btn">
                                    <el-button type="primary" @click="handleAdd">添加</el-button>
                                    <el-button type="primary" plain @click="handleRemove">删除</el-button>
                                </div>
                                <el-table-pagination
                                    :size="themeSize"
                                    type="local"
                                    :data="tableData"
                                    :columns="tableColumns" ref="tableRef">  
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
                                            <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
                                        </template>
                                </el-table-pagination>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure"></dialog-btn>
    </el-dialog>
</template>

<script>
import TableMixin from '@/mixins/TableMixin'
export default {
    mixins:[new TableMixin()],
    created() {
        Object.assign(this.initParams,this.dialogInfo.data);
    },
    mounted() {
        
    },
    data(){
        return{
            add:true,
            options:[],
            initParams:{
                name:'',
                a:'',
                b:''
            },
            rules: {
                
            },
            tableData:[
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'1',h:'1'},
                {'a':'admin',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'2',g:'2',h:'2'}
            ],
            tableColumns:[
                { prop: 'a', label: '编码',slotName:'preview-a',minWidth:100},
                { prop: 'b', label: '名称',slotName:'preview-b',minWidth:100},
                { prop: 'c', label: '值',slotName:'preview-c',minWidth:100},
                { prop: 'd', label: '备注',slotName:'preview-d',minWidth:100},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:60},
            ],
        }
    },
	methods: {
        handleAdd:function(){
            let col={
                a:'',
                b:'',
                c:'',
                d:''
            };
            this.tableData.unshift(col);
        },
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit('backInfo')
                }
            })
        },
	},
    props:['dialogInfo']
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .table-btn{
        text-align: right;
        margin-bottom: 10px;
    }
}
</style>