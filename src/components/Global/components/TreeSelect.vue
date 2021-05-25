<template>
    <el-select v-model="selectValue" 
        :disabled="disabled"
        @focus="focus"
        @clear="clear"
        filterable 
        :clearable="clearable"
        :filter-method="filterMethod"
        ref="select"
        :placeholder="placeholder">
        <el-option :label="selectLabel" value="" style="display:none"></el-option>
        <el-option :label="selectLabel" :value="selectValue">
            <el-tree ref="treeSelect" :node-key="treeValue"
            :data="treeSelectData" 
            :filter-node-method="filterNode"
            :default-expanded-keys="expandedKeys"
            :props="treeProps" 
            :lazy="lazy"
            :load="loadNode"
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
        lazy:{
            type:Boolean,
            default:false
        },
        url:{
            type:String,
            default:''
        },
        params:{
            type:Object,
            default:()=>{
                return{}
            }
        },
        //异步拉取的时候回填的信息展示
        showName:{
            type:String,
            default:''
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
        this.filterTree();
    },
    data() {
        return {
            selectValue:'',
            selectLabel:'',
            treeSelectData:[],
            expandedKeys:[]
        }
    },
    methods:{
        loadNode:function(node,resolve){
            if(node.level==0){
                return resolve(this.treeSelectData);
            }else{
                if(node.data.type=="M"&&node.data[this.treeProps.children].length==0){
                    this.getNodeTree(node.data,resolve)
                }else{
                    return resolve(node.data[this.treeProps.children]||[])
                }
            }
        },
        getNodeTree:function(data,resolve){
            this.$api.post(this.url,{type:data.type},{isLoading:false}).then(res=>{
                let arr=[];
                if(res.errCode=="0"){
                    arr=res.data||[]
                }
                if(resolve) return resolve(arr);
            })
        },
        filterTree:function() {
            this.$nextTick(()=>{
                if(Object.prototype.toString.call(this.disabledObject) === '[object Object]'&&JSON.stringify(this.filterObject)!='{}'){
                    this.$refs.treeSelect.filter();
                }
            })
        },
        getTree:function(){
            if(this.url){
                this.$api.post(this.url,this.initParams,{isLoading:false}).then(res=>{
                    this.treeSelectData=res.data?res.data:[];
                    this.filterTree();
                    this.expandedKeys=[this.selectValue]
                })
            }
        },
        clear:function(){
            this.selectLabel='';
            this.selectValue='';
            this.$emit('input','');
            this.$emit('change',null);
        },
        focus:function(){
            if(this.url){
                this.getTree();
            }
            this.filterMethod('');
            this.$emit('focus');
        },
        getNode:function(key){
            if(key){
                this.$refs.treeSelect.setCurrentKey(key)
                this.$nextTick(()=>{
                    let node=this.$refs.treeSelect.getCurrentNode();
                    if(node){
                        this.selectValue=node[this.treeValue];
                        this.selectLabel=node[this.treeProps.label];
                        this.expandedKeys=[this.selectValue]
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
                this.$nextTick(()=>{
                    this.getNode(val);
                })
            },
            immediate:true
        },
        showName:{
            handler:function(val){
                if(this.url&&this.value){
                    this.$nextTick(()=>{
                        this.selectLabel=val;
                        this.selectValue=this.value;
                    })
                }
            },
            immediate:true
        },
        treeData:{
            handler:function(val){
                if(this.url==''){
                    this.treeSelectData=val;
                }
            },
            immediate:true
        },
        
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