import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../pages/MainPage.vue'),
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../pages/SearchPage.vue'),
    },
    {
        path: '/movie/:id',
        name: 'MovieDetail',
        component: () => import('../pages/MovieInfo.vue'),
    },
    {
        path: '/addMovie',
        name: 'AddMovie',
        component: () => import('../pages/AddMovie.vue'),
    },
    {
        path: '/usermanage',
        name: 'UserManage',
        component: () => import('../pages/UserManage.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
