import { CHANGE_ACCESS, DELETE, DESCRIPTION, LOAD_MY_FILES, LOAD_SHARED_FILES, RENAME, STARRED, SHARE_WITH_LINK, DELETE_SHARED } from '../constants'
import { loading } from '../actions/loading'
import axiosInstance from '../../axios/axios'

export const loadMyFiles = (payload) => ({
    type: LOAD_MY_FILES,
    payload
})

export const loadSharedFiles = (payload) => ({
    type: LOAD_SHARED_FILES,
    payload
})

export const rename = (newFile, fileID) => ({
    type: RENAME,
    payload: { newFile, fileID }
})

export const del = (fileID) => ({
    type: DELETE,
    payload: { fileID }
})

export const starredAction = (fileID) => ({
    type: STARRED,
    payload: { fileID }
})

export const changeAccess = (fileID, access) => ({
    type: CHANGE_ACCESS,
    payload: { fileID, access }
})

export const description = (fileID, desc) => ({
    type: DESCRIPTION,
    payload: { fileID, desc }
})

export const shareLink = (fileID, file) => ({
    type: SHARE_WITH_LINK,
    payload: { fileID, file }
})

export const deleteShared = (fileID) => ({
    type: DELETE_SHARED,
    payload: { fileID }
})


export const loadMyFileAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch(loading(true))
        axiosInstance.get('/files/my-files')
            .then(response => {
                dispatch(loadMyFiles(response.data))
                dispatch(loading(false))
                resolve()
            }).catch(error => reject(error.response.data))
    })

export const loadSharedFileAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch(loading(true))
        axiosInstance.get('/files/shared-with-me')
            .then(response => {
                const files = response.data.map(file => ({ ...file, shared: true }))
                dispatch(loadSharedFiles(files))
                dispatch(loading(false))
                resolve()
            })
            .catch(error => reject(error.response.data))
    })

export const renameFileAction = (newName, fileID) => dispatch =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.put(`/files/rename/${fileID}`, { fileName: newName })
            if (response.status === 200) {
                const newFile = response.data
                dispatch(rename(newFile, fileID))
                resolve('name changed!')
            }
        } catch (error) {
            reject(error.response.data)
        }
    })

export const changeAccessAction = (fileID, access) => dispatch =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.put(`/files/change-access/${fileID}`, { access })

            if (response.status === 200) {
                dispatch(changeAccess(fileID, access))
                resolve('access changed!')
            }
        } catch (error) {
            reject(error.response.data)
        }
    })

export const descFileAction = (fileID, desc) => dispatch =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.put(`files/description/${fileID}`, { description: desc })
            if (response.status === 200) {
                dispatch(description(fileID, desc))
                resolve('file description changed!')
            }
        } catch (error) {
            reject(error.response.data)
        }
    })

export const deleteFileAction = (fileID) => dispatch =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.delete(`files/delete/${fileID}`)
            if (response.status === 200) {
                dispatch(del(fileID))
                resolve('file deleted!')
            }
        } catch (error) {
            reject(error.response.data)
        }
    })

export const deleteSharedFileAction = (fileID) => dispatch =>
    new Promise((resolve, reject) => {
        axiosInstance.delete(`files/delete-shared-file/${fileID}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch(deleteShared(fileID))
                    resolve('shared file deleted!')
                }
            })
            .catch(error => reject(error.response.data))
    })

export const addToStarredAction = (fileID, starred) => dispatch =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.put(`files/change-starred/${fileID}`)
            if (response.status === 200) {
                dispatch(starredAction(fileID))
                if (starred === false)
                    resolve('file moved to starred!')
                else
                    resolve('file moved to my files!')
            }

        } catch (error) {
            reject(error.response.data)
        }
    })

export const downloadFileAction = (fileID) => dispatch =>
    new Promise((resolve, reject) => {
        axiosInstance.get(`files/download-request/${fileID}`)
            .then(response => {
                if (response.status === 200) {
                    axiosInstance.get(`files/download/${fileID}`, {
                        responseType: 'blob'
                    })
                        .then(response => {
                            resolve(response.data)
                        })
                }
            })
            .catch(error => reject(error.response.data))
    })

export const shareLinkAction = (fileID) => dispatch =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.get(`files/share-with-link/${fileID}`)
            if (response.status === 200) {
                const file = response.data
                dispatch(shareLink(fileID, file))
                resolve(true)
            }
        } catch (error) {
            reject(error.response.data)
        }
    })