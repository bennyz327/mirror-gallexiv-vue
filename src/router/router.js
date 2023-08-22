import { createRouter, createWebHistory } from 'vue-router';
import Homepage from "../views/Homepage.vue";
import PostViewPage from "../views/PostViewPage.vue";
import HomepageTest from "../views/HomepageTest.vue";
import TagSearch from "../views/TagSearch.vue";
import RegisterPage from "../views/RegisterPage.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Homepage,
        meta:{
            keepNavbar:true
        }
    },
    {
        path: '/post/1',
        name: 'Post',
        component: PostViewPage,
        meta:{
            keepNavbar:true
        }
    },
    {
        path: '/tags/{id}',
        name: 'Tags',
        component: TagSearch,
        meta:{
            keepNavbar:true
        }
    },
    {
        path: '/post/test',
        name: 'PostTest',
        component: HomepageTest,
        meta:{
            keepNavbar:true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta:{
            keepNavbar:false
        }
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