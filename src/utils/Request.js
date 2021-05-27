import axios from 'axios'
import { Loading, Notification,MessageBox,Message } from 'element-ui'
import router from '@/router/index'
import store from '@/store/index'
let loadingService = null
let service = axios.create({
	baseURL: '',
	timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
	config => {
		if (store.getters.token) {
			config.headers['X-Token'] = store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
		}
		return config
	},
	error => {
		// Do something with request error
		return Promise.reject(error)
	}
)

// respone拦截器
service.interceptors.response.use(
	response => {
		loadingService && loadingService.close()
        const res = response.data
        if(res.hasOwnProperty("errCode")){
            if(res.errCode=="0"){
                if(response.config.headers.HintInfo.isHint) Message.success(res.message||"请求操作成功")
            }else if(res.errCode=="-1"){
                MessageBox.confirm('长时间未操作，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('permission/resetToken').then(() => {
                        location.reload()
                    })
                })
                return Promise.reject(new Error(res.message || 'Error'))
            }else{
                if(response.config.headers.HintInfo.errHint){
                    Message.warning(res.message||"请求操作失败")
                    return Promise.reject(new Error(res.message || 'Error'))
                } 
            }
        }
		return response
	},
	error => {
		console.log(error.response)
		loadingService && loadingService.close()
		Notification.error('服务器错误，请联系管理人员！')
		return Promise.reject(error)
	}
)

// export default service;
const Info = {
    isLoading: true,  //是否展示loading
    isHint:false,  //false 是返回界面提示，true是走公共提示
    errHint:true,  
	lock: true,
	text: '数据加载中...',
	spinner: 'el-icon-loading',
	background: 'rgba(0, 0, 0, 0.7)'
}
export default {
	get: function(url, params = {}, loadInfo) {
		let HintInfo = Object.assign({}, Info, loadInfo)
		if (HintInfo.isLoading) {
			loadingService = Loading.service(HintInfo)
		}
		return new Promise((resolve, reject) => {
			service.get(url, { params: params },{
                headers:{
                    HintInfo:HintInfo
                }
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
		})
	},
	post: function(url, params, loadInfo) {
		let HintInfo = Object.assign({}, Info, loadInfo)
		if (HintInfo.isLoading) {
			loadingService = Loading.service(HintInfo)
		}
		return new Promise((resolve, reject) => {
			service.post(url, params,{
                headers:{
                    HintInfo:HintInfo
                }
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
		})
	},
	//post请求参数放url中
	postQuery: function(url, params, loadInfo) {
		let HintInfo = Object.assign({}, Info, loadInfo)
		if (HintInfo.isLoading) {
			loadingService = Loading.service(HintInfo)
		}
		return new Promise((resolve, reject) => {
			service.post(url, null, { params: params },{
                headers:{
                    HintInfo:HintInfo
                }
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
		})
	},
	exportFile: function(url, params, loadInfo) {
		let HintInfo = Object.assign({}, Info, loadInfo)
		if (HintInfo.isLoading) {
			loadingService = Loading.service(HintInfo)
		}
		return new Promise((resolve, reject) => {
			service.post(url, params, { responseType: 'blob' }).then(response => {
                console.log(response.headers)//响应头信息
                //content-file:"aaaa;filename=文件名称.xls"; 截取= 和 .  之间的字符串
                let filename=response.headers['content-file'].match(/=(\S*)\./)[1];
                let file=response.headers['content-file'].split('filename=')[1];
                let blob = new Blob([response.data], {
                    // type: 'application/vnd.ms-excel;charset=utf-8'
                    type: 'application/octet-stream;charset=utf-8'
                })
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download=decodeURIComponent(file);  // 默认给什么后缀就是什么后缀
                link.download=decodeURIComponent(filename)+'.csv';  //自定义后缀
                document.body.appendChild(link)
                link.click()
                window.URL.revokeObjectURL(link.href) // 释放URL 对象
                document.body.removeChild(link) // 下载完成移除元素
                resolve(response)
            }).catch(error => {
                reject(error)
            })
		})
	},
	downloadFile: function(url, params, loadInfo) {
		let HintInfo = Object.assign({}, Info, loadInfo)
		if (HintInfo.isLoading) {
			loadingService = Loading.service(HintInfo)
		}
		return new Promise(resolve => {
			let link = document.createElement('a')
			link.href = url
			link.download = 'download'
			document.body.appendChild(link)
			link.click()
			window.URL.revokeObjectURL(link.href) // 释放URL 对象
			document.body.removeChild(link) // 下载完成移除元素
			loadingService && loadingService.close()
			resolve(true)
		})
	},
	service: service
}
