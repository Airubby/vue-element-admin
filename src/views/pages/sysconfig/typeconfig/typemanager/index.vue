<template>
    <div class="app-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label='概览' name="first">
                <indicator></indicator>
            </el-tab-pane>
            <el-tab-pane label='详情' name="second">
                <attributedef></attributedef>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import indicator from './component/indicator'
import attributedef from './component/attributedef'
export default {
    components: { indicator,attributedef },
    created() {

    },
    mounted(){

    },
    data() {
        return {
            activeName:"first"
        }
    },
    methods:{

    }
    
}
</script>
