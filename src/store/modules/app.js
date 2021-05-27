import Cookies from 'js-cookie'
import Request from '@/utils/Request'
const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'medium',
    theme:'blueTheme',
    AjaxUrl:Cookies.get('AjaxUrl')||'',
    language: Cookies.get('language') || 'zh',
    DicItem:{}, //数据字典
    pageLoading:true, //默认展示loading
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
        } else {
        Cookies.set('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_SIZE: (state, size) => {
        state.size = size
        Cookies.set('size', size)
    },
    SET_AJAXURL(state,ajaxUrl){
        state.AjaxUrl=ajaxUrl;
        Cookies.set('AjaxUrl', ajaxUrl)
    },
    SET_LANGUAGE: (state, language) => {
        state.language = language
        Cookies.set('language', language)
    },
    SET_DICITEM:(state, obj) => {
        let {key, value} = obj;
        try{
            state.DicItem[key] = value;
        }catch (error) {
            console.log(error);
        }
    },
    SET_PAGELOADING:(state, flag) => {
        state.pageLoading = flag
    },
}

const actions = {
    /**
        * action函数可以接收一个与store实例具有相同方法的属性context
         *   context:{    //{Object} store对象  更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
		 *       state,   等同于store.$state，若在模块中则为局部状态
		 *       rootState,   等同于store.$state,只存在模块中
		 *       commit,   等同于store.$commit,必须在mutations中同步操作
		 *       dispatch,   等同于store.$dispatch,dispatch：可以异步操作，例如向后台提交数据
		 *       getters   等同于store.$getters
         *    }
        *  args   // Array 需要请求的字典keys集合
        *  new Promise() 内的参数是函数,可以将异步方法按一定的顺序执行 ,即（resolve,reject）=> {     } ;
        *  有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
        * resolve =》 是个函数，异步成功时调用，并将异步操作的结果返回出去;reject  =》 是个函数，异步失败时调用
        */
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
        commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }, size) {
        commit('SET_SIZE', size)
    },
    setAjaxUrl({commit},ajaxUrl){
        commit('SET_AJAXURL',ajaxUrl)
    },
    setLanguage({ commit }, language) {
        commit('SET_LANGUAGE', language)
    },
    setDicItem({ commit,state }, array) {
        return new Promise((resolve, reject) => {
            let dict = state.DicItem;//数据字典JSON
            let params= array.reduce((total, currentValue, currentIndex)=>{
                if(!dict[currentValue]){
                    total.push(currentValue)
                }
                return total;
            },[]);  // [] 初始值为空
            if(params.length===0){
                resolve(true);
            }else{
                params.forEach(element => {
                    Request.get('/DicItem',{code:element}).then(res => {
                        params.map(key=>{
                            commit("SET_DICITEM",{key:key,value:res.data[key]||[]})
                        })
                        resolve(true,res); //第一个参数告诉调用处，数据字典请求成功
                    })
                });
            }
            
            // let params = args.reduce((o, v, i) => {
            //     if(dict[v]&&dict[v].length == 0){   //当缓存中没有时添加到请求中
            //         o.push(v);
            //     }
            //     return o;
            // },[]);
            // if(params.length === 0) {    //当缓存中存在时从缓存中拿数据
            //     resolve(true);
            //     return false;
            // }
            
            // fetchPost("/api/queryDictSorts",{dictSortCode:param.join(";")}).then(
            //     res => {
            //         params.map(v => {
            //             context.commit("setOptions",{
            //                 key:v,
            //                 value:res.data[v]||[]
            //             });
            //         });
            //         resolve(true,res);//第一个参数告诉调用处，数据字典请求成功
            //     },
            //     err => {
            //         reject(err);
            //     }
            // )
        });
    },
    setPageLoading({commit},flag){
        commit('SET_PAGELOADING',flag)
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
