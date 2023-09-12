import {createRouter, createWebHistory} from 'vue-router';

const component404 = import('@/components/Page404.vue')

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import("../views/Homepage.vue"),
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: () => import("../views/LoginAndRegisterPage.vue"),
    },
    {
        path: '/user',
        name: 'UserPage',
        component: () => import("../views/UserPersonalPage.vue"),
    },
    {
        path: '/post/',
        name: 'PostViewPage',
        component: () => import("../views/PostViewPage.vue"),
    },
    {
        path: '/post/edit',
        name: 'PostEditPage',
        component: () => import("../views/PostEditPage.vue"),
    },
    {
        path: '/post/create',
        name: 'PostCreatePage',
        component: () => import("../views/PostCreatePage.vue"),
    },
    {
        path: '/tags/',
        name: 'TagsSearchPage',
        component: () => import("../views/TagSearch.vue"),
    },
    {
        path: '/search/follower/',
        name: 'UserSearchPage',
        component: () => import("../views/CreatorSearchPage.vue"),
    },
    {
        path: '/subscribe/create',
        name: 'PlanCreatePage',
        component: () => import("../views/PlanCreatePage.vue"),
    },
    {
        path: '/subscribe/edit',
        name: 'EditPlanPage',
        component: () => import("../views/PlanEditPage.vue"),
    },
    {
        path: '/setting',
        name: 'SettingPage',
        component: () => import("../views/UserSettingPage.vue"),
    },
    {
        path: '/backend',
        name: 'BackEndPage',
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
    next()
})

export default router;

