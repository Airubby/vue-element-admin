
import Layout from '@/views/layout';
export default {
	path: '/querycount',
	component: Layout,
	redirect: '/querycount/alarmcount',
	name: 'Querycount',
	meta: {
		title: '查询统计',
		icon: 'nested'
	},
	children: [
		{
			path: 'alarmcount',
			component: () => import('@/views/pages/querycount/alarmcount/index'), 
			name: 'QuerycountAlarmcount',
			meta: { title: '告警统计' },
        },
        {
			path: 'pointhis',
			component: () => import('@/views/pages/querycount/pointhis/index'), 
			name: 'QuerycountPointhis',
			meta: { title: '测点历史' },
        },
        {
			path: 'toanalyze',
			component: () => import('@/views/pages/querycount/toanalyze/index'), 
			name: 'QuerycountToanalyze',
			meta: { title: '对不分析' },
		},
	]
};
