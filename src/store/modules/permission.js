import route,{ asyncRoutes, resetRouter } from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Request from '@/utils/Request'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some(role => route.meta.roles.includes(role))
	} else {
		return true
	}
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
    //接口数据处理
    const res = []

    routes.forEach(route => {
        const tmp={
            path: route.path,
            component: () => import(/* webpackChunkName: "[request]" */ `@/views${route.component}`),
            name: route.key,
            meta: { title: route.title, icon: route.iconfont,limits:route.limits||[] }
        }

        if(route.children&&route.children.length>0){
            tmp.redirect=route.children[0].path;
            tmp.children=filterAsyncRoutes(route.children);
        }
    
        res.push(tmp);
    })

    return res
    
    

	// const res = []

	// routes.forEach(route => {
	// 	const tmp = { ...route }
	// 	if (hasPermission(roles, tmp)) {
	// 		if (tmp.children) {
	// 			tmp.children = filterAsyncRoutes(tmp.children, roles)
	// 		}
	// 		res.push(tmp)
	// 	}
	// })

	// return res
}

const state = {
	token: getToken(),
	roles: [],
	routes: []
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	},
	SET_ROUTES: (state, routes) => {
        state.routes=routes;
	}
}

const actions = {
	setToken({ commit }, token) {
		setToken(token)
		commit('SET_TOKEN', token)
	},
	setRoutes({ commit }, routes) {
		commit('SET_ROUTES', routes)
	},
	resetToken({ commit }) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			commit('SET_ROUTES', [])
			removeToken()
			resolve()
		})
    },
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            resetRouter(); //重置初始路由
            //这个地方退出登录
            // Request.post('/logout',{token:state.token}).then(() => {
            //     dispatch('resetToken')
            //     resolve()
            // }).catch(error => {
            //     reject(error)
            // })
            dispatch('resetToken')
            resolve()
        })
    },
	getInfo({ commit,state }) {
		return new Promise(resolve => {
            // if(state.token=='admin'){
            //     route.addRoutes(asyncRoutes)
            //     route.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
            //     commit('SET_ROUTES', asyncRoutes[0].children)
            //     console.log(asyncRoutes[0])
            //     resolve(asyncRoutes[0].children)
            // }else{
            //     resolve([])
            // }
			Request.get('/getMenuData',{token:state.token}).then(res => {
                console.log(res)
                let accessedRoutes=res.data
                if(accessedRoutes&&accessedRoutes.length>0){
                    let newRouter={
                        path: '/',
                        name:'layout',
                        meta: { title: '首页'},
                        component: () => import(/* webpackChunkName: "layout", webpackPrefetch: true */ '@/views/layout'),
                        // component:resolve => require(['@/views/home.vue'], resolve),
                        redirect:'',
                        children:[]
                    }
                    let theAsyncRouter = filterAsyncRoutes(accessedRoutes);
                    console.log(theAsyncRouter)

                    if(theAsyncRouter){
                        newRouter.redirect=theAsyncRouter[0].path;
                        theAsyncRouter[0].meta.affix=true //固定用
                        newRouter.children=[{
                            path: '/redirect/:path(.*)',
                            name:'redirect',
                            component: () => import(/* webpackChunkName: "redirect", webpackPrefetch: true */ '@/views/redirect/index'),
                            hidden: true,
                        }].concat(theAsyncRouter);
                    }
                    console.log('收到了')
                    route.addRoutes([newRouter,{ path: '*', redirect: '/404', hidden: true }]);
                    commit('SET_ROUTES', theAsyncRouter)
                }
                resolve(res.data||[])
            }).catch(error => {
                console.log('异常')
                resolve([])
            })
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
