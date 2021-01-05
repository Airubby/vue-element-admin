import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import Request from '@/utils/Request'
import 'element-ui/lib/theme-chalk/index.css'
import ElTablePagination from 'el-table-pagination'
import 'promise-polyfill'  //兼容低版本浏览器  
import 'babel-polyfill' //兼容低版本浏览器  
import Cookies from 'js-cookie'

import './icons' // icon
import './permission' // permission control

//加载全局组件
// import './components/Global/index.js'
import '@/utils/Directive'  //自定义指令

import '@/assets/css/basic.less'

// 将API方法绑定到全局
Vue.prototype.$api = Request
Vue.prototype.$store = store

Vue.prototype.publicPath=process.env.BASE_URL

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'small', // set element-ui default size
})
Vue.use(ElTablePagination)

Vue.config.productionTip = false

function init() {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}
init();
