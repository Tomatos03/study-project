import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MyView from '@/views/MyView.vue'
import { useUserStore } from '@/stores/user'

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
    {
        path: '/home',
        name: 'Home',
        component: MyView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const whiteList: string[] = ['/login']
router.beforeEach((to, from) => {
    const userStore = useUserStore()
    if (whiteList.includes(to.path) || userStore.isLogin) {
        return
    }

    return {
        name: 'Login',
        query: { redirect: to.fullPath },
    }
})

export default router
