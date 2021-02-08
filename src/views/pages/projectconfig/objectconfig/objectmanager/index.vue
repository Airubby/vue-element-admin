<template>
    <lr-layout>
        <template slot="left">
            <div class="container-left-top">
                <el-input placeholder="关键字" v-model.trim="filterTree" clearable>
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <div class="container-left-btn">
                <el-button type="primary" @click="handleAdd">添加</el-button>
                <el-button type="primary" plain @click="handleRemove">删除</el-button>
                <el-button type="primary" plain @click="setAllExpand(true)">全部展开</el-button>
                <el-button type="primary" plain @click="setAllExpand(false)">全部闭合</el-button>
                <el-radio-group v-model="type" class="radio-btn">
                    <el-radio-button label="1">类型型号</el-radio-button>
                    <el-radio-button label="2">位置</el-radio-button>
                    <el-radio-button label="3">连接</el-radio-button>
                </el-radio-group>
            </div>
            <el-scrollbar class="app-scrollbar" >
                <el-tree
                    class="pd15"
                    :data="treeData"
                    :props="treeProps"
                    default-expand-all
                    show-checkbox
                    node-key="id"
                    highlight-current
                    :filter-node-method="filterNode"
                    ref="tree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span :class="{'active':data.type=='T'}">{{ data.label }}</span>
                    </span>
                </el-tree>
            </el-scrollbar>
        </template>
        <template slot="right">
            <div v-show="!show">
                <el-form :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm">
                    <el-row>
                        <el-col :span="16">
                            <el-row :gutter="10">
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <tree-select :treeData="treeData" @change="changeTree" v-model="initParams.test"></tree-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <search-select v-model="initParams.test" :remote="false" :data="options">

                                        </search-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <el-input placeholder="设备编码" v-model.trim="initParams.name" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <el-input placeholder="设备名称" v-model.trim="initParams.name" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <el-input placeholder="采集使能" v-model.trim="initParams.name" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <el-input placeholder="告警使能" v-model.trim="initParams.name" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <el-input placeholder="日志使能" v-model.trim="initParams.name" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <el-select v-model="initParams.name" clearable placeholder="是否iot对象">
                                            <el-option key="1" label="1" value="1"> </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item prop="name">
                                        <el-select v-model="initParams.name" clearable placeholder="是否采集对象">
                                            <el-option key="1" label="1" value="1"> </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item>
                                        <el-button type="primary" @click="handleSearch">提交</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="align-right">
                                <el-button type="primary" @click="handleRemove">删除</el-button>
                                <el-button type="primary" plain @click="handleRemove">移动到</el-button>
                                <el-button type="primary" plain @click="handleRemove">挂载到</el-button>
                                <el-button type="primary" plain @click="handleRemove">Excel导入</el-button>
                                <el-button type="primary" plain @click="handleRemove">Excel导出</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table-pagination
                    :url="baseURL+'/getTable'"
                    :size="themeSize"
                    type="local"
                    :data="tableData"
                    :params="initParams"
                    :columns="tableColumns" ref="tableRef">  
                        <template v-slot:preview-handle="scope">
                            <el-button type="text" @click="handleAddEdit(scope.row)">编辑</el-button>
                            <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
                        </template>
                </el-table-pagination>
            </div>
            <el-tabs v-model="activeName" class="tab-content" v-show="show" @tab-click="handleClick">
                <el-tab-pane label='基本信息' name="first" class="content">
                    <el-scrollbar class="scrollbar">
                        <base-info v-if="activeName=='first'"></base-info>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label='采集事件相关' name="second" class="content" v-if="showNext">
                    <el-scrollbar class="scrollbar">
                        <collect-event v-if="activeName=='second'"></collect-event>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label='采集事件相关' name="second" class="content" v-if="editShow">
                    <el-scrollbar class="scrollbar">
                        <collect-event v-if="activeName=='second'"></collect-event>
                    </el-scrollbar>
                </el-tab-pane>
                <div class="tabs-btn">
                    <el-button type="text" @click="nextSave">{{activeName=='first'?'下一步':'保存'}}</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="cancel">取消</el-button>
                </div>
            </el-tabs>
        </template>
    </lr-layout>
</template>

<script>
import collectEvent from './component/collectEvent'
import baseInfo from './component/baseInfo'
import TreeMixin from '@/mixins/TreeMixin'
import TableMixin from '@/mixins/TableMixin'
let tableMixin=new TableMixin({deleteApi:'/delete/table'}) 
export default {
    components: { collectEvent,baseInfo },
    mixins:[TreeMixin,tableMixin],
    created() {
        this.treeData=this.disableHandle(this.treeData,{type:'O'})
    },
    mounted(){
        
    },
    data() {
        return {
            treeData: [{
                id: 1,
                label: '一级 1',
                type:'T',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    type:'M',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1',
                    type:'O'
                    }, {
                        id: 10,
                        label: '三级 1-1-2',
                        type:'O'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                type:'T',
                children: [{
                    id: 5,
                    label: '二级 2-1',
                    type:'M',
                }, {
                    id: 6,
                    label: '二级 2-2',
                    type:'O'
                }]
                }, {
                id: 3,
                label: '一级 3',
                type:'T',
                children: [{
                    id: 7,
                    label: '二级 3-1',
                    type:'M',
                }, {
                    id: 8,
                    label: '二级 3-2',
                    type:'O'
                }]
            }],
            type:'1',
            initParams:{
                name:'',
                test:''
            },
            rules:{},
            tableData:[
                {'a':'admin',b:'管理员','c':'tetert',d:'15225252525',e:'123@qq.com',f:'1',g:'1',h:'1'},
                {'a':'admin',b:'管理员','c':'rtert',d:'15225252525',e:'123@qq.com',f:'2',g:'2',h:'2'}
            ],
            tableColumns:[
                { prop: 'a', label: '对象编码',minWidth:100},
                { prop: 'b', label: '对象名称',minWidth:100},
                { prop: 'c', label: '型号名称',minWidth:100},
                { prop: 'd', label: '位置名称',minWidth:100},
                { prop: 'd', label: '接入端名称',minWidth:100},
                { prop: 'd', label: '解析协议',minWidth:100},
                { prop: 'd', label: '采集周期',minWidth:100},
                { prop: 'd', label: '是否存历史',minWidth:100},
                { prop: 'd', label: '告警使能',minWidth:100},
                { prop: 'd', label: '采集使能',minWidth:100},
                { prop: 'handle', label: '操作',fixed:'right',slotName:'preview-handle',width:90},
            ],
            show:false,
            editShow:false,
            showNext:false,
            activeName:'first',
            data: [{
                label: '一级 1',
                children: [{
                label: '二级 1-1',
                children: [{
                    label: '三级 1-1-1'
                }]
                }]
                }, {
                    label: '一级 2',
                    children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                    }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                    }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            value7:'',
            filterText:'',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            options:[
                {id:'1',name:'aaaa'},
                {id:'2',name:'bbbb'},
                {id:'3',name:'cccc'},
                {id:'4',name:'dddd'}
            ]
        }
    },
    methods:{
        handleAdd:function(){
            this.show=true;
        },
        nextSave:function(){
            if(this.activeName=='first'){
                this.showNext=true;
                this.activeName='second'
            }else{
                console.log('保存')
            }
        },
        cancel:function(){
            this.show=false;
        },
        handleClick:function(tab){
            if(tab.name=='first'&&!this.editShow)
                this.showNext=false;
        },
        handleRemove:function(){

        },
        changeTree:function(info){
            console.log(info,'!!!!!!!!!!!!!!!!',this.initParams.test)
        },
        
    },
    watch: {
        'initParams.test':function(val){
            console.log(val,'!!!!!!!!!!!!!!!!!')
        }
    },
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .container-left-top{
        width: 100%;
        margin-bottom: 10px;
    }
    .container-left-btn{
        text-align: right;
        .radio-btn{
            margin-top: 10px;
        }
    }
    .app-scrollbar{
        width: 100%;
        height: calc(100% - 120px);
    }
    .align-right{
        .el-button{
            margin-bottom: 10px;
        }
    }
    .custom-tree-node{
        .active{
            color: @activeColor;
        }
    }
    /deep/ .el-tabs__content{
        overflow: initial;
    }
    .tabs-btn{
        position: absolute;
        top: -50px;
        right: 0;
    }
    .el-select-dropdown__item{
        height:auto;
    }
}
</style>