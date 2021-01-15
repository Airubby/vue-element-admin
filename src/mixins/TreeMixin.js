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
    methods:{
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
