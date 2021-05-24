import router from './router'
import store from './store'
import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

routerGo();

function getInfo(){  //刷新页面重新获取权限
    return new Promise(async function(resolve, reject){
        console.log(router)
        store.dispatch("app/setPageLoading",true)
        const hasToken = getToken()
        if(hasToken){
            try {
                // get user info
                const accessRoutes = await store.dispatch('permission/getLimitInfo')
                console.log(accessRoutes)
                if(accessRoutes.length<=0){
                    await store.dispatch('permission/resetToken')
                    router.push({ path: '/login?redirect=/'})
                    store.dispatch("app/setPageLoading",false)
                }
            } catch (error) {
                // remove token and go to login page to re-login
                await store.dispatch('permission/resetToken')
                Message.error(error || 'Has Error')
                router.replace({ path: router.currentRoute.path})
            }
        }else{
            router.push({ path: '/login?redirect=/'})
            store.dispatch("app/setPageLoading",false)
        }
        resolve()
    })
}

async function routerGo(){
    store.dispatch("app/setPageLoading",false)
    await getInfo();

    const whiteList = ['/login','/lib'] // no redirect whitelist

    router.beforeEach(async (to, from, next) => {
        // start progress bar
        // NProgress.start()
        store.dispatch("app/setPageLoading",true)
        // set page title
        document.title = getPageTitle(to.meta.title)
        const hasToken = getToken()
        if (hasToken) {
            console.log('hastoken')
            if (to.path === '/login') {
                // if is logged in, redirect to the home page
                next({ path: '/' })
            } else {
                const permission = store.getters.permission_routes && store.getters.permission_routes.length > 0
                if(permission){
                    next()
                }else{
                    try {
                        // get user info
                        const accessRoutes = await store.dispatch('permission/getLimitInfo')
                        console.log(accessRoutes)
                        if(accessRoutes&&accessRoutes.length>0){
                            next({ ...to, replace: true })
                        }else{
                            await store.dispatch('permission/resetToken')
                            Message.error('此账号没有任何权限')
                            next({path:`/login?redirect=${to.path}`,replace:true})
                        }
                    } catch (error) {
                        // remove token and go to login page to re-login
                        await store.dispatch('permission/resetToken')
                        Message.error(error || 'Has Error')
                        next(`/login?redirect=${to.path}`)
                    }
                    store.dispatch("app/setPageLoading",false)
                }
                
            }
        } else {
            /* has no token*/
            if (whiteList.indexOf(to.path) !== -1) {
                // in the free login whitelist, go directly
                next()
            } else {
                // other pages that do not have permission to access are redirected to the login page.
                next(`/login?redirect=${to.path}`)
                store.dispatch("app/setPageLoading",false)
                // NProgress.done()
            }
        }
        
    })

    router.afterEach(() => {
        console.log("afterEach")
        // finish progress bar
        // NProgress.done()
        store.dispatch("app/setPageLoading",false)
    })
}
