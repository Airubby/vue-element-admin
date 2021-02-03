export default function(config) {
	let { addApi = '', editApi = '', detailApi='' } = config||{};
	return {
        props:['dialogInfo'],
		created() {
            if(this.dialogInfo.row){
                this.Api=editApi
                this.flag=false;
                this.getDetail(this.dialogInfo.row.id)
            }else{
                this.Api=addApi
            }
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
                Api:'',
                flag:true
            }
        },
        methods:{
            getDetail:function(id){
                this.$api.post(detailApi,{id:id}).then(res=>{
                    Object.assign(this.initParams,res.data);
                    this.handleDetailAfter&&this.handleDetailAfter()
                })
            },
            dialogSure:function(){
                this.$refs['ValidateForm'].validate((valid) => {
                    if(valid){ //验证通过
                        this.handleSureBefore&&this.handleSureBefore();
                        this.$api.post(this.Api,this.initParams).then(res=>{
                            this.$emit('backHandle',this.flag)
                        })
                    }
                })
            },
        },
	};
}
