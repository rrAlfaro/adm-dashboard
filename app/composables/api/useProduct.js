import { useAPI } from "./useAPI"
import { useAuth } from "./useAuth"

export const useProduct = () => {
    const endpoint = 'products'
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

    const getProducts = async () => await useAPI(endpoint, options('GET', true))
    const createProduct = async (form) => await useAPI(endpoint, options('POST', true, form))

    return { getProducts, createProduct }
}