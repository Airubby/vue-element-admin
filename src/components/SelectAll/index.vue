
<template>
    <div class="app-container">
        <el-select v-model="value" @change="changeSelect" placeholder="请选择" multiple collapse-tags clearable>
            <el-option key="all" label="All" value="all"></el-option>
            <el-option :disabled="value.indexOf('all')!=-1"
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    components: {  },
    created() {

    },
    mounted(){

    },
    data() {
        return {
            value:[],
            backValue:[],
            cities: [{
                value: 'Beijing',
                label: '北京'
                }, {
                value: 'Shanghai',
                label: '上海'
                }, {
                value: 'Nanjing',
                label: '南京'
                }, {
                value: 'Chengdu',
                label: '成都'
                }, {
                value: 'Shenzhen',
                label: '深圳'
                }, {
                value: 'Guangzhou',
                label: '广州'
            }],
        }
    },
    methods:{
        changeSelect:function(data){
            if(data.indexOf('all')!=-1){
                this.value=["all"];
            }
        }
    }
    
}
</script>
