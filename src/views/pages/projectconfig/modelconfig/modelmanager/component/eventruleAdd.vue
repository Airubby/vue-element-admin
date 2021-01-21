<template>
    <el-dialog title='新增/编辑' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:420px;" class="scrollbar">
            <div class="app-container">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='场景' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option
                                    key="1"
                                    label="等级1"
                                    value="1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='指标编码' prop="name">
                                <el-input v-model="initParams.b"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='指标名称' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='标准事件' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option
                                    key="1"
                                    label="等级1"
                                    value="1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='告警死区' prop="name">
                                <el-input v-model="initParams.name"></el-input>
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
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        Object.assign(this.initParams,this.dialogInfo.data);
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                name:'',
                a:'',
                b:''
            },
            rules: {
                
            },
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
