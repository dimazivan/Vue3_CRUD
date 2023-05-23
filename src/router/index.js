//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () =>
            import( /* webpackChunkName: "Auth" */ "../frontend/home.vue"),
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import( /* webpackChunkName: "Auth" */ "../frontend/auth/login.vue"),
    },
    {
        path: '/dashboard',
        name: 'dashboard.index',
        component: () =>
            import( /* webpackChunkName: "Auth" */ "../frontend/dashboard/index.vue"),
    },
    {
        path: '/product',
        name: 'product.index',
        component: () => import( /* webpackChunkName: "index" */ '../frontend/product/index.vue')
    },
    {
        path: '/create',
        name: 'product.create',
        component: () => import( /* webpackChunkName: "create" */ '../frontend/product/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'product.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../frontend/product/edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router