import {createRouter, createWebHistory} from 'vue-router';
// import Homepage from "../views/Homepage.vue";
// import HomepageTest from "../views/HomepageTest.vue";
// import TagSearch from "../views/TagSearch.vue";
// import RegisterPage from "../views/RegisterPage.vue";
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
        path: '/HomepageTest',
        name: 'HomepageTest',
        component: () => import("../views/HomepageTest.vue"),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("../views/RegisterPage.vue"),
    },
    {
        path: '/postViewPage',
        name: 'PostView',
        component: () => import("../views/PostViewPage.vue"),
    },
    {
        path: '/testpage',
        name: 'Testpage',
        component: () => import("../views/TestPage.vue"),
    },
    {
        path: '/testpage',
        name: 'Testpage',
        component: () => import(""),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;