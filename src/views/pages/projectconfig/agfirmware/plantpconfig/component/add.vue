<template>
    <el-dialog title='新增/编辑' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:360px;" class="scrollbar">
            <div class="app-container">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='编码' prop="name">
                                <el-input v-model="initParams.a" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='名称' prop="name">
                                <el-input v-model="initParams.b" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='传输协议' prop="name">
                                <el-input v-model="initParams.b" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='协议归属' prop="name">
                                <el-input v-model="initParams.b" :disabled="!add"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='协议类型' prop="name">
                                <el-select v-model="initParams.name" clearable :disabled="!add">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='是否启用' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- 以下根据协议类型拉取 -->
                        <div>
                            <el-col :span="24">
                                <el-form-item label='连接参数' prop="name">
                                    <el-table-pagination
                                        :size="themeSize"
                                        type="local"
                                        :data="tableData"
                                        :columns="tableColumns" ref="tableRef">  
                                            <template v-slot:preview-c="scope">
                                                <el-input v-model="scope.row.c"></el-input>
                                            </template>
                                            <template v-slot:preview-d="scope">
                                                <el-input v-model="scope.row.d"></el-input>
                                            </template>
                                    </el-table-pagination>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label='采集参数' prop="name">
                                    <el-table-pagination
                                        :size="themeSize"
                                        type="local"
                                        :data="tableData"
                                        :columns="tableColumns" ref="tableRef">  
                                            <template v-slot:preview-c="scope">
                                                <el-input v-model="scope.row.c"></el-input>
                                            </template>
                                            <template v-slot:preview-d="scope">
                                                <el-input v-model="scope.row.d"></el-input>
                                            </template>
                                    </el-table-pagination>
                                </el-form-item>
                            </el-col>
                        </div>
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
                { prop: 'a', label: '编码',minWidth:100},
                { prop: 'b', label: '名称',minWidth:100},
                { prop: 'c', label: '值',slotName:'preview-c',minWidth:100},
                { prop: 'd', label: '备注',slotName:'preview-d',minWidth:100},
            ],
        }
    },
	methods: {
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
