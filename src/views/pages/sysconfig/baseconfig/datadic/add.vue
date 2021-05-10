<template>
    <div class="app-container flex">
        add
    </div>
</template>

<script>
import add from './component/add'
import addMore from './component/addMore'
import TableMixin from '@/mixins/TableMixin'
let tableMixin=new TableMixin({deleteApi:'/delete/table'}) 
export default {
    components: { add, addMore },
    mixins:[tableMixin],
    created() {
        console.log(this.$route.query.params)
    },
    mounted(){

    },
    data() {
        return {
            params:{
                name:''
            },
            data:[
                {'a':'admin',b:'管理员','c':'345345',d:'15225252525',e:'123@qq.com',f:'1',g:'2',h:'WEB'},
            ],
            columns:[
                { prop: 'a', label: '编码',minWidth:10},
                { prop: 'b', label: '名称',minWidth:10},
                { prop: 'd', label: '数据类型',minWidth:10},
                { prop: 'e', label: '备注',showOverflowTooltip:true,minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
            initParams:{
                name:''
            },
            tableData:[
                {'a':'admin',b:'管理员','c':'345345',d:'玩儿',e:'123@qq.com',f:'1',g:'1',h:'WEB'},
                {'a':'admin1',b:'管理员','c':'345345',d:'手动阀',e:'123@qq.com',f:'1',g:'2',h:'WEB23'}
            ],
            tableColumns:[
                { prop: 'a', label: '参数编码',sortable:'custom',minWidth:100},
                { prop: 'b', label: '参数名称',minWidth:100},
                { prop: 'c', label: '参数等级',minWidth:100},
                { prop: 'd', label: '数据类型',minWidth:100},
                { prop: 'e', label: '参数值',minWidth:100},
                { prop: 'f', label: '设定范围',minWidth:100},
                { prop: 'g', label: '扩展参数1',minWidth:100},
                { prop: 'h', label: '扩展参数2',minWidth:100},
                { prop: 'h', label: '备注',minWidth:100},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
            rules:{
                name:[
                    {  required: true, message: '请输入', trigger: ['blur', 'change'] }
                ]
            },
            addMoreInfo:{
                visible:false,
                row:null
            }
        }
    },
    methods:{
        handleSearch:function(){
            console.log('enter 请求')
        },
        searchT:function(){
            this.$refs['ValidateF'].validate((valid) => {
                if(valid){ //验证通过
                    this.$refs['tableR'].searchHandler();
                }
            })
        },
        handleAE:function(){
            this.addMoreInfo.visible=true;
        },
        handleR:function(row){
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                // await deleteRole(row.key)
                // this.rolesList.splice($index, 1)
                // this.$message({
                //     type: 'success',
                //     message: 'Delete succed!'
                // })
                this.$api.post('deleteApi',{id:row.id}).then(()=>{
                    this.$refs['tableR'].searchHandler(false);
                })
            })
        }


    }
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .container-left{
        width: 35%;
        .container-left-top{
            width: 100%;
            display: flex;
            margin-bottom: @boxMargin;
            justify-content: space-between;
            .container-left-input{
                width: calc(100% - 140px);
            }
        }
    }
    .container-right{
        padding-left: 20px;
        width: 65%;
    }
}
</style>