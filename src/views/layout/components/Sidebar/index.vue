<template>
  <div :class="{ 'has-logo': showLogo }" class="bar-container" >
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- <el-menu
    :default-active="activeIndex2"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
    </el-submenu>
    :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu> -->
    <el-menu
        class="menu-container"
        :default-active="activeMenu"
        :text-color="variables.menuText"
        mode="horizontal">
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-menu>
    <!-- <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="horizontal"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import variables from '@/assets/css/variables.less';
export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapGetters(['permission_routes', 'sidebar']),
        activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
            return meta.activeMenu;
        }
        return path;
        },
        showLogo() {
        return this.$store.state.settings.sidebarLogo;
        },
        isCollapse() {
        return !this.sidebar.opened;
        },
        variables() {
        return variables;
        },
    },
};
</script>
<style lang="less" scoped>
// @import '~@/assets/css/variables.less';
// .module-theme(...){
//     .bar-container{
//         width:100%;
//         height: 50px;
//         padding: 0 12px;
//         display: flex;
//         background: #1A3965;
//         .menu-box{
//             display: flex;
//             /deep/
//             .el-menu-item, .el-submenu__title{
//                 height: @menuHeight;
//                 line-height: @menuHeight;
//             }
//         }
//         // /deep/ .el-menu--horizontal>.el-menu-item{
//         //     height: 46px;
//         //     line-height: 46px;
//         // }
//         // .el-menu-item, .el-submenu__title
//         // /deep/ .el-menu--horizontal>.el-submenu .el-submenu__title{
//         //     height: 46px;
//         //     line-height: 46px;
//         // }
//         .scrollbar-wrapper{
//             width: 100%;
//         }
//         /deep/ .el-menu-item, .el-submenu__title{
//             height: @menuHeight !important;
//             color: #ff0;
//         }
//     }
// }
</style>