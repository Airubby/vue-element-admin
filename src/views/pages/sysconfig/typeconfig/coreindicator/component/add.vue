<template>
    <el-dialog title='新增/编辑' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:420px;" class="scrollbar">
            <div class="app-container">
                <div class="btn">
                    <el-button type="primary" @click="add">增加一组</el-button>
                </div>
                <el-form ref="ValidateForm" class="validate-form" :model="initParams" label-position="top">
                    <el-row :gutter="30" v-for="(item, index) in initParams.params" :key="index" class="form-row">
                        <el-col :span="12">
                            <el-form-item label='参数编码' :prop="'params.' + index + '.code'" :rules="rules[index].code">
                                <el-input v-model="item.code"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='参数名称' :prop="'params.' + index + '.name'" :rules="rules[index].name">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='数据类型' :prop="'params.' + index + '.type'">
                                <el-select v-model="value" placeholder="请选择">
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
                            <el-form-item label='备注' :prop="'params.' + index + '.content'">
                                <el-input v-model="item.content"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        // Object.assign(this.initParams,this.dialogInfo.data);
    },
    mounted() {
        
    },
    data(){
        return{
            options: [{
                value: '1',
                label: '黄金糕'
                }],
            initParams:{
                params:[
                    {
                        code:'',
                        name:'',
                        type:'',
                        content:''
                    }
                ]
            },

            rules: [
                {
                    code:{required: true, message: '不能为空', trigger: ['blur', 'change']},
                    name:{required: true, message: '不能为空', trigger: ['blur', 'change']}
                }
            ],
        }
    },
	methods: {
        add:function(){
            let params={
                        code:'',
                        name:'',
                        type:'',
                        content:''
                    },
            rule={
                    code:{required: true, message: '不能为空', trigger: ['blur', 'change']},
                    name:{required: true, message: '不能为空', trigger: ['blur', 'change']}
                };
            this.initParams.params.push(params);
            this.rules.push(rule);
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
        .btn{
            position: absolute;
            left: 0;
            z-index: 9;
            width: 100%;
            text-align: right;
            padding: 0 15px;
            top: 0;
            background: @contentBg;
        }
        .validate-form{
            padding-top: 15px;
        }
        .form-row{
            margin-bottom: @boxMargin;
        }
    }
</style>