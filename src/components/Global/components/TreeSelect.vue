<template>
    <el-select v-model="selectValue" 
        :disabled="disabled"
        @focus="filterMethod('')"
        @clear="clear"
        filterable 
        :clearable="clearable"
        :filter-method="filterMethod"
        ref="select"
        :placeholder="placeholder">
        <el-option :label="selectLabel" value="" style="display:none"></el-option>
        <el-option :label="selectLabel" :value="selectValue">
            <el-tree ref="treeSelect" :node-key="treeValue"
            :data="treeData" 
            :filter-node-method="filterNode"
            :props="treeProps" 
            @node-click="clickTree">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span :class="{'active':data[treeValue]==selectValue,'disabled':showDisabled(data)}">{{ data[treeProps.label] }}</span>
                </span>
            </el-tree>
        </el-option>
    </el-select>
</template>

<script>
export default {
    name:'TreeSelect',
    components: {  },
    props:{
        value:[String,Boolean,Number,Object],
        clearable:{
            type:Boolean,
            default:true
        },
        disabled:{
            type:Boolean,
            default:true
        },
        treeValue: {
            type: String,
            default: 'id'  //选择的key值
        },
        placeholder:{
            type: String,
            default: '请选择'
        },
        treeProps: {
            type:Object,
            default:()=>{
                return {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        filterObject:{
            type:Object,
            default:()=>{
                return {} //{type:'M'} 展示类型type为M的
            }
        },
        disabledObject:{
            type:Object,
            default:()=>{
                return {}  // { type: 'T'} 禁用type为T的
            }
        },
        treeData:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    created() {
        
    },
    mounted(){
        this.$nextTick(()=>{
            if(Object.prototype.toString.call(this.disabledObject) === '[object Object]'&&JSON.stringify(this.filterObject)!='{}'){
                this.$refs.treeSelect.filter();
            }
        })
    },
    data() {
        return {
            selectValue:'',
            selectLabel:'',
        }
    },
    methods:{
        clear:function(){
            this.selectLabel='';
            this.selectValue='';
            this.$emit('input','');
            this.$emit('change',null);
        },
        getNode:function(key){
            if(key){
                this.$refs.treeSelect.setCurrentKey(key)
                this.$nextTick(()=>{
                    let node=this.$refs.treeSelect.getCurrentNode();
                    if(node){
                        this.selectValue=node[this.treeValue];
                        this.selectLabel=node[this.treeProps.label];
                        this.$emit('change',node);
                    }
                })
            }else{
                this.selectLabel='';
                this.selectValue='';
            }
        },
        showDisabled:function(data){
            if(Object.prototype.toString.call(this.disabledObject) === '[object Object]'&&JSON.stringify(this.disabledObject)!='{}'){
                for(let item in this.disabledObject){
                    if(data[item]==this.disabledObject[item]){
                        return true;
                    }
                }
            }
            return false;
        },
        clickTree:function(data,node){
            if(Object.prototype.toString.call(this.disabledObject) === '[object Object]'&&JSON.stringify(this.disabledObject)!='{}'){
                for(let item in this.disabledObject){
                    if(data[item]==this.disabledObject[item]){
                        return;
                    }
                }
            }
            this.selectLabel=data[this.treeProps.label];
            this.selectValue=data[this.treeValue];
            this.$refs.select.blur();
            this.$emit('input',this.selectValue)
            this.$emit('change',data);
        },
        filterNode(value, data) {
            let flag =true;  //默认展示
            if(Object.prototype.toString.call(this.filterObject) === '[object Object]'&&JSON.stringify(this.filterObject)!='{}'){
                for(let item in this.filterObject){
                    if(data[item]!==this.filterObject[item]){
                        flag=false;
                    }
                }
            }
            if (!value&&flag) return true;
            return flag&&data[this.treeProps.label].indexOf(value) !== -1;
            
        },
        filterMethod:function(val){
            this.$refs.treeSelect.filter(val);
        }
    },
    watch:{
        value:{
            handler:function(val){
                this.getNode(val);
            },
            immediate:true
        }
    }
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item.selected,
    .el-select-dropdown__item:hover {
        background:transparent !important;
        font-weight: normal !important;
    }
    .el-select-dropdown__item{
        height:auto;
    }
    .custom-tree-node{
        .active{
            color: @activeColor;
        }
        .disabled{
            color: @disabledColor;
        }
    }
}
</style>