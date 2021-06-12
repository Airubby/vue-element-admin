<template>
    <div class="app-container">
        超过时间没操作界面，做相应操作
    </div>
</template>

<script>
export default {
    components: {  },
    created() {

    },
    mounted(){
        this.waitOperate(()=>{
            console.log("响应操作")
        },3000)
    },
    data() {
        return {
            
        }
    },
    methods:{
        waitOperate:function(callback, time){
            let count = 0;
            let x;
            let y;
            let timer;
            //监听鼠标
            document.onmousemove = function (event) {
                const x1 = event.clientX;
                const y1 = event.clientY;
                if (x != x1 || y != y1) {
                    count = 0;
                }
                x = x1;
                y = y1;
            };
            //监听键盘
            document.onkeydown = function () {
                count = 0;
            };
            function countTime() {
                count+=1000;
                if(count >=  time){
                    callback();
                    count = 0;
                    clearInterval(timer);
                }
            }
            timer = setInterval(countTime, 1000);
        },
    }
    
}
</script>
