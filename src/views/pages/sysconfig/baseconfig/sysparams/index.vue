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
        <el-tabs v-model="activeName">
            <el-tab-pane label='概览' name="first">
                <Overview></Overview>
            </el-tab-pane>
            <el-tab-pane label='详情' name="second">
                <Detail></Detail>
            </el-tab-pane>
            <el-tab-pane label='告警' name="third">
                <Alarm></Alarm>
            </el-tab-pane>
        </el-tabs>
        <store-set v-if="storeSetInfo.visible" :dialogInfo="storeSetInfo"></store-set>
        <store-range v-if="storeRangeInfo.visible" :dialogInfo="storeRangeInfo"></store-range>
    </div>
</template>

<script>
import Overview from './component/Overview'
import Detail from './component/Detail'
import Alarm from './component/Alarm'
import add from './component/add'
import StoreSet from './component/StoreSet'
import StoreRange from './component/StoreRange'
export default {
    components: { add,Overview,Detail,Alarm,StoreSet,StoreRange },
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
            me:"me",
            storeSetInfo:{
                visible:false
            },
            storeRangeInfo:{
                visible:false
            }
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
