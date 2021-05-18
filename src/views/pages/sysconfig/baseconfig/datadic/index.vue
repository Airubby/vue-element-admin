<template>
    <div class="app-container">
        <div class="btn-box active">
            <span>test</span>
        </div>
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
            
        }
    },
    methods:{

    }
    
}
</script>
<style lang="less" scoped>
    .btn-box{
        width: auto;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #2B3153;
        display: inline-block;
        border: 1px solid #2B3153;
        margin-right: 10px;
        margin-top: 10px;
        span{
            width: 100%;
            height: 100%;
            padding: 0 20px;
            display: inline-block;
            position: relative;
        }
        &.active{
            position: relative;
            border: 1px solid #4977FE;
        }
        &.active::after{
            content: "";
            position: absolute;
            width: 0;
            bottom: 0;
            right: 0;
            height: 0;
            border-bottom: 22px solid #4977FE;
            border-left: 22px solid transparent;
        }
        &.active span::before{
            content: "";
            position: absolute;
            width: 7px;
            bottom: 4px;
            right: 5px;
            height: 2px;
            background: #2B3153;
            z-index: 99;
            transform: rotateZ(20deg);
        }
        &.active span::after{
            content: "";
            position: absolute;
            width: 9px;
            bottom: 6px;
            right: -1px;
            height: 2px;
            background: #2B3153;
            z-index: 99;
            transform: rotateZ(-50deg);
        }
    }
</style>