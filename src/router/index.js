import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
import nestedRouter from './modules/nested'
export const syncRouter=[
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
          {
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
          }
        ]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [
          {
            path: 'index',
            component: () => import('@/views/guide/index'),
            name: 'Guide',
            meta: { title: 'Guide', icon: 'guide', noCache: true }
          }
        ]
    },
    nestedRouter,
    { path: '*', component: () => import('@/views/errorPage/Loading') }, //这个不要给meta的键值对
];

export const asyncRoutes=[
    
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