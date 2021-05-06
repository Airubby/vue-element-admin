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
        <div class="right-menu-box" @click="logout">
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
        logout() {
            this.$confirm('确定退出, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$store.dispatch('permission/logout')
                this.$router.push('/login?redirect=/')
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
