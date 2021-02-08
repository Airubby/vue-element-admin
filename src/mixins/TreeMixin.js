export default {
    data() {
        return {
            filterTree: '',
            treeProps: {
                children: 'children',
                label: 'label'
            },
        }
    },
    mounted(){
        
    },
    methods:{
        getSelect:function(){
            //需设置node-key="id"
            this.$refs.tree.getCheckedKeys(); //禁用的checkbox的id也存在
            this.$refs.tree.getCheckedNodes(); //这样排除禁用的
        },
        //递归设置可选项{type:'O'}可选，其它禁用 this.treeData=this.disableHandle(this.treeData,{type:'O'})
        disableHandle:function(treeData,filter){
            if (!(treeData instanceof Array)) {
                return false;
            }
            treeData.map(item=>{
                if (undefined == item || null == item || !(item instanceof Object)) {
                    return treeData;
                }
                if (undefined !== filter || null !== filter || filter instanceof Object) {
                    for(let key in filter){
                        if(item[key]!==filter[key]){
                            item.disabled = true;
                        }
                    }
                }
                if(null != item[this.treeProps.children] && item[this.treeProps.children] instanceof Array){
                    item[this.treeProps.children]=this.disableHandle(item[this.treeProps.children],filter);
                }
            })
            return treeData
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        setAllExpand(state){
            var nodes=this.$refs.tree.root.childNodes
            for(let i in nodes){
                nodes[i].expanded=state;
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
}
