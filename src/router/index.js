import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/**
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
// import sysconfigRouter from './modules/sysconfig'
// import projectconfigRouter from './modules/projectconfig'
// import projectdebug from './modules/projectdebug'
// import realtimecontrol from './modules/realtimecontrol'
// import querycount from './modules/querycount'
// import objconfig from './modules/objconfig'
export const syncRouter=[
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "404" */ '@/views/error/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import(/* webpackChunkName: "401" */ '@/views/error/401'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '@/views/login/index'),
        hidden: true
    },
    // {
    //     path: '/pages',
    //     component: () => import(/* webpackChunkName: "layout", webpackPrefetch: true */ '@/views/layout'),
    //     redirect: '/pages/home',
    //     meta: { title: '首页' },
    //     children:[
    //         {
    //             path: '/pages/redirect/:path(.*)',
    //             name:'redirect',
    //             component: () => import(/* webpackChunkName: "redirect", webpackPrefetch: true */ '@/views/redirect/index'),
    //             hidden: true,
    //         },
    //         {
    //             path: '/pages/home',
    //             component: () => import(/* webpackChunkName: "home", webpackPrefetch: true */ '@/views/pages/dashboard/index'),
    //             name: 'Dashboard',
    //             meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    //         },
    //         // querycount,
    //         // projectconfigRouter,
    //         // projectdebug,
    //         // realtimecontrol,
    //         // sysconfigRouter,
    //         // objconfig,
    //     ]
    // },
    // { path: '*', redirect: '/404', hidden: true }, 
];

export const asyncRoutes=[
    // {
    //     path: '/',
    //     component: () => import(/* webpackChunkName: "layout", webpackPrefetch: true */ '@/views/layout'),
    //     redirect: '/home',
    //     meta: { title: '首页' },
    //     children:[
    //         {
    //             path: '/redirect/:path(.*)',
    //             name:'redirect',
    //             component: () => import(/* webpackChunkName: "redirect", webpackPrefetch: true */ '@/views/redirect/index'),
    //             hidden: true,
    //         },
    //         {
    //             path: '/home',
    //             component: () => import(/* webpackChunkName: "home", webpackPrefetch: true */ '@/views/pages/dashboard/index'),
    //             name: 'Dashboard',
    //             meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    //         },
    //         // querycount,
    //         // projectconfigRouter,
    //         // projectdebug,
    //         // realtimecontrol,
    //         // sysconfigRouter,
    //         // objconfig,
    //     ]
    // },
]

/**
 * 重写路由的push方法  解决 Navigating to current location ("url") is not allowed
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const createRouter = () => new Router({
    // mode: 'history',  //默认hash
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: syncRouter
 })
 
 export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
 }
 const router = createRouter()
 export default router