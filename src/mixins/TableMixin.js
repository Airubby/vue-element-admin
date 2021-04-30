export default function(config) {
	let { deleteApi = '', deleteApiMore = '' } = config||{};
	return {
		created() {
            console.log(deleteApi);
            
        },
        computed:{
            baseURL:{
                get(){
                    return this.$store.state.settings.baseURL
                }
            },
            themeSize:{
                get(){
                    return this.$store.state.settings.themeSize
                }
            },
            //计算传参过来
            fn(){
                return function(info){
                    console.log('info是传过来的计算参数')
                    return info
                }
            }
        },
        data(){
            return{
                handleInfo:{
                    visible:false,
                    row:null
                },
                handleInfoMore:{
                    visible:false,
                    row:null
                }
            }
        },
        methods:{
            //重新加载数据高亮展示问题 //或者直接row-key="id"
            rowKey:function(row){
                return row.id;
            },
            //column 绑定sortable:true  //column, prop, order  table上@sort-change="sortChange"
            sortChange:function(info){
                console.log(info)
            },
            // <el-table-column slot="prepend" type="selection" align="center" :selectable="checkSelectable"></el-table-column>
            checkSelectable:function(row,index){
                console.log(row,index)
                //true可勾选；false不可勾选
                return row.check
            },
            handleSearch:function(tableRef='tableRef',ValidateForm='ValidateForm'){
                console.log(this.$refs.tableRef.getSelect())
                let next=this.searchTableBefore?this.searchTableBefore:true;
                if(next){
                    this.$refs[ValidateForm].validate((valid) => {
                        if(valid){ //验证通过
                            this.$refs[tableRef].searchHandler();
                        }
                    })
                }
                // this.$refs[ValidateForm].validate((valid) => {
                //     if(valid){ //验证通过
                //         this.$refs[tableRef].searchHandler();
                //     }
                // })
            },
            handleAddEdit:function(row,info='handleInfo'){
                if(row){
                    this[info].row=row;
                }else{
                    this[info].row=null;
                }
                this[info].visible=true;
            },
            handleRemove:function(row,tableRef='tableRef'){
                let ids=[];
                if(row){
                    ids=[row.id]
                }else{
                    let select=this.$refs[tableRef].getSelect();
                    if(select.length>0){
                        for(let i=0;i<select.length;i++){
                            ids.push(select[i].id)
                        }
                    }
                }
                if(ids.length==0){
                    this.$message.warning('请勾选删除项');
                    return;
                }
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
                    let url=tableRef=='tableRef'?deleteApi:deleteApiMore;
                    this.$api.post(url,{id:row.id}).then(()=>{
                        this.$refs[tableRef].searchHandler(false);
                        //删除后的一些操作
                        this.handleRemoveAfter&&this.handleRemoveAfter(tableRef);
                    })
                })
            },
            handleFlush:function(flag,tableRef='tableRef'){
                this.$refs[tableRef].searchHandler(flag);
            }
        },
	};
}
