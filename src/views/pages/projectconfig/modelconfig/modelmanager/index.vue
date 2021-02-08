<template>
    <lr-layout>
        <template slot="left">
            <div class="container-left-top">
                <el-input placeholder="关键字" v-model.trim="filterTree" clearable>
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <div class="container-left-btn">
                <el-button type="primary" @click="handleAddEdit">添加</el-button>
                <el-button type="primary" plain @click="handleRemove">删除</el-button>
                <el-button type="primary" plain @click="setAllExpand(true)">全部展开</el-button>
                <el-button type="primary" plain @click="setAllExpand(false)">全部闭合</el-button>
            </div>
            <el-scrollbar class="app-scrollbar">
                <el-tree
                    class="pd15"
                    :data="treeData"
                    :props="treeProps"
                    default-expand-all
                    highlight-current
                    :filter-node-method="filterNode"
                    ref="tree">
                </el-tree>
            </el-scrollbar>
        </template>
        <template slot="right">
            <el-tabs v-model="activeName" class="tab-content">
                <el-tab-pane label='监控指标' name="first" class="content">
                    <el-scrollbar class="scrollbar">
                        <indicator></indicator>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label='静态属性' name="second" class="content">
                    <el-scrollbar class="scrollbar">
                        <attributedef ></attributedef>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label='事件规则' name="third" class="content">
                    <el-scrollbar class="scrollbar">
                        <eventrule v-if="activeName=='third'"></eventrule>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label='采集参数' name="fourth" class="content">
                    <el-scrollbar class="scrollbar">
                        <params v-if="activeName=='fourth'"></params>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </template>
    </lr-layout>
</template>

<script>
import attributedef from './component/attributedef'
import indicator from './component/indicator'
import eventrule from './component/eventrule'
import params from './component/params'
import TreeMixin from '@/mixins/TreeMixin'
export default {
    components: { attributedef,indicator,eventrule,params },
    mixins:[TreeMixin],
    created() {

    },
    mounted(){

    },
    data() {
        return {
            treeData: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            activeName:'third'
        }
    },
    methods:{
        handleAddEdit:function(){

        },
        handleRemove:function(){

        },
        
    },
    watch: {
        
    },
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .container-left{
        width: 320px;
        .container-left-top{
            width: 100%;
            margin-bottom: 10px;
        }
        .container-left-btn{
            text-align: right;
        }
        .app-scrollbar{
            width: 100%;
            height: calc(100% - 75px);
        }
    }
    .container-right{
        padding-left: 20px;
        width: calc(100% - 320px);
    }
}
</style>