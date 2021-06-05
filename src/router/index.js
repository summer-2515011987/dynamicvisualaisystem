import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/layout'
// import login from "@/views/login";
Vue.use(VueRouter);
// 静态
export const constantRoutes = [

    // {
    //     // 重定向
    //     path: '/',
    //     redirect: '/login'
    // },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/login") //路由懒加载
    },
    {
        path: "/404",

        component: () =>
            import ("@/views/404") //路由懒加载
    },

    {
        path: "/",
        // hidden: true,判断路由入口是否可见的开关
        component: Layout,
        redirect: "/dashboard",
        children: [{
            path: "dashboard",
            name: "Dashboard",
            component: () =>
                import ("@/layout/components/Sidebar"),
            meta: {
                title: "Dashboard",
                icon: "dashboard"
            }
        }]

    },
    {
        path: "/404",
        name: "404",
        component: () =>
            import ("@/views/404")
    },
];

export const asyncRoutes = [

    {
        path: "*",
        redirect: "/404",
        hidden: true
    }
]

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};


const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router;