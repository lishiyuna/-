import { createRouter, createWebHashHistory } from "vue-router";

import store from "@/store/index";
// 导入进度条插件
import useNProgress from "@/hooks/useNProgress.js";
const NProgress = useNProgress();

const routes = [
  {
    path: "/",
    name: "home",
    redirect: {
      name: "homepage",
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children: [
      // 首页
      {
        path: "homepage",
        name: "homepage",
        meta: {
          title: "首页",
          Breadcrumb: ["首页"],
        },
        component: () =>
          import(
            /* webpackChunkName: "homepage" */ "../views/Aside/Homepage.vue"
          ),
      },
      {
        path: "/",
        children: [
          //轮播图管理
          {
            path: "expertarticle",
            name: "expertarticle",
            meta: {
              title: "轮播图管理",
              Breadcrumb: ["主页内容管理", "专家文章"],
            },
            component: () =>
              import(
                /* webpackChunkName: "wangedit" */ "../views/wangedit/form.vue"
              ),
          },
        ],
      },
      //医生管理
      {
        path: "/",
        redirect: { name: "doctor" },
        children: [
          {
            path: "doctor",
            name: "doctor",
            meta: {
              title: "医生管理",
              Breadcrumb: ["医生管理"],
            },
            component: () =>
              import(/* webpackChunkName: "doctor" */ "../views/Doctor/Doctor"),
          },
          {
            path: "doctors/:id",
            name: "doctors",
            meta: {
              title: "医生管理",
              Breadcrumb: ["医生内容修改"],
            },
            component: () =>
              import(
                /* webpackChunkName: "doctor" */ "../views/Doctor/doctors.vue"
              ),
          },
          {
            path: "doct/:groupId",
            name: "doct",
            meta: {
              title: "医生管理",
              Breadcrumb: ["医生内容修改"],
            },
            component: () =>
              import(
                /* webpackChunkName: "doct" */ "../views/Doctor/doctors.vue"
              ),
          },
        ],
      },

      // 用户管理
      {
        path: "usercontrol",
        name: "usercontrol",
        meta: {
          title: "用户管理",
          Breadcrumb: ["用户管理"],
        },
        component: () =>
          import(/* webpackChunkName: "userpage" */ "../views/User/User"),
      },
      // 主页内容管理
      {
        path: "/",
        children: [
          //轮播图管理
          {
            path: "lbt",
            name: "lbt",
            meta: {
              title: "轮播图管理",
              Breadcrumb: ["主页内容管理", "轮播图管理"],
            },
            component: () =>
              import(
                /* webpackChunkName: "lbt" */
                "../views/Index_content/lbt/LbtManage"
              ),
          },
          //轮播图编辑
          {
            path: "lbtedit/:id",
            name: "lbtedit",
            meta: {
              title: "轮播图管理",
              Breadcrumb: ["主页内容管理", "轮播图管理"],
            },
            component: () =>
              import(
                /* webpackChunkName: "lbt" */
                "../views/Index_content/lbt/LbtAdd"
              ),
          },
          // //轮播图添加
          {
            path: "lbtadd",
            name: "lbtadd",
            meta: {
              title: "轮播图管理",
              Breadcrumb: ["主页内容管理", "轮播图管理"],
            },
            component: () =>
              import(
                /* webpackChunkName: "lbt" */
                "../views/Index_content/lbt/LbtAdd"
              ),
          },
          {
            path: "dynamic",
            name: "dynamic",
            meta: {
              title: "动态管理",
              Breadcrumb: ["主页内容管理", "动态管理"],
            },
            component: () =>
              import(
                /* webpackChunkName: "dynamic" */
                "../views/Index_content/dynamic/Dynamic"
              ),
          },
          //主页菜单管理
          {
            path: "indexmenu",
            name: "indexmenu",
            meta: {
              title: "主页菜单管理",
              Breadcrumb: ["主页内容管理", "主页菜单管理"],
            },
            component: () =>
              import(
                /* webpackChunkName: "indexMenu" */
                "../views/Index_content/indexMenu/indexMenu"
              ),
          },
          //集团管理
          {
            path: "groups",
            name: "groups",
            meta: {
              title: "集团管理",
              Breadcrumb: ["主页内容管理", "集团管理"],
            },
            component: () =>
              import(
                /* webpackChunkName: "group" */
                "../views/Index_content/group/Group.vue"
              ),
          },
          //合作单位管理
          {
            path: "cooperation",
            name: "cooperation",
            meta: {
              title: "集团管理",
              Breadcrumb: ["主页内容管理", "合作单位管理"],
            },
            component: () =>
              import(
                /* webpackChunkName: "cooperation" */
                "../views/Index_content/cooperation/Cooperation"
              ),
          },
          //查看用户信息
          {
            path: "/usercontent/:id",
            name: "usercontent",
            meta: {
              title: "用户详情",
              Breadcrumb: ["用户详情"],
            },
            component: () =>
              import(
                /* webpackChunkName: "userpage" */ "../views/User/UserMain"
              ),
          },
          
        ],
      },
      {
				path:'/profile/:id',
				name:'profile',
				meta: {
					title: "个人中心",
					Breadcrumb: ["个人中心"]
				},
				component: () => import( /* webpackChunkName: "profile" */ "../views/Profile"),

			},
			{
				path:'/updatePassword/:id',
				name:'updatePassword',
				meta: {
					title: "修改密码",
					Breadcrumb: ["修改密码"]
				},
				component: () => import( /* webpackChunkName: "updatePassword" */ "../views/UpdatePassword"),

			},
      // 404页面
      {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        meta: {
          name: "404",
          Breadcrumb: ["404"],
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Aside/NotFound.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    // 这将为这条路由生成一个单独的chunk (about.[hash].js)
    // 路由懒加载.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//导航前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  const isLogin = store.state.userStore.isLogin;
  if (to.name !== "login" && !isLogin) {
    // 取消本次导航
    // return false;
    // 返回到登录页
    next({
      name: "login",
    });
  } else {
    next();
  }
});

// 导航后置守卫
router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
});

export default router;
