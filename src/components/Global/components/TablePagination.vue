<template>
    <el-table-pagination
        v-scrollBar="'table'"
        :url="baseURL"
        list-field="data" 
        total-field="total"
        :size="themeSize"
        :type="type"
        :data="data"
        :method='method' 
        :params="params"
        :columns="columns" ref="tableRef">   
            <!-- <template v-slot:preview-handle="scope">
                <slot name="preview-handle" :scope="scope"></slot>
            </template> -->
            <template v-slot:[item]="scope" v-for="item in soltList">
                <slot :name="item" :scope="scope"></slot>
            </template>
    </el-table-pagination>
</template>

<script>
export default {
    components:{},
    props:{
        url: {
            type: String,
            default:''
        },
        method:{
            type: String,
            default:'post'
        },
        type:{
            type: String,
            default:'remote'
        },
        params:{
            type: Object,
            default: () => {
                return {}
            }
        },
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            default:()=>{
                return []
            }
        },
        soltList:{
            type: Array,
            default:()=>{
                return ['preview-handle']
            }
        }
    },
    computed:{
        baseURL:{
            get(){
                return this.$store.state.settings.baseURL+this.url
            }
        },
        themeSize:{
            get(){
                return this.$store.state.settings.themeSize
            }
        }
    },
    created () {
        
    },
    mounted() {
        
    },
    data() {
        return {
            
        }
    },
    methods:{
        
    },
}
</script>

