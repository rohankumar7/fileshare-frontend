
import axios from 'axios'
import { AUTHENTICATE, CURRENT_USER } from '../constants'
import { loading } from '../actions/loading'
import { loadMyFileAction } from './files'
const appBaseUrl = 'https://file-share-mern.herokuapp.com'

export const currentUser = (payload) => ({
    type: CURRENT_USER,
    payload
})
export const authenticate = (payload) => ({
    type: AUTHENTICATE,
    payload
})


export const register = user => (dispatch) =>
    new Promise(async (resolve, reject) => {
        try {
            dispatch(loading(true))
            const response = await axios.post(`${appBaseUrl}/auth/register`, user)
            dispatch(loading(false))
            resolve(response.data.message)
        } catch (error) {
            reject(error)
        }
    })

export const login = user => (dispatch) =>
    new Promise(async (resolve, reject) => {
        try {
            dispatch(loading(true))
            const response = await axios.post(`${appBaseUrl}/auth/login`, user)
            const { data } = response
            dispatch(currentUser(data.data))
            dispatch(authenticate(true))
            localStorage.setItem('access_token', data.accessToken)
            localStorage.setItem('refresh_token', data.refreshToken)
            dispatch(loadMyFileAction())
            dispatch(loading(false))
            resolve(response.status)
        } catch (error) {
            reject(error.response.data)
        }
    })

    export const googleLogin = user => (dispatch) =>
    new Promise(async (resolve, reject) => {
        try {
            dispatch(loading(true))
            const response = await axios.post(`${appBaseUrl}/auth/google`, user)
            const { data } = response
            dispatch(currentUser(data.data))
            dispatch(authenticate(true))
            localStorage.setItem('access_token', data.accessToken)
            localStorage.setItem('refresh_token', data.refreshToken)
            dispatch(loadMyFileAction())
            dispatch(loading(false))
            resolve(response.status)
        } catch (error) {
            reject(error.response.data)
        }
    })

export const logout = () => (dispatch) =>
    new Promise((resolve, reject) => {
        const refreshToken = localStorage.getItem('refresh_token')
        axios.post(`${appBaseUrl}/auth/logout`, { refreshToken })
            .then(response => {
                console.log(response.data)
                dispatch({ type: 'LOGOUT' })
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                resolve(true)
            })
            .catch(error => {
                resolve(false)
                console.log(error.config)
            })
    })
