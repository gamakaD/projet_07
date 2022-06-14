import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";


const routes = [
    { path:'/', name: 'Login', component: Login},
    {
        path: '/welcome', 
        name: 'welcome',
        component: () => import('@/views/Welcome.vue'),
    },
    {
        path: '/PostShow', 
        name: 'postShow',
        component: () => import('@/views/PostsShow.vue')
    },
    { 
        path: '/dashboard', 
        name: 'dashboard', 
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            requireAuth: true,
        }
    },
        
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if(to.meta.requireAuth && !sessionStorage.getItem('token')) {
        return {name: 'Login'}
    }
})

export default router