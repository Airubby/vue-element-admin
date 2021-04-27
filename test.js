import Vue from 'vue';
import Router from 'vue-router';
import config from '@/config';

Vue.use(Router);

// 模块路由名称(与文件夹名称相同)
const moduleNameList = [
  "basicService",
  "equipment",
  "upkeep",
  "workOrderRouter",
  "medicalWaste",
  "inspection",
  "orderResource",
  "taskCode",
  "warehouse",
  "clientRelation",
  "transport",
  "construction"
];
// 动态路由
export const asyncRoutes = [];

// 固定路由
export const constantRoutes = [
  // {
  //   name: "index",
  //   path: "/",
  //   component: () => import("@/views/index")
  // }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  linkActiveClass: 'active',
  routes: [].concat(constantRoutes, asyncRoutes)
})

// router 
const router = createRouter();

// 配置的模块
const modules = config.modules;

function genAsyncRoutes(mList) {
  let count = mList.length;
  mList.forEach(moduleName => {
    if (moduleNameList.includes(moduleName)) {
        import(`./${moduleName}/${moduleName}`).then(route => {
          route.default.forEach(val =>{
            asyncRoutes.push(val);
          })
          if (--count === 0) {
            router.addRoutes(asyncRoutes);
          }
        });
    }
  });
}

// 处理模块
function disposeModules() {
    if (typeof modules === 'string') {
      if (modules === 'all') {
        genAsyncRoutes(moduleNameList);
      } else if (moduleNameList.includes(modules)) {
        genAsyncRoutes([modules]);
      }
    } else if (modules instanceof RegExp) {
      genAsyncRoutes(moduleNameList.filter(name => modules.test(name)));

    } else if (modules instanceof Array) {
      genAsyncRoutes(modules);
    }
}
disposeModules();