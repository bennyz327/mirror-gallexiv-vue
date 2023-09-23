import {createRouter, createWebHistory} from 'vue-router';
import {useUserStore} from "@/store/userStore";

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
        path: '/user/:userId',
        name: 'UserPagePath',
        component: () => import("../views/UserPersonalPage.vue"),
        props: (route) => ({ params: route.params.userid })
    },
    {
        path: '/user',
        name: 'UserPage',
        component: () => import("../views/UserPersonalPage.vue"),
        props: (route) => ({ params: route.params.userid })
    },
    {
        path: '/post/:postId',
        name: 'PostViewPagePath',
        component: () => import("../views/PostViewPage.vue"),
        props: (route) => ({ params: route.params.postId })
    },
    {
        path: '/post/',
        name: 'PostViewPage',
        component: () => import("../views/PostViewPage.vue"),
        props: (route) => ({ query: route.query.postId })
    },
    {
        path: '/post/edit',
        name: 'PostEditPage',
        component: () => import("../views/PostEditPage.vue"),
        props: (route) => ({ query: route.query.postId })
    },
    {
        path: '/post/create',
        name: 'PostCreatePage',
        component: () => import("../views/PostCreatePage.vue"),
    },
    // {
    //     path: '/tags/',
    //     name: 'TagsSearchPage',
    //     component: () => import("../views/TagSearch.vue"),
    // },
    {
        path: '/search/user',
        name: 'UserSearchPage',
        component: () => import("../views/UserSearchPage.vue"),
        props: (route) => ({ userName: route.query.userName || '' })
    },
    {
        path: '/search/post',
        name: 'PostSearchPage',
        component: () => import("../views/PostSearchPage.vue"),
        props: (route) => ({ postTitle: route.query.postTitle || '' })
    },
    {
        path: '/search/tag',
        name: 'TagSearchPage',
        component: () => import("../views/TagSearchPage.vue"),
        props: (route) => ({ tagName: route.query.tagName || '' })
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
        props: (route) => ({ query: route.query.planId })
    },
    {
        path: '/subscribe/order/:planId',
        name: 'OrderPage',
        component: () => import("../views/OrderPage.vue"),
        props: (route) => ({ params: route.params.planId })
    },
    {
        path: '/setting',
        name: 'SettingPage',
        component: () => import("../views/UserSettingPage.vue"),
    },
    {
        path: '/user/collect',
        name: 'UserCollectAndFollowPage',
        component: () => import("../views/UserCollectPage.vue"),
        props: (route) => route.query
    },
    {
        path: '/user/order',
        name: 'UserIsOrderPage',
        component: () => import("../views/UserIsOrderPage.vue"),
        props: (route) => route.query
    },
    {
        path: '/backend',
        name: 'BackEndPage',
        component: () => import("../views/BackEndPage.vue"),
    },
    {
        path: '/testpage',
        name: 'Testpage',
        component: () => import("../views/OrderPage.vue"),
    },
    {
        path: '/testconfig',
        name: 'Testconfig',
        component: () => import("../components/NeverUsed/TestConfig.vue"),
    },
    {
        path: '/search/post',
        name: 'PostSearchPage',
        component: () => import("../views/PostSearchPage.vue"),
        props: (route) => ({ postTitle: route.query.postTitle || '' })
    },
    {
        path: '/search/tag',
        name: 'TagsSearchPage',
        component: () => import("../views/TagSearchPage.vue"),
        props: (route) => ({ tagName: route.query.tagName || '' })
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
        path: '/401',
        name: '401',
        component: () => import("@/components/Page401.vue"),
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

    // 每次路由切換時就重新加載
    const store = useUserStore();

    //如果路徑開頭是/200 就擷取後面token的參數放到localStorage
    // if (to.path.startsWith('/200')) {
    //     localStorage.setItem('token', to.query.token);
    //     localStorage.setItem('username', to.query.username);
    // }

    //如果原始路徑是login 且目標路徑是200
    if (to.path.startsWith('/200')) {
        //google OAuth登入 成功 的情況
        if (to.query.token !== undefined) {
            localStorage.setItem('token', to.query.token);
            localStorage.setItem('username', to.query.username);
        }
        //一般登入 成功 的情況
        if (to.query.formLogin === true) {
        }
    }
    if (to.path.startsWith('/401')) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    //最後若本地有登入資料就將資料放到store，並將isLogin設為true
    store.token = localStorage.getItem('token');
    store.name = localStorage.getItem('username');
    if (store.token !== null) {
        store.isLogin = true
    }

    if(store.isLogin === false){
        if (to.path.startsWith('/setting')){
            router.push('/')
        }
        if(to.path.match('/user')){

        }
    }

    next()
})

export default router;

