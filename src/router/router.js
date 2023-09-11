import {createRouter, createWebHistory} from 'vue-router';
import {useUserStore} from "@/store/userStore";

const component404 = import('@/components/Page404.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../views/Homepage.vue"),
    },
    {
        path: '/tags/{id}',
        name: 'Tags',
        component: () => import("../views/TagSearch.vue"),
    },
    {
        path: '/postviewpage',
        name: 'PostView',
        component: () => import("../views/PostViewPage.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/LoginAndRegisterPage.vue"),
    },
    {
        path: '/userpage',
        name: 'Userpage',
        component: () => import("../views/UserPersonalPage.vue"),
    },
    {
        path: '/search/follower',
        name: 'FollowerSearch',
        component: () => import("../views/CreatorSearchPage.vue"),
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import("../views/UserSettingPage.vue"),
    },
    {
        path: '/post/create',
        name: 'PostCreate',
        component: () => import("../views/PostCreatePage.vue"),
    },
    {
        path: '/post/edit',
        name: 'PostEdit',
        component: () => import("../views/PostEditPage.vue"),
    },
    {
        path: '/subscribe/create',
        name: 'CreatePlanPage',
        component: () => import("../views/PlanCreatePage.vue"),
    },
    {
        path: '/subscribe/edit',
        name: 'EditPlanPage',
        component: () => import("../views/PlanEditPage.vue"),
    },
    {
        path: '/backend',
        name: 'Backend',
        component: () => import("../views/BackEndPage.vue"),
    },
    {
        path: '/testpage',
        name: 'Testpage',
        component: () => import("../views/TestPage.vue"),
    },
    {
        path: '/testconfig',
        name: 'Testconfig',
        component: () => import("../views/TestConfig.vue"),
    },
    //訊息頁面
    {
        path: '/200',
        name: '200',
        component: () => import("@/components/Page200.vue"),
    },
    //找不到頁面處理
    {
        path: '/404',
        name: '404',
        component: () => component404,
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // 每次路由切換時就重新加載javascript
    const store = useUserStore();
    //如果路徑開頭是/200 就擷取後面token的參數放到localStorage
    if (to.path.startsWith('/200')) {
        localStorage.setItem('token', to.query.token);
    }

    store.token = localStorage.getItem('token');
    next()
})

export default router;

