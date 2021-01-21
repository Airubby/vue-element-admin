<template>
    <el-dialog title='新增/编辑' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:420px;" class="scrollbar">
            <div class="app-container">
                <el-form :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='型号id' prop="name">
                                <el-input v-model="initParams.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='型号编码' prop="name">
                                <el-input v-model="initParams.b" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='型号名称' prop="name">
                                <el-input v-model="initParams.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='指标编码' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='指标名称' prop="name">
                                <el-input v-model="initParams.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='标准事件编码' prop="name">
                                <el-input v-model="initParams.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='标准事件名称' prop="name">
                                <el-input v-model="initParams.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='告警死区' prop="name">
                                <el-input v-model="initParams.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='是否启用' prop="name">
                                <el-select v-model="initParams.name" clearable disabled>
                                    <el-option
                                    key="1"
                                    label="等级1"
                                    value="1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            
                        </el-col>
                    </el-row>
                </el-form>
                <el-form ref="ValidateForm" :model="params" :rules="rules" label-position="top">
                    <el-radio-group v-model="params.type" class="mb">
                        <el-radio label="1" border>原生条件</el-radio>
                        <el-radio label="2" border>表达式条件</el-radio>
                    </el-radio-group>
                    <el-row :gutter="30" v-if="params.type=='1'">
                        <el-col :span="8">
                            <el-form-item prop="name">
                                <el-select v-model="params.name" clearable>
                                    <el-option key="1" label="旧值" value="1"></el-option>
                                    <el-option key="2" label="新值" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="name">
                                <el-select v-model="params.name" clearable>
                                    <el-option key="1" label=">" value="1"></el-option>
                                    <el-option key="2" label="==" value="2"></el-option>
                                    <el-option key="2" label="!=" value="2"></el-option>
                                    <el-option key="2" label="<" value="2"></el-option>
                                    <el-option key="2" label=">=" value="2"></el-option>
                                    <el-option key="2" label="<=" value="2"></el-option>
                                    <el-option key="2" label="in" value="2"></el-option>
                                    <el-option key="2" label="notin" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="name">
                                <el-select v-model="params.name" clearable>
                                    <el-option key="1" label="输入值" value="1"></el-option>
                                    <el-option key="1" label="旧值" value="1"></el-option>
                                    <el-option key="2" label="新值" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item prop="more">
                                <el-select v-model="params.more" clearable>
                                    <el-option key="1" label="&&" value="1"></el-option>
                                    <el-option key="1" label="||" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <div v-if="params.more">
                            <el-col :span="8">
                                <el-form-item prop="name">
                                    <el-select v-model="params.name" clearable>
                                        <el-option key="1" label="旧值" value="1"></el-option>
                                        <el-option key="2" label="新值" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="name">
                                    <el-select v-model="params.name" clearable>
                                        <el-option key="1" label=">" value="1"></el-option>
                                        <el-option key="2" label="==" value="2"></el-option>
                                        <el-option key="2" label="!=" value="2"></el-option>
                                        <el-option key="2" label="<" value="2"></el-option>
                                        <el-option key="2" label=">=" value="2"></el-option>
                                        <el-option key="2" label="<=" value="2"></el-option>
                                        <el-option key="2" label="in" value="2"></el-option>
                                        <el-option key="2" label="notin" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="name">
                                    <el-select v-model="params.name" clearable>
                                        <el-option key="1" label="输入值" value="1"></el-option>
                                        <el-option key="1" label="旧值" value="1"></el-option>
                                        <el-option key="2" label="新值" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row :gutter="30" v-if="params.type=='2'">
                        <el-col :span="24">
                            <el-form-item prop="name">
                                <el-input v-model="params.name"></el-input>
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
            type:'',
            initParams:{
                name:'',
                a:'',
                b:'',
                type:''
            },
            params:{
                name:'',
                type:'1',
                more:''
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
<style lang="less" scoped>
.module-theme(...){
    .mb{
        margin-bottom: 10px;
    }
}
</style>
