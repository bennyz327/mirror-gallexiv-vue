import {createRouter, createWebHistory} from 'vue-router';

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;