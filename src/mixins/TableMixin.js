export default function(config) {
	let { deleteApi = '', addApi = '' } = config||{};
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
                }
            }
        },
        methods:{
            sortChange:function(info){
                console.log(info)
            },
            handleSearch:function(tableRef='tableRef',ValidateForm='ValidateForm'){
                // let next=this.searchTableBefore?this.searchTableBefore:true;
                // if(next){
                //     this.$refs[tableRef].searchHandler();
                // }
                this.$refs[ValidateForm].validate((valid) => {
                    if(valid){ //验证通过
                        this.$refs[tableRef].searchHandler();
                    }
                })
            },
            handleAddEdit:function(row){
                if(row){
                    this.handleInfo.row=row;
                }else{
                    this.handleInfo.row=null;
                }
                this.handleInfo.visible=true;
            },
            handleRemove:function(row,tableRef='tableRef'){
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
                    this.$api.post(deleteApi,{id:row.id}).then(()=>{
                        this.$refs[tableRef].searchHandler(false);
                    })
                })
            },
            handleFlush:function(flag){
                this.$refs['tableRef'].searchHandler(flag);
            }
        },
	};
}
