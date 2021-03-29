<template>
    <div id="app" ref="app">
        <router-view />
    </div>
</template>
<script>
  export default {
	name: 'app',
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

</style>
