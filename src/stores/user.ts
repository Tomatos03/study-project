import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface UserState {
    isAuth: boolean
}

export const useUserStore = defineStore('user', () => {
    // state
    const isAuth = ref(false)
    // getters
    const isLogin = computed(() => {
        return isAuth.value
    })
    // actions
    const setAuth = (auth: boolean) => {
        isAuth.value = auth
    }
    return { isAuth, isLogin, setAuth }
})
