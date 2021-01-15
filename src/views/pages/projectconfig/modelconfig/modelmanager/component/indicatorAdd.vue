<template>
    <el-dialog title='类型指标' :visible.sync="dialogInfo.visible" width="1100px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:460px;" class="scrollbar">
            <div class="app-container">
                <div class="left-table">
                    <el-form :model="leftParams" @submit.native.prevent ref="ValidateForm">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <el-form-item prop="name">
                                    <el-input placeholder="编码" v-model.trim="leftParams.name" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="name">
                                    <el-input placeholder="名称" v-model.trim="leftParams.name" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="name">
                                    <el-select v-model="leftParams.name" placeholder="N遥类型">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="name">
                                    <el-select v-model="leftParams.name" placeholder="指标类型">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-table-pagination
                        v-scrollBar="'table'"
                        :url="baseURL+'/getTable'"
                        :size="themeSize"
                        type="local"
                        pagination-layout="total, prev, pager, next"
                        :data="leftTable"
                        :params="leftParams"
                        :columns="tableColumns" ref="tableL">  
                        <el-table-column slot="prepend" type="selection" :selectable="selectableFn"></el-table-column>
                    </el-table-pagination>
                </div>
                <div class="btn-table">
                    <p><el-button type="primary" plain @click="join">加入<i class="el-icon-arrow-right el-icon--right"></i></el-button></p>
                    <p><el-button type="primary" plain @click="remove" icon="el-icon-arrow-left">移出</el-button></p>
                </div>
                <div class="right-table">
                    <el-form :model="leftParams" @submit.native.prevent ref="ValidateForm">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <el-form-item prop="name">
                                    <el-input placeholder="编码" v-model.trim="leftParams.name" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="name">
                                    <el-input placeholder="名称" v-model.trim="leftParams.name" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="name">
                                    <el-select v-model="leftParams.name" placeholder="N遥类型">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="name">
                                    <el-select v-model="leftParams.name" placeholder="指标类型">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-table-pagination
                        v-scrollBar="'table'"
                        :url="baseURL+'/getTable'"
                        :size="themeSize"
                        pagination-layout="total, prev, pager, next"
                        type="local"
                        :data="rightTable"
                        :params="rightParams"
                        :columns="tableColumns" ref="tableR">  
                        <el-table-column slot="prepend" type="selection"></el-table-column>
                    </el-table-pagination>
                </div>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
import TableMixin from '@/mixins/TableMixin'
export default {
    mixins:[new TableMixin()],
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            options:[],
            leftParams:{
                name:''
            },
            rightParams:{
                name:''
            },
            leftTable:[
                {id:'1','a':'admin1',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'1'},
                {id:'2','a':'admin2',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2'},
                {id:'3','a':'admin3',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2'},
                {id:'4','a':'admin4',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2'},
                {id:'5','a':'admin5',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2'},
                {id:'6','a':'admin6',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2'},
                {id:'7','a':'admin7',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'2'},
            ],
            rightTable:[],
            tableColumns:[
                { prop: 'a', label: '编码',minWidth:100},
                { prop: 'b', label: '名称',minWidth:100},
                { prop: 'c', label: 'N遥类型',minWidth:100},
                { prop: 'd', label: '数据特性',minWidth:100},
                { prop: 'e', label: '数据值类型',minWidth:100},
                { prop: 'f', label: '清洗规则',minWidth:100},
                { prop: 'g', label: '是否设备告警点',minWidth:120},
                { prop: 'h', label: '指标类型',minWidth:100},
                { prop: 'i', label: '指标分组码',minWidth:100},
                { prop: 'i', label: '单位',minWidth:100},
            ],
        }
    },
	methods: {
        join:function(){
            let select=this.$refs.tableL.getSelect();
            if(select.length>0){
                this.rightTable=this.rightTable.concat(select);
                this.$refs.tableL.clearSelection();
            }else{
                this.$message.warning('勾选需要加入的项');
            }
        },
        remove:function(){
            let select=this.$refs.tableR.getSelect();
            if(select.length>0){
                for(let i=0;i<this.rightTable.length;i++){
                    for(let j=0;j<select.length;j++){
                        if(this.rightTable[i].id==select[j].id){
                            this.rightTable.splice(i,1);
                            i--;
                            break;
                        }
                    }
                }
            }else{
                this.$message.warning('勾选需要移出的项');
            }
        },
        selectableFn:function(row){
            return this.rightTable.indexOf(row)==-1;
        },
        //保存的操作
        dialogSure:function(){
            this.$emit('backInfo');
            this.dialogInfo.visible=false;
        },
    },
    watch:{
        leftParams:{
            handler:function(){
                this.$refs['tableL'].searchHandler();
            },
            deep: true
        },
        rightParams:{
            handler:function(){
                this.$refs['tableR'].searchHandler();
            },
            deep: true
        },
    },
    props:['dialogInfo']
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .app-container{
        display: flex;
        justify-content: space-between;
        .left-table,.right-table{
            width: calc(50% - 60px);
        }
        .btn-table{
            padding-top: 80px;
            p{
                margin-bottom: 20px;
            }
        }
    }
}
</style>