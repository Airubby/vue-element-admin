<template>
    <div class="right-menu">
        <div class="right-menu-box">
            <item icon="theme" title="" />
        </div>
        <div class="right-menu-box">
            <item icon="language" title="" />
        </div>
        <div class="right-menu-box">
            <item icon="message" title="" />
        </div>
        <div class="right-menu-box">
            <item icon="user" title="admin" />
        </div>
        <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" >
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown> -->
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
