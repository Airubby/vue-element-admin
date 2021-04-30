// import store from '@/store/index'
import Mock from 'mockjs' //引入mockjs，npm已安装
// import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
// const requireMock = require.context(
//     // 其组件目录的相对路径
//     '@/views/pages',
//     // 是否查询其子目录
//     true,
//     // 匹配基础组件文件名的正则表达式
//     /(Mock)+\.(js)$/
// )
// requireMock.keys().forEach(filePath => {
//     import('@/views/pages'+filePath.substring(1));
// })

Mock.setup({
	timeout:1000  //设置请求延时时间
})

// const getdata = function(){
//     let datalist = []
// 	for (let i = 0; i < 20; i += 1) {
//         const o = Mock.mock({  //mockjs模拟随机生成数据，生成20条
//             email:Random.email(),
//             phone:/^1[345789]\d{9}$/,  //手机号
//             ip:Random.ip(),
//             city:Random.city(),  //城市  传 prefix 参数 表示 带省前缀
//             county:Random.county(),   //县城  传 prefix 参数 表示 带省前缀
//             id:Random.id(),  
//             guid: Random.guid(),
//             img:Random.image(),  // 生成图片  '200x100', '#50B347', '#FFF', 'Mock.js'
//             Date:Random.date('yyyy-MM-dd'),  
//             datatime:Random.datetime(), //传参 yy-MM-dd a HH:mm:ss
//             time:Random.time('A HH:mm:ss'),
//             name: Random.cword(4, 16), // 随机生成任意名称
//             name1: Random.first(), // 随机生成任意名称
//             personName: Random.cname(),  //生成姓名
//             string: Random.string(10),  //min,max
//             float:Random.float(60, 100, 3, 5),  // min,max,dmin,dmax
//             integer:Random.integer(1,5),  //min,max
//             boolean:Random.boolean(),  // 1,1,true
//             number: Random.string('number', 1, 5),  //数字型字符串1-5位
//             content: Random.csentence(10, 32),
//             "arr|1":["aaa","bbb"],  //自定义展示
//             "matchID":"match1"  //自定义写死
//         })
//         datalist.push(o)
//     }
// 	return{
//         err_code:0,
//         err_msg:"成功",
//         data:datalist
//     }
// }

const getMenuData = function(){
	return{
        err_code:0,
        err_msg:'成功',
        data:[
            {
                'key': 'dashboard',
                'path':'/dashboard',
                'component':'/pages/dashboard/index',
                'iconfont': 'dashboard',
                'title': 'Dashboard'
            },
            {
                'key': 'sysconfig',
                'path':'/sysconfig',
                'component':'/pages/sysconfig/index',
                'iconfont': 'nested',
                'title': '系统配置',
                'children':[
                    {
                        'key': 'SysconfigBaseconfig',
                        'path':'/sysconfig/baseconfig',
                        'component':'/pages/sysconfig/baseconfig/index',
                        'iconfont': '',
                        'title': '基础配置',
                        'children':[
                            {
                                'key':'SysconfigBaseconfigSysparams',
                                'path':'/sysconfig/baseconfig/sysparams',
                                'component':'/pages/sysconfig/baseconfig/sysparams/index',
                                'iconfont':'',
                                'title':'参数配置',
                                'limits':[]
                            },
                            {
                                'key':'SysconfigBaseconfigDatadic',
                                'path':'/sysconfig/baseconfig/datadic',
                                'component':'/pages/sysconfig/baseconfig/datadic/index',
                                'iconfont':'',
                                'title':'数据字典'
                            },
                            {
                                'key':'SysconfigBaseconfigMetricunits',
                                'path':'/sysconfig/baseconfig/metricunits',
                                'component':'/pages/sysconfig/baseconfig/metricunits/index',
                                'iconfont':'',
                                'title':'度量单位'
                            }
                        ]
                    },
                    {
                        'key': 'SysconfigTypeconfig',
                        'path':'/sysconfig/typeconfig',
                        'component':'/pages/sysconfig/typeconfig/index',
                        'iconfont': '',
                        'title': '类型配置',
                        'children':[
                            {
                                'key':'SysconfigTypeconfigCoreindicator',
                                'path':'/sysconfig/typeconfig/coreindicator',
                                'component':'/pages/sysconfig/typeconfig/coreindicator/index',
                                'iconfont':'',
                                'title':'核心指标'
                            },
                            {
                                'key':'SysconfigTypeconfigStaticattributegroup',
                                'path':'/sysconfig/typeconfig/staticattributegroup',
                                'component':'/pages/sysconfig/typeconfig/staticattributegroup/index',
                                'iconfont':'',
                                'title':'静态属性组'
                            },
                            {
                                'key':'SysconfigTypeconfigTypemanager',
                                'path':'/sysconfig/typeconfig/typemanager',
                                'component':'/pages/sysconfig/typeconfig/typemanager/index',
                                'iconfont':'',
                                'title':'类型管理'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

Mock.mock(RegExp('/getMenuData' + '.*'), /get|post/i,getMenuData) 