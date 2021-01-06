
import Layout from '@/layout';
export default {
	path: '/projectconfig',
	component: Layout,
	redirect: '/projectconfig/baseconfig',
	name: 'Projectconfig',
	meta: {
		title: '工程配置',
		icon: 'nested'
	},
	children: [
		{
			path: 'baseconfig',
			component: () => import('@/views/projectconfig/baseconfig/index'), 
			name: 'ProjectconfigBaseconfig',
			meta: { title: '基础配置' },
			redirect: '/projectconfig/baseconfig/vendorconfig',
			children: [
				{
					path: 'vendorconfig',
					component: () => import('@/views/projectconfig/baseconfig/vendorconfig'),
					name: 'ProjectconfigBaseconfigVendorconfig',
					meta: { title: '厂商配置' }
                },
                {
					path: 'eventlevel',
					component: () => import('@/views/projectconfig/baseconfig/eventlevel'),
					name: 'ProjectconfigBaseconfigEventlevel',
					meta: { title: '事件等级' }
                },
                {
					path: 'rulescene',
					component: () => import('@/views/projectconfig/baseconfig/rulescene'),
					name: 'ProjectconfigBaseconfigRulescene',
					meta: { title: '规则场景' }
                },
                {
					path: 'reladefintion',
					component: () => import('@/views/projectconfig/baseconfig/reladefintion'),
					name: 'ProjectconfigBaseconfigReladefintion',
					meta: { title: '关系定义' }
                }
			]
        },
        {
			path: 'agfirmware',
			component: () => import('@/views/projectconfig/agfirmware/index'), // Parent router-view
			name: 'ProjectconfigAgfirmware',
			meta: { title: '协议固件' },
			redirect: '/projectconfig/agfirmware/plantpconfig',
			children: [
				{
					path: 'plantpconfig',
					component: () => import('@/views/projectconfig/agfirmware/plantpconfig'),
					name: 'ProjectconfigAgfirmwarePlantpconfig',
					meta: { title: '平台协议配置' }
				},
				{
					path: 'rommanager',
					component: () => import('@/views/projectconfig/agfirmware/rommanager'),
                    name: 'ProjectconfigAgfirmwareRommanager',
					meta: { title: '固件管理' }
				},
				{
					path: 'accproconfig',
					component: () => import('@/views/projectconfig/agfirmware/accproconfig'),
                    name: 'ProjectconfigAgfirmwareAccproconfig',
					meta: { title: '接入协议配置' }
                },
			]
        },
        {
			path: 'modelconfig',
			component: () => import('@/views/projectconfig/modelconfig/index'), // Parent router-view
			name: 'ProjectconfigModelconfig',
			meta: { title: '型号配置' },
			redirect: '/projectconfig/modelconfig/modelmanager',
			children: [
				{
					path: 'modelmanager',
					component: () => import('@/views/projectconfig/modelconfig/modelmanager'),
                    name: 'ProjectconfigModelconfigModelmanager',
					meta: { title: '型号管理' }
                }
			]
        },
        {
			path: 'objectconfig',
			component: () => import('@/views/projectconfig/objectconfig/index'), // Parent router-view
			name: 'ProjectconfigObjectconfig',
			meta: { title: '对象配置' },
			redirect: '/projectconfig/objectconfig/objectmanager',
			children: [
				{
					path: 'objectmanager',
					component: () => import('@/views/projectconfig/objectconfig/objectmanager'),
                    name: 'ProjectconfigObjectconfigObjectmanager',
					meta: { title: '对象管理' }
                },
                {
					path: 'aggobjectmanager',
					component: () => import('@/views/projectconfig/objectconfig/aggobjectmanager'),
                    name: 'ProjectconfigObjectconfigAggobjectmanager',
					meta: { title: '聚合对象管理' }
                },
                {
					path: 'linkconfig',
					component: () => import('@/views/projectconfig/objectconfig/linkconfig'),
                    name: 'ProjectconfigObjectconfigLinkconfig',
					meta: { title: '连接配置' }
                },
                {
					path: 'relamanager',
					component: () => import('@/views/projectconfig/objectconfig/relamanager'),
                    name: 'ProjectconfigObjectconfigRelamanager',
					meta: { title: '关系管理' }
                },
                {
					path: 'eventrule',
					component: () => import('@/views/projectconfig/objectconfig/eventrule'),
                    name: 'ProjectconfigObjectconfigEventrule',
					meta: { title: '事件规则' }
                }
			]
        },
        {
			path: 'gangedrule',
			component: () => import('@/views/projectconfig/gangedrule/index'), // Parent router-view
			name: 'ProjectconfigGangedrule',
			meta: { title: '联动规则' },
			redirect: '/projectconfig/gangedrule/gangedruleconfig',
			children: [
				{
					path: 'gangedruleconfig',
					component: () => import('@/views/projectconfig/gangedrule/gangedruleconfig'),
                    name: 'ProjectconfigGangedruleGangedruleconfig',
					meta: { title: '联动规则配置' }
                },
                {
					path: 'taskitem',
					component: () => import('@/views/projectconfig/gangedrule/taskitem'),
                    name: 'ProjectconfigGangedruleTaskitem',
					meta: { title: '任务项' }
                }
			]
        }
	]
};
