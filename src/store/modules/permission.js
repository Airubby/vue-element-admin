import router, { asyncRoutes,resetRouter } from '@/router'
import { getToken, setToken, removeToken,getUserid,setUserid } from '@/utils/auth'
import Request from '@/utils/Request'
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 */
export function filterAsyncRoutes(routes) {
	const res = []

	routes.forEach(route => {
		const tmp = { ...route }
		if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children)
        }
        res.push(tmp)
	})

	return res
}

const state = {
    token: getToken(),
    userid: getUserid(),
	routes: [],
	addRoutes: []
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERID: (state, userid) => {
		state.userid = userid
	},
	SET_ROUTES: (state, routes) => {
        state.routes=routes
	}
}

const actions = {
	setToken({ commit }, token) {
		setToken(token)
		commit('SET_TOKEN', token)
    },
    setUserid({ commit },userid){
        setUserid(userid)
        commit('SET_USERID', userid)
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
            //这个地方退出登录
            // Request.post('/logout',{token:state.token}).then(() => {
            //     commit('SET_TOKEN', '')
            //     commit('SET_ROUTES', [])
            //     removeToken()
            //     resolve()
            // }).catch(error => {
            //     reject(error)
            // })
            commit('SET_TOKEN', '')
            commit('SET_ROUTES', [])
            removeToken()
            resolve()
        })
    },
	generateRoutes({ commit }, data) {
		return new Promise((resolve,reject) => {
            resetRouter(); //重置初始路由
            //asyncRoutes 是 data 接口获取的，测试写死在router中
            console.log(data)
            let accessedRoutes=data
            if(accessedRoutes&&accessedRoutes.length>0){
                let redirect=accessedRoutes.length>0?accessedRoutes[0].path:'/401';
                let newRouter={
                    path: '/',
                    name:'layout',
                    meta: { title: '首页'},
                    component: () => import(/* webpackChunkName: "layout", webpackPrefetch: true */ '@/views/layout'),
                    // component:resolve => require(['@/views/home.vue'], resolve),
                    redirect:redirect,
                    children:[]
                }
                let theAsyncRouter = filterAsyncRoutes(accessedRoutes);
                if(theAsyncRouter){
                    newRouter.redirect=theAsyncRouter[0].path;
                    newRouter.children=[{
                        path: '/redirect/:path(.*)',
                        name:'redirect',
                        component: () => import(/* webpackChunkName: "redirect", webpackPrefetch: true */ '@/views/redirect/index'),
                        hidden: true,
                    }].concat(theAsyncRouter);
                }
                router.addRoutes([newRouter,{ path: '*', redirect: '/404', hidden: true }]);
                commit('SET_ROUTES', accessedRoutes)
            }
			resolve(accessedRoutes)
		})
    },
	getInfo({ commit },info) {
		return new Promise(resolve => {
            //这个地方请求角色权限信息
            if(state.userid=='admin'||info=='admin'){
                resolve(asyncRoutes)
            }else{
                resolve([])
            }
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
