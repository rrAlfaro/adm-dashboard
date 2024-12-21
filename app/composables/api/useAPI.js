export const useAPI = async (endpoint, options = {}) => {
    const { baseURL } = useRuntimeConfig().public
    const url = `${baseURL}/api/${endpoint}`

    try {
        const data = await $fetch(url, { ...options })

        return { data, error: null }
    } catch (error) {
        return { data: null, error: error }
    }
}