// import Home from "../views/Homepage.vue";
import { createRouter, createWebHistory } from 'vue-router';
import Homepage from "../views/Homepage.vue";
import PostViewPage from "../views/PostViewPage.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Homepage
    },
    {
        path: '/Post/1',
        name: 'Post',
        component: PostViewPage
    },
    // {
    //     path: '/market',
    //     name: 'Market',
    //     component: () => import('./views/Market.vue')
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;