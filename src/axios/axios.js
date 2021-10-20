import axios from 'axios'

const appBaseUrl = 'https://file-share-mern.herokuapp.com/'

const axiosInstance = axios.create({
    baseURL : appBaseUrl
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token')
    if(accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`
    return config
}, (error) => {
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response) => {
    return response
},(error) => {
    const originalRequest = error.config
    if(error.response.status === 401 && error.config.url === '/auth/refresh-token'){
        return Promise.reject(error)
    }
    if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true
        const refreshToken = localStorage.getItem('refresh_token')
        return axios.post(`${appBaseUrl}/auth/refresh-token`,{ refreshToken })
        .then(res => {
            localStorage.setItem('access_token',res.data.accessToken)
            localStorage.setItem('refresh_token', res.data.refreshToken)
            const accessToken = localStorage.getItem('access_token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            return axiosInstance(originalRequest)
        })
    }
    return Promise.reject(error)
})

export default axiosInstance