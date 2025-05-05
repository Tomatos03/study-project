import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const whiteList: string[] = ['/login']
router.beforeEach((to, from) => {
    if (whiteList.includes(to.path)) {
        return
    }

    return {
        name: 'Login',
        query: { redirect: to.fullPath },
    }
})

export default router
