import {createRouter, createWebHistory} from 'vue-router';

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

export default router;