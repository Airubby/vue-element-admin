<template>
  <div :class="{ 'has-logo': showLogo }" class="bar-container" >
    <logo v-if="showLogo" :collapse="isCollapse" />
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
    <tagbar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import Tagbar from './Tagbar'
import variables from '@/assets/css/variables.less';
export default {
    components: { SidebarItem, Logo ,Tagbar},
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