
export default {
	path: '/realtime',
	component: () => import('@/views/pages/realtimecontrol/index'), 
	// redirect: '/realtime/control',
	name: 'Realtime',
	meta: {
		title: '实时监控',
		icon: 'nested'
	},
	// children: [
	// 	{
	// 		path: 'control',
	// 		component: () => import('@/views/pages/realtimecontrol/control/index'), 
	// 		name: 'RealtimeControl',
	// 		meta: { title: '实时监控' },
	// 		redirect: '/realtime/control/objcontrol',
	// 		children: [
	// 			{
	// 				path: 'objcontrol',
	// 				component: () => import('@/views/pages/realtimecontrol/control/objcontrol'),
	// 				name: 'RealtimeControlObjcontrol',
	// 				meta: { title: '对象监控' }
    //             },
    //             {
	// 				path: 'pointcontrol',
	// 				component: () => import('@/views/pages/realtimecontrol/control/pointcontrol'),
	// 				name: 'RealtimeControlPointcontrol',
	// 				meta: { title: '指标监控' }
    //             },
    //             {
	// 				path: 'linkcontrol',
	// 				component: () => import('@/views/pages/realtimecontrol/control/linkcontrol'),
	// 				name: 'RealtimeControlLinkcontrol',
	// 				meta: { title: '连接监控' }
    //             },
    //             {
	// 				path: 'syscontrol',
	// 				component: () => import('@/views/pages/realtimecontrol/control/syscontrol'),
	// 				name: 'RealtimeControlSyscontrol',
	// 				meta: { title: '系统自监控' }
    //             },
	// 		]
    //     },
    //     {
	// 		path: 'event',
	// 		component: () => import('@/views/pages/realtimecontrol/event/index'), // Parent router-view
	// 		name: 'RealtimeEvent',
	// 		meta: { title: '事件管理' },
	// 		redirect: '/realtime/event/query',
	// 		children: [
	// 			{
	// 				path: 'query',
	// 				component: () => import('@/views/pages/realtimecontrol/event/query'),
	// 				name: 'RealtimeEventQuery',
	// 				meta: { title: '活动事件查询' }
	// 			},
	// 			{
	// 				path: 'count',
	// 				component: () => import('@/views/pages/realtimecontrol/event/count'),
    //                 name: 'RealtimeEventCount',
	// 				meta: { title: '活动事件统计' }
	// 			},
	// 		]
	// 	},
	// ]
};
