<template>
    <div class="app-container">

        <!-- <DynamicComponent :pathUrl="`/template/air/AirSys.js`" :templateData="initParams" templateUrl="/template/air"></DynamicComponent> -->
        <component :is="currentComponent"></component>
        <div @click="dialog" v-for="item in 10" :key="item">测试1</div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
// import DialogFullScreen from '@/components/DialogFullScreen/index'
import DynamicComponent from '@/components/DynamicComponent/index'
export default {
    components: { DynamicComponent },
    created() {

    },
    mounted(){
        // this.$api.get('/getMenuData').then(res=>{
        //     console.log(res)
        // })
        // console.log(require('/template/air/main.js'))
        // this.currentComponent=Vue.component('test',function(resolve){
        //     require(['/template/air/main.js'],resolve)
        // })

        axios.get('/template/air/main.js').then((result) => {
            // console.log(result)

            
            // this.currentComponent={
            //                 ...eval(result)
            //             }

            // let compName = eval(result).libraryName;
            // console.log(compName)
            // let url = res.url;
            
            // let script = document.createElement('script');
            // script.src = "/template/air/main.js";  // '/js/helloWorld.js'
            // script.onload = () => {
            //     console.log(window)
            //     // Vue.component('test', window[compName].default);
            //     this.currentComponent = 'test';
            // }
            // document.body.appendChild(script);
            
            // console.log(result)
            // this.currentComponent=Vue.component('currentComponent',function(resolve){
            //     resolve(result)
            // }) 
            // tempData = compiler.parseComponent(result);
            // resolve();
        })
        
        // document.onkeydown=function(ev){
        //     var event=ev ||event
        //     if(event.keyCode==13){
        //         alert('按了enter键')
        //     }
        // }
    },
    data() {
        return {
            currentComponent:null,
            initParams:{

            },
            dialogInfo:{
                visible:false
            }
        }
    },
    methods:{
        dialog:function(){
            this.dialogInfo.visible=true;
        }
    }
    
}
</script>
