
export default {
	path: '/objconfig',
	component: () => import(/* webpackChunkName: "Sysconfig" */ '@/views/pages/objconfig/index'), 
	redirect: '/objconfig/baseconfig',
	name: 'Sysconfig',
	meta: {
		title: '系统配置',
		icon: 'nested'
	},
	children: [
		{
			path: 'baseconfig',
			component: () => import(/* webpackChunkName: "SysconfigBaseconfig", webpackPrefetch: true */ '@/views/pages/objconfig/baseconfig/index'), 
			name: 'SysconfigBaseconfig',
			meta: { title: '基础配置' },
			redirect: '/objconfig/baseconfig/sysparams',
			children: [
				{
					path: 'sysparams',
					component: () => import(/* webpackChunkName: "SysconfigBaseconfig", webpackPrefetch: true */ '@/views/pages/objconfig/baseconfig/sysparams'),
					name: 'SysconfigBaseconfigSysparams',
					meta: { title: '参数配置' }
                },
                {
					path: 'datadic',
					component: () => import(/* webpackChunkName: "SysconfigBaseconfig", webpackPrefetch: true */ '@/views/pages/objconfig/baseconfig/datadic'),
					name: 'SysconfigBaseconfigDatadic',
					meta: { title: '数据字典' }
                },
                {
					path: 'metricunits',
					component: () => import(/* webpackChunkName: "SysconfigBaseconfig", webpackPrefetch: true */ '@/views/pages/objconfig/baseconfig/metricunits'),
					name: 'SysconfigBaseconfigMetricunits',
					meta: { title: '度量单位' }
                },
                {
					path: 'standardevent',
					component: () => import(/* webpackChunkName: "SysconfigBaseconfig", webpackPrefetch: true */ '@/views/pages/objconfig/baseconfig/standardevent'),
					name: 'SysconfigBaseconfigStandardevent',
					meta: { title: '标准事件' }
                },
                {
					path: 'protocolconfig',
					component: () => import(/* webpackChunkName: "SysconfigBaseconfig", webpackPrefetch: true */ '@/views/pages/objconfig/baseconfig/protocolconfig'),
					name: 'SysconfigBaseconfigProtocolconfig',
					meta: { title: '协议配置' }
				},
			]
        },
        {
			path: 'typeconfig',
			component: () => import(/* webpackChunkName: "SysconfigTypeconfig", webpackPrefetch: true */ '@/views/pages/objconfig/typeconfig/index'), // Parent router-view
			name: 'SysconfigTypeconfig',
			meta: { title: '类型配置' },
			redirect: '/objconfig/typeconfig/coreindicator',
			children: [
				{
					path: 'coreindicator',
					component: () => import(/* webpackChunkName: "SysconfigTypeconfig", webpackPrefetch: true */ '@/views/pages/objconfig/typeconfig/coreindicator'),
					name: 'SysconfigTypeconfigCoreindicator',
					meta: { title: '核心指标' }
				},
				{
					path: 'staticattributegroup',
					component: () => import(/* webpackChunkName: "SysconfigTypeconfig", webpackPrefetch: true */ '@/views/pages/objconfig/typeconfig/staticattributegroup'),
                    name: 'SysconfigTypeconfigStaticattributegroup',
					meta: { title: '静态属性组' }
				},
				{
					path: 'typemanager',
					component: () => import(/* webpackChunkName: "SysconfigTypeconfig", webpackPrefetch: true */ '@/views/pages/objconfig/typeconfig/typemanager'),
                    name: 'SysconfigTypeconfigTypemanager',
					meta: { title: '类型管理' }
                },
                {
					path: 'typeindicator',
					component: () => import(/* webpackChunkName: "SysconfigTypeconfig", webpackPrefetch: true */ '@/views/pages/objconfig/typeconfig/typeindicator'),
                    name: 'SysconfigTypeconfigTypeindicator',
					meta: { title: '类型指标' }
                },
                {
					path: 'staticattributedef',
					component: () => import(/* webpackChunkName: "SysconfigTypeconfig", webpackPrefetch: true */ '@/views/pages/objconfig/typeconfig/staticattributedef'),
                    name: 'SysconfigTypeconfigStaticattributedef',
					meta: { title: '静态属性定义' }
				}
			]
		},
	]
};
