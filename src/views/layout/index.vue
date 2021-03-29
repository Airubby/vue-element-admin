<template>
    <div :class="classObj" class="app-wrapper">
        <sidebar />
        <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container" />
        <div :class="{hasTagsView:needTagsView}" class="main-container">
            <el-scrollbar class="app-scrollbar">
                <div :class="{'fixed-header':fixedHeader}">
                    <navbar />
                    <tags-view v-if="needTagsView" />
                </div>
                <app-main />
            </el-scrollbar>
        </div> -->
        <app-main />
    </div>
</template>

<script>
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="less" scoped>
// @import '~@/assets/css/variables.less';
// .module-theme(...){
//     .app-wrapper {
//         &:after {
//             content: "";
//             display: table;
//             clear: both;
//         }
//         position: relative;
//         height: 100%;
//         width: 100%;

//         &.mobile.openSidebar {
//         position: fixed;
//         top: 0;
//         }
//     }
//     .drawer-bg {
//         background: #000;
//         opacity: 0.3;
//         width: 100%;
//         top: 0;
//         height: 100%;
//         position: absolute;
//         z-index: 999;
//     }

//     .fixed-header {
//         position: fixed;
//         top: 0;
//         right: 0;
//         z-index: 9;
//         width: calc(100% - @sideBarWidth);
//         transition: width 0.28s;
//     }

//     .hideSidebar .fixed-header {
//         width: calc(100% - 54px)
//     }

//     .mobile .fixed-header {
//         width: 100%;
//     }
// }
</style>
