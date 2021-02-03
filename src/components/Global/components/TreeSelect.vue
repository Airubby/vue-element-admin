<template>
    <el-select v-model="selectValue" ref="select"
        @focus="filterMethod('')"
        filterable 
        @clear="clear"
        :filter-method="filterMethod"
        clearable :placeholder="placeholder">
        <el-option :value="selectValue" :label="label">
            <el-tree ref="treeSelect" :node-key="treeValue"
            :data="treeData" 
            :filter-node-method="filterNode"
            :props="treeProps" 
            @node-click="clickTree">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span :class="{'active':data[treeValue]==selectValue}">{{ data[treeProps.label] }}</span>
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
                return {} //{type:'M'}
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
            if(JSON.stringify(this.filterObject)!='{}'){
                this.$refs.treeSelect.filter();
            }
        })
    },
    computed:{
        selectValue:{
            get:function(){
                //如果给过来的是对象，取对象中的值
                this.getNode(this.value);
                return this.value
            },
            set:function(newValue){
                this.$emit('input',newValue)
            }
        }
    },
    data() {
        return {
            label:''
        }
    },
    methods:{
        clear:function(){
            this.$emit('input','');
            this.$emit('change',{});
        },
        getNode:function(key){
            console.log('!!!!!!!!!!!!!!!!',key)
            this.$nextTick(()=>{
                this.$refs.treeSelect.setCurrentKey(key)
                this.$nextTick(()=>{
                    let node=this.$refs.treeSelect.getCurrentNode();
                    if(node){
                        this.label=node[this.treeProps.label];
                    }
                })
            })
        },
        clickTree:function(data,node){
            this.label=data[this.treeProps.label];
            this.$refs.select.blur();
            this.$emit('input',data[this.treeValue])
            this.$emit('change',data);
        },
        filterNode(value, data) {
            let flag =true;  //默认展示
            if(Object.prototype.toString.call(this.filterObject) === '[object Object]'){
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
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item.selected,
    .el-select-dropdown__item:hover {
        background:transparent !important;
    }
    .el-select-dropdown__item{
        height:auto;
    }
    .custom-tree-node{
        .active{
            color: @activeColor;
        }
    }
}
</style>