import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";


const routes = [
    { path:'/', name: 'Home', component: Home},
    { path: '/dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue')}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router