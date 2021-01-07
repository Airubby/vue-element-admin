
import Layout from '@/layout';
export default {
	path: '/projectdebug',
	component: Layout,
	redirect: '/projectdebug/syscheck',
	name: 'Projectdebug',
	meta: {
		title: '工程调试',
		icon: 'nested'
	},
	children: [
		{
			path: 'syscheck',
			component: () => import('@/views/projectdebug/syscheck/index'), 
			name: 'ProjectconfigSyscheck',
			meta: { title: '系统自检' },
			redirect: '/projectdebug/syscheck/vendorconfig',
			children: [
				{
					path: 'plantconfigcheck',
					component: () => import('@/views/projectdebug/syscheck/plantconfigcheck'),
					name: 'ProjectconfigSyscheckPlantconfigcheck',
					meta: { title: '平台配置自检' }
                },
                {
					path: 'collectorcheck',
					component: () => import('@/views/projectdebug/syscheck/collectorcheck'),
					name: 'ProjectconfigSyscheckCollectorcheck',
					meta: { title: '采集器自检' }
                },
                {
					path: 'runlogiccheck',
					component: () => import('@/views/projectdebug/syscheck/runlogiccheck'),
					name: 'ProjectconfigSyscheckRunlogiccheck',
					meta: { title: '运行逻辑自检' }
                }
			]
        },
        {
			path: 'sysanalyse',
			component: () => import('@/views/projectdebug/sysanalyse/index'), // Parent router-view
			name: 'ProjectconfigSysanalyse',
			meta: { title: '系统分析' },
			redirect: '/projectdebug/sysanalyse/loadanalysegrade',
			children: [
				{
					path: 'loadanalysegrade',
					component: () => import('@/views/projectdebug/sysanalyse/loadanalysegrade'),
					name: 'ProjectconfigSysanalyseLoadanalysegrade',
					meta: { title: '负载分析评分' }
				},
				{
					path: 'reliabilityanalyse',
					component: () => import('@/views/projectdebug/sysanalyse/reliabilityanalyse'),
                    name: 'ProjectconfigSysanalyseReliabilityanalyse',
					meta: { title: '可靠性分析' }
				},
				{
					path: 'optimization',
					component: () => import('@/views/projectdebug/sysanalyse/optimization'),
                    name: 'ProjectconfigSysanalyseOptimization',
					meta: { title: '优化建议' }
                },
			]
        }
	]
};
