import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start()

	// set page title
	document.title = getPageTitle(to.meta.title)

	// determine whether the user has logged in
	const hasToken = getToken()

	if (hasToken) {
		if (to.path === '/login') {
			// if is logged in, redirect to the home page
			next({ path: '/' })
		} else {
            const permission = store.getters.permission_routes && store.getters.permission_routes.length > 0
            console.log(permission)
            if(permission){
                next()
            }else{
                try {
                    console.log("try")
                    // get user info
                    const accessRoutes = await store.dispatch('permission/getInfo')
                    console.log(accessRoutes)
                    if(accessRoutes&&accessRoutes.length>0){
                        next({ ...to, replace: true })
                    }else{
                        await store.dispatch('permission/resetToken')
                        Message.error('此账号没有任何权限')
                        // next('/login?redirect=/')
                    }
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('permission/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                }
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
		}
    }
    NProgress.done()
})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
})
