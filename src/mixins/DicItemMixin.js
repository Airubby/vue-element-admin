export default function(config) {
    //{level:'level_code',type:'type_code'}
	let params = config||{};
	return {
		created() {
            if(JSON.stringify(params)!='{}'){
                for(let item in params){
                    this.$set(this.DicItem,item,[]);
                    this.handleDicItem(item,params[item])
                    //如果向数组中set：this.$set(this.items,2,{name: 'xiao4!'})
                }
            }
        },
        computed:{
            showDicItem(){
                return function(item,code){
                    if(this.DicItem[item]&&this.DicItem[item].length>0){
                        this.DicItem[item].forEach(element => {
                            if(element.code==code){
                                return this.DicItem[item].name;
                            }
                        });
                    }
                    return '';
                }
            }
        },
        data(){
            return{
                DicItem:{}
            }
        },
        methods:{
            handleDicItem:function(item,code){
                this.$api.post('/sys/dic',{syscode:code}).then(res=>{
                    this.DicItem[item]=res.data;
                })
            }
        },
	};
}
