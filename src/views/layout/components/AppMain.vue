<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <el-scrollbar class="app-scrollbar" ref="appScrollbar">
                <router-view :key="key" />
            </el-scrollbar>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        key() {
            return this.$route.path
        }
    },
    watch:{
        '$route.path'(newValue, oldValue) {
            const scrollbar = this.$refs.appScrollbar
            // scrollbar 的实例对象相当于在 el-scrollbar 组件里面的 this
            console.log(scrollbar)
            scrollbar.sizeHeight=''
            const wrap = scrollbar.$refs.wrap
            console.log(wrap)
        }

    }
}
</script>

<style lang="less" scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100% - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    .app-scrollbar.el-scrollbar{
        min-height: 100%;
    }
}

.fixed-header+.app-main {
    padding-top: 50px;
    height: 100%;  
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}

</style>

