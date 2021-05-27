export default {
    data() {
        return {
            filterTree: '',
            treeProps: { //:props="treeProps"
                children: 'children',
                label: 'label'
            },
            checkedKeys:[],  // :default-checked-keys="checkedKeys"
            
        }
    },
    mounted(){
        
    },
    methods:{
        //懒加载  :load="loadNode"  lazy
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ name: 'region' }]);
            }
            this.$r.post("",{},r=>{
                if(r.data){
                    return resolve(r.data);
                }else{
                    return resolve([]);
                }
            })
        },
        getSelect:function(){
            //需设置node-key="id"
            this.$refs.tree.getCheckedKeys(); //禁用的checkbox的id也存在
            this.$refs.tree.getCheckedNodes(); //这样排除禁用的
        },
        //点击树形
        nodeClick:function(data){
            this.activeId=data.id;
        },
        //设置选中 this.$nextTick(() => {this.$refs.tree.setCheckedKeys([key]);});   异步获取树形给默认勾选
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3]);
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
        //筛选过滤 :filter-node-method="filterNode"
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //设置全部展开或者闭合
        setAllExpand(state){
            var nodes=this.$refs.tree.root.childNodes
            for(let i in nodes){
                nodes[i].expanded=state;
            }
        },
        //勾选改变
        checkChange:function(node,checked,data){
            console.log(this.$refs.tree.getCheckedNodes())
            if(this.checkRadio){ //单选 需设置 :check-strictly="true" node-key="id"
                if(this.$refs.tree.getCheckedNodes().length%2===0){
                    if(checked){
                        this.$refs.tree.setCheckedNodes([node]);
                    }else{
                        this.$refs.tree.setCheckedNodes([]);
                    }
                }
            }else{
                console.log(this.$refs.tree.getCheckedKeys());
            }
        },
    },
    watch: {
        //  <el-input v-model="initParams.filterTree"></el-input>
        filterTree(val) {
            this.$refs.tree.filter(val);
        }
    },
}
