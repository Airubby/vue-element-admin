<template>
    <el-select v-model="selectValue" filterable 
        @focus="focus"
        :clearable="clearable" 
        :loading="loading" 
        :remote="remote" 
        :disabled="disabled"
        :remote-method="remoteMethod" 
        @change="change"
        @clear="clear"
        :placeholder="placeholder">
        <el-option :label="showName" :value="selectValue" v-if="remote&&firstShow&&selectValue&&showName"></el-option>
        <el-option
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionLabel]"
        :value="item[optionValue]">
        </el-option>
        <el-pagination
            v-if="remote"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-size="pageSize"
            layout="prev, pager,next,total"
            :total="total"
        >
        </el-pagination>
    </el-select>
</template>

<script>
export default {
    name:'Select',
    components: {  },
    props:{
        value:[String,Boolean,Number,Object],
        //异步拉取的时候回填的信息展示
        showName:{
            type:String,
            default:''
        },
        url:{
            type:String,
            default:''
        },
        remote:{
            type: Boolean,
            default: true
        },
        //本地信息的数据
        data:{
            type: Array,
            default:()=>{
                return []
            }
        },
        clearable:{
            type:Boolean,
            default:true
        },
        disabled:{
            type:Boolean,
            default:false
        },
        optionValue: {
            type: String,
            default: 'id'  //选择的key值
        },
        optionLabel: {
            type: String,
            default: 'name'  //展示key值
        },
        queryKey:{
            type: String,
            default: 'query'  //根据这个key值查询
        },
        placeholder:{
            type: String,
            default: '请选择'
        },
        params:{
            type:Object,
            default:()=>{
                return{}
            }
        },
        pagination:{
            type:Object,
            default:()=>{
                return{
                    pageSize:'pageSize',
                    pageIndex:'pageIndex',
                    data:'data.list',
                    total:'data.total'
                }
            }
        }
    },
    created() {
        console.log(this.data)
        if(this.remoteFn&&this.url){
            this.remoteMethod('')
        }
    },
    mounted(){

    },
    computed:{
        initParams:{
            get(){
                let params=Object.assign({},this.params);
                params[this.pagination.pageSize]=this.remote?this.pageSize:1000;
                params[this.pagination.pageIndex]=this.pageIndex;
                params[this.queryKey]=this.query;
                return params;
            }
        },
        selectValue:{
            get:function(){
                //如果给过来的是对象，取对象中的值
                return this.value
            },
            set:function(newValue){
                this.$emit('input',newValue)
            }
        }
    },
    data() {
        return {
            firstShow:true, //初始化的时候传id和name过来展示
            loading:false,
            options: [],  //总数据
            total:0, //总条数
            pageIndex: 1,   //当前页码
            pageSize: 5,   //每页展示的条数
            query:'',
        }
    },
    methods:{
        remoteFn:function(){
            return String(this.remote) !== 'false'
        },
        change:function(key){
            this.options.forEach(element => {
                if(element[this.optionValue]==key){
                    this.$emit('change',element);
                    return;
                }
            });
        },
        focus:function(){
            if(this.remoteFn){
                this.remoteMethod('')
            }
            this.firstShow=false;
            this.$emit('focus')
        },
        clear:function(){
            
        },
        remoteMethod:function(query){
            this.query=query;
            this.pageIndex=1;
            this.getList();
        },
        getList:function(){
            this.query=this.query?this.query:'';  // 关键字搜索重置判断
            this.$api.post(this.url,this.initParams,{isLoading:false}).then(res=>{
                let result=res;
                if (this.pagination.data && this.pagination.data.indexOf('.') !== -1) {
                    this.pagination.data.split('.').forEach(vv => {
                        result = result[vv]
                    })
                } else {
                    result=res[this.pagination.data];
                }
                this.options=result;

                if(this.remoteFn){
                    let total=res;
                    if (this.pagination.total && this.pagination.total.indexOf('.') !== -1) {
                        this.pagination.total.split('.').forEach(vv => {
                            total = total[vv]
                        })
                    } else {
                        total=res[this.pagination.total];
                    }
                    this.total=total;
                }
            })
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getList();
        },
    },
    watch: {
        data:{
            handler:function(val){
                this.options=val
            },
            immediate:true
        }
    },
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    
}
</style>