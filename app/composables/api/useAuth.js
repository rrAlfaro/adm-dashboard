import { useAPI } from "./useAPI"

export const useAuth = () => {
    const token = useCookie('token:e-tech')

    const login = async (form) => {
        const { data, error } = await useAPI('auth/login', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: form
        })

        if (data?.data?.access_token) token.value = data?.data?.access_token

        return { data, error }
    }

    return { token, login }
}