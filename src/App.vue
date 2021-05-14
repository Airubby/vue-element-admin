<template>
    <div id="app" ref="app">
        <loading class="loading" v-if="pageLoading"></loading>
        <router-view />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Loading from '@/views/error/Loading.vue'
  export default {
    name: 'app',
    components:{Loading},
    created () {
        //动态注入语言及API
        // const requireFile = require.context(
        //     // 其组件目录的相对路径
        //     '@/views/pages',
        //     // 是否查询其子目录
        //     true,
        //     // 匹配基础组件文件名的正则表达式
        //     /(index)+\.(vue)$/
        // )
        // console.log(requireFile.keys())
        // console.log(requireFile.resolve())
        // this.$store.dispatch('setLanguageApi',requireLang.keys())
    },
    computed:{
        ...mapGetters([
            'getTheme','languageApi','pageLoading'
        ]),
    },
    mounted() {
    },
    data(){
      return{
        
      }
    },
    methods:{
        
    },
    watch:{
    }
  }
</script>
<style lang="less">
    @import "~@/assets/css/basic.less";
    .loading{
        width:100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
