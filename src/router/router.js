// import Home from "../views/Homepage.vue";
import { createRouter, createWebHistory } from 'vue-router';
import Homepage from "../views/Homepage.vue";
import PostViewPage from "../views/PostViewPage.vue";
import HomepageTest from "../views/HomepageTest.vue";
import TagSearch from "../views/TagSearch.vue";

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
    {
        path: '/Tags/{id}',
        name: 'Tags',
        component: TagSearch,
    },
    {
        path: '/Post/Test',
        name: 'PostTest',
        component: HomepageTest
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