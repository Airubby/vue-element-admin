<template>
    <div class="app-container">
        <div class="drag-table">
            <div class="drag-table-title">
                <div class="border-box" v-for="(item,index) in tableColumns" :key="index">
                    {{item.label}}
                </div>
            </div>
            <div class="drag-table-body">
                <div class="tabl-body" v-for="(list,serial) in tableData" :key="serial">
                    <div class="border-box" v-for="(item,index) in tableColumns" :key="index">
                        <div class="drop" v-if="item.drop" @dragover='allowDrop($event)' @drop='dragDrop($event,list)'>{{list[item['prop']]}}</div>
                        <div class="drag" v-else-if="item.drag" draggable="true" @dragstart="dragStart($event,list)">{{list[item['prop']]}}</div>
                        <div v-else>{{list[item['prop']]}}</div>
                    </div>
                </div>
            </div>
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
            tableColumns:[
                { prop: 'objPoint', label: '对象指标'},
                { prop: 'mapPoint', label: '映射指标',drop:true},
                { prop: 'realMapObj', label: '实际映射对象'},
                { prop: 'realMapPoint', label: '实际映射指标'},
                { prop: 'selectPoint', label: '可选指标',drag:true},
                { prop: 'obj', label: '所属对象'},
            ],
            tableData:[
                {id:'1',objPoint:'对象指标1',mapPoint:'映射指标1',realMapObj:'',realMapPoint:'',selectPoint:'可选指标1',obj:'所属对象1'},
                {id:'2',objPoint:'对象指标2',mapPoint:'映射指标2',realMapObj:'',realMapPoint:'',selectPoint:'可选指标2',obj:'所属对象2'},
                {id:'3',objPoint:'对象指标3',mapPoint:'映射指标3',realMapObj:'',realMapPoint:'',selectPoint:'可选指标3',obj:'所属对象3'},
            ],
            activeDrag:{},
        }
    },
    methods:{
        allowDrop:function (ev) {
            ev.preventDefault();
        },
        dragDrop:function(ev,list){
            console.log(ev,list)
            list.realMapObj=this.activeDrag.obj;
            list.realMapPoint=this.activeDrag.selectPoint;
        },
        dragStart:function(ev,list){
            console.log(ev,list)
            this.activeDrag=list;
        }
    }
    
}
</script>
<style lang="less" scoped>
    .drag-table{
        width: 100%;
        height: auto;
        text-align: center;
        border: 1px solid #F5F7FA;
        .drag-table-title{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #F5F7FA;
            display: flex;
        }
        .drag-table-body{
            .tabl-body{
                display: flex;
                width: 100%;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #F5F7FA;
            }
        }
        .border-box{
            width: 100%;
            border-left: 1px solid #F5F7FA;
            &:nth-of-type(1){
                border: none;
            }
            .drag{
                cursor: move;
            }
        }
    }
</style>