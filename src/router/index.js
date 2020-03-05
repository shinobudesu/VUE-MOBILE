import Vue from "vue"
import Router from "vue-router"
import store from "@/store/index.js"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout/index.vue'
Vue.use(Router);
/** 
 * 提示函数 
 * 显示2秒后关闭
 */
const tip = msg => {
};
const router = new Router({
    routes: [{
        path: "/",
        name: "home",
        component: Layout,
        meta: {
            title: '首页',
        },
        children: [{
            path: "table2/:id",
            name: "指数企业领导班子个人综合考核测评",
            meta: {
                title: '指数企业领导班子个人综合考核测评',
                desc: '备注：请您在各指标中认为被测评人符合的“优秀” “称职” “基本称职” “不称职”中选择，多选无效',
                index: 0,
                isD: true
            },
            component: () =>
                import("@/views/table2/index.vue"),
        }, {
            path: "table1/:id",
            name: "领导班子综合考核测评",
            meta: {
                title: '领导班子综合考核测评',
                desc: '备注：请您在各指标中认为被测评人符合的一项中选择，多选无效',
                index: 0,
                isD: true
            },
            component: () =>
                import("@/views/table1/index.vue"),
        }]
    }, {
        path: "*",
        name: "404",
        component: () =>
            import('@/views/404/index.vue')
    },]
});
// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({
    ease: 'ease',
    speed: 500,
    showSpinner: false
});
NProgress.inc(0.2);
// 全局路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
    // NProgress开始进度条
    NProgress.start();
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});
// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
    // NProgress结束进度条
    NProgress.done();
});


// requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
export default router;