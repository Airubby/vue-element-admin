<template>
    <div class="app-container">
        ABCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa可以了曹！！！！！
        <img src="/images/logo.png">
        <img :src="'/images/'+logo+'.png'">
        <img src="@/assets/images/me.png">
        <img :src="require('@/assets/images/'+me+'.png')">
        <div>
            <div class="img"></div>
            <div class="img1"></div>
        </div>
        <div :style="styleObj">打包图片也可以了哦</div>
        <add></add>
    </div>
</template>

<script>
import add from './component/add'
export default {
    components: { add },
    created() {

    },
    mounted(){

    },
    computed:{
        styleObj() {
            let bg=this.templateUrl?'#000C3F url('+this.templateUrl+'/images/homebg.png) no-repeat center':'#000C3F url('+require("@/assets/images/me.png")+') no-repeat center'
            return {
                background: bg,
                width:"100px",
                height:"100px"
            }
        },
    },
    data() {
        return {
            templateUrl:"",
            logo:"logo",
            me:"me"
        }
    },
    methods:{

    }
    
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .app-container{
        color: @alarmColor;
        .img{
            width: 100px;
            height: 100px;
            background: url("~@/assets/images/me.png") no-repeat;
        }
        .img1{
            width: 200px;
            height: 50px;
            background: url("/images/logo.png") no-repeat;
        }
    }
}
</style>
