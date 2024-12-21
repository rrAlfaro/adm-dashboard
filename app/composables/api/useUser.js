import { useAPI } from "./useAPI"
import { useAuth } from "./useAuth"


export const useUser = () => {
    const endpoint = 'users'
    const { token } = useAuth()

    const options = (method, auth, body = null) => {
        return {
            headers: {
                Accept: 'application/json',
                Authorization: auth ? `Bearer ${token.value}` : '',
                'Content-Type': 'application/json'
            },
            method: method,
            body: body
        }
    }

    const getUsers = async () => await useAPI(endpoint, options('GET', true))
    const createUser = async (form) => await useAPI(endpoint, options('POST', true, form))

    return { getUsers, createUser }

}