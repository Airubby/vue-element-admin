import { asyncRoutes, syncRouter } from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
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
export function filterAsyncRoutes(routes, roles) {
	const res = []

	routes.forEach(route => {
		const tmp = { ...route }
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles)
			}
			res.push(tmp)
		}
	})

	return res
}

const state = {
	token: getToken(),
	roles: [],
	routes: [],
	addRoutes: []
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	},
	SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        syncRouter.forEach(element => {
            console.log(element)
            if(element.access){
                state.routes=element.children;
            }
        });
		// state.routes = syncRouter.concat(routes)
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
			commit('SET_ROLES', [])
			removeToken()
			resolve()
		})
	},
	generateRoutes({ commit }, roles) {
		return new Promise(resolve => {
			let accessedRoutes
			if (roles.includes('admin')) {
				accessedRoutes = asyncRoutes || []
			} else {
				accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
			}
			commit('SET_ROUTES', accessedRoutes)
			resolve(accessedRoutes)
		})
	},
	getInfo({ commit }) {
		return new Promise(resolve => {
			//这个地方请求角色信息
			commit('SET_ROLES', ['admin'])
			resolve(['admin'])
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
