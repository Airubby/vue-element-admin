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
            //重新加载数据高亮展示问题
            rowKey:function(row){
                return row.id;
            },
            sortChange:function(info){
                console.log(info)
            },
            handleSearch:function(tableRef='tableRef',ValidateForm='ValidateForm'){
                // let next=this.searchTableBefore?this.searchTableBefore:true;
                // if(next){
                //     this.$refs[ValidateForm].validate((valid) => {
                //         if(valid){ //验证通过
                //             this.$refs[tableRef].searchHandler();
                //         }
                //     })
                // }
                this.$refs[ValidateForm].validate((valid) => {
                    if(valid){ //验证通过
                        this.$refs[tableRef].searchHandler();
                    }
                })
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
