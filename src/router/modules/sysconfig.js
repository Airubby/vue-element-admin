
import Layout from '@/layout';
export default {
	path: '/sysconfig',
	component: Layout,
	redirect: '/sysconfig/baseconfig',
	name: 'Sysconfig',
	meta: {
		title: '系统配置',
		icon: 'nested'
	},
	children: [
		{
			path: 'baseconfig',
			component: () => import('@/views/sysconfig/baseconfig/index'), 
			name: 'SysconfigBaseconfig',
			meta: { title: '基础配置' },
			redirect: '/sysconfig/baseconfig/sysparams',
			children: [
				{
					path: 'sysparams',
					component: () => import('@/views/sysconfig/baseconfig/sysparams'),
					name: 'SysconfigBaseconfigSysparams',
					meta: { title: '参数配置' }
                },
                {
					path: 'datadic',
					component: () => import('@/views/sysconfig/baseconfig/datadic'),
					name: 'SysconfigBaseconfigDatadic',
					meta: { title: '数据字典' }
                },
                {
					path: 'metricunits',
					component: () => import('@/views/sysconfig/baseconfig/metricunits'),
					name: 'SysconfigBaseconfigMetricunits',
					meta: { title: '度量单位' }
                },
                {
					path: 'standardevent',
					component: () => import('@/views/sysconfig/baseconfig/standardevent'),
					name: 'SysconfigBaseconfigStandardevent',
					meta: { title: '标准事件' }
                },
                {
					path: 'protocolconfig',
					component: () => import('@/views/sysconfig/baseconfig/protocolconfig'),
					name: 'SysconfigBaseconfigProtocolconfig',
					meta: { title: '协议配置' }
				},
			]
        },
        {
			path: 'typeconfig',
			component: () => import('@/views/sysconfig/typeconfig/index'), // Parent router-view
			name: 'SysconfigTypeconfig',
			meta: { title: '类型配置' },
			redirect: '/sysconfig/typeconfig/coreindicator',
			children: [
				{
					path: 'coreindicator',
					component: () => import('@/views/sysconfig/typeconfig/coreindicator'),
					name: 'SysconfigTypeconfigCoreindicator',
					meta: { title: '核心指标' }
				},
				{
					path: 'staticattributegroup',
					component: () => import('@/views/sysconfig/typeconfig/staticattributegroup'),
                    name: 'SysconfigTypeconfigStaticattributegroup',
					meta: { title: '静态属性组' }
				},
				{
					path: 'typemanager',
					component: () => import('@/views/sysconfig/typeconfig/typemanager'),
                    name: 'SysconfigTypeconfigTypemanager',
					meta: { title: '类型管理' }
                },
                {
					path: 'typeindicator',
					component: () => import('@/views/sysconfig/typeconfig/typeindicator'),
                    name: 'SysconfigTypeconfigTypeindicator',
					meta: { title: '类型指标' }
                },
                {
					path: 'staticattributedef',
					component: () => import('@/views/sysconfig/typeconfig/staticattributedef'),
                    name: 'SysconfigTypeconfigStaticattributedef',
					meta: { title: '静态属性定义' }
				}
			]
		},
	]
};