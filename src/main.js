import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import Request from '@/utils/Request'
import 'element-ui/lib/theme-chalk/index.css'
import ElTablePagination from 'el-table-pagination'
import 'promise-polyfill'  //兼容低版本浏览器  
import 'babel-polyfill' //兼容低版本浏览器  
import Cookies from 'js-cookie'
import settings from './settings'
import './icons' // icon
// import './permission'

import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang

//加载全局组件
import './components/Global/index.js'
import '@/utils/Directive'  //自定义指令

// 将API方法绑定到全局
Vue.prototype.$api = Request
Vue.prototype.$store = store

Vue.prototype.$baseURL=settings.baseURL

Vue.use(ElTablePagination)

Vue.config.productionTip = false
let i18n='';
function getServerConfig() {
    return new Promise ((resolve, reject) => {
        axios.get('/serverConfig.json').then((result) => {
            let config = result;
            
            if(config.mock){
                import(/* webpackChunkName: "public-mock", webpackPrefetch: true */ '@/utils/Mock.js')
            }

            let reqcon=result.request;

            let ajaxUrl,website=reqcon.website,port=reqcon.port?reqcon.port:'',postfix=reqcon.postfix;
            if(reqcon.website==''||reqcon.website.indexOf('127.0.0.1')!=-1||reqcon.website.indexOf('localhost')!=-1){
                // orighin: http://127.0.0.1:8080
                let site=window.document.location.origin;
                ajaxUrl=site+postfix
                if(port){
                    if(window.document.location.port){
                        ajaxUrl=site.split(window.document.location.port)[0]+port+postfix;
                    }else{
                        ajaxUrl=site+':'+port+postfix;
                    }
                }else{
                    ajaxUrl=website+(port?(':'+port):'')+postfix;
                }
            }

            store.dispatch('app/setAjaxUrl',ajaxUrl);
            store.dispatch('app/setLanguage',Cookies.get('language') || config.language||'zh');
            Vue.prototype.$ajaxUrl=ajaxUrl;
            Vue.prototype.$webSocket=config.webSocket;
            Vue.use(VueI18n)
            const messages = {
                en: {
                ...elementEnLocale
                },
                zh: {
                ...elementZhLocale
                }
            }
            i18n = new VueI18n({
                locale: Cookies.get('language') || 'zh', // set locale
                messages // set locale messages
            })
            Vue.use(ElementUI, {
                size: Cookies.get('themSize') || settings.themeSize, // set element-ui default size
                i18n: (key, value) => i18n.t(key, value)
            })

            import(/* webpackChunkName: "public-permission", webpackPrefetch: true */ './permission.js')

            resolve();
        })
    })
}
async function init() {
    await getServerConfig();
    new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
    }).$mount('#app')
}
init();
