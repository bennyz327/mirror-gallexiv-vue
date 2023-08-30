import {createRouter, createWebHistory} from 'vue-router';
// import Homepage from "../views/Homepage.vue";
// import HomepageTest from "../views/HomepageTest.vue";
// import TagSearch from "../views/TagSearch.vue";
// import RegisterPage from "../views/LoginAndRegisterPage.vue";
// import TestPage from "../views/TestPage.vue";
// import PostViewPage from "../views/PostViewPage.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;