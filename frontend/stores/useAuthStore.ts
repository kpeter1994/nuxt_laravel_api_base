import { defineStore } from 'pinia'

type User = {
    id: number
    name: string
    email: string
}

type Credentials = {
    email: string
    password: string
}

type RegistrationInfo = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export const useAuthStore = defineStore('auth', () => {

    const user = ref<User | null>(null)

    const isLoggedIn = computed(() => user.value !== null)

    const fetchUser = async function() {
        const {data, error} = await useApiFetch("/api/user")
        user.value = data.value as User
    }

    async function login(credentials: Credentials) {
        await useApiFetch("/sanctum/csrf-cookie" )

        const login =  await useApiFetch('/login', {
            method: 'post',
            body: credentials,
        })

        await fetchUser()

        return login

    }

    const logout = async () => {
        await useApiFetch('/logout', {method: 'post'})
        user.value = null
        navigateTo('/login')
    }

    const register = async (info: RegistrationInfo) => {
        await useApiFetch("/sanctum/csrf-cookie" )

        const register =  await useApiFetch('/register', {
            method: 'POST',
            body: info,
        })

        return register
    }

    return { user, login, isLoggedIn, fetchUser, logout, register }
})