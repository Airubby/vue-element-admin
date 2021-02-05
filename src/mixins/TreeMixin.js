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
                if(null != item.children && item.children instanceof Array){
                    item.children=this.disableHandle(item.children,filter);
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
