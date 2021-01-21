<template>
    <div class="scrollbar-container flex">
        <div class="container-left" :style="{width:leftWidth}">
            <slot name="left" />
        </div>
        <div class="container-right" :style="{width: `calc(100% - ${leftWidth})`}">
            <slot name="right"/>
        </div>
    </div>
</template>

<script>
export default {
    name:'LRLayout',
    components: {  },
    props:{
        leftWidth:{
            type: String,
            default: '320px',
        }
    },
    mixins:[],
    created() {

    },
    mounted(){

    },
    data() {
        return {
            
        }
    },
    methods:{
        
    },
    watch: {
        
    },
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    // .container-left{
    //     width: 320px;
    // }
    .container-right{
        padding-left: 20px;
        // width: calc(100% - 320px);
    }
}
</style>