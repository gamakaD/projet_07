import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import store from "@/store";


const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
        beforeEnter: (to) => {
            if (store.getters['authenticated']) {
                return { name: 'welcome' }
            }
        }
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/modifyPostShow/:id',
        name: 'modifypostshow',
        component: () => import('@/views/ModifyPostShow.vue'),
        props: route => ({ ...route.params, id: Number(route.params.id) }),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/adminboard',
        name: 'adminboard',
        component: () => import('@/views/AdminBoard.vue'),
        meta: {
            requireAuth: true,
        },
        beforeEnter: (to) => {
            if (!store.getters['admin']) {
                return { name: 'welcome' }
            }
        }
    },
    {
        path: '/adminboard/:id',
        name: 'adminpostshow',
        component: () => import('@/views/AdminPostShow.vue'),
        props: route => ({ ...route.params, id: Number(route.params.id) }),
        meta: {
            requireAuth: true,
        },
        beforeEnter: (to) => {
            if (!store.getters['admin']) {
                return { name: 'welcome' }
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active-link'
})

router.beforeEach((to, from) => {
    if (to.meta.requireAuth && !store.getters['authenticated']) {
        return { name: 'login' }
    }
})

export default router