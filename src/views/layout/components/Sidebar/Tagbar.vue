<template>
    <div class="right-menu">
        <el-dropdown class="right-menu-box" >
            <div>
                <item icon="theme" title="" />
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>科技蓝</el-dropdown-item>
                <el-dropdown-item>优雅白</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="right-menu-box" >
            <div>
                <item icon="language" title="" />
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>中文</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="right-menu-box">
            <item icon="message" title="" />
        </div>
        <div class="right-menu-box">
            <item icon="user" title="admin" />
        </div>
    </div>
</template>

<script>
import Item from './Item'
import { mapGetters } from 'vuex'
export default {
    components: {
        Item
    },
    computed: {
        ...mapGetters([
        'sidebar',
        'avatar',
        'device'
        ])
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>

</style>
