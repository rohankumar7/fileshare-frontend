import { ADD_FILE, CURRENT_USER, DELETE, DELETE_SHARED, SHARE_WITH_LINK } from '../constants'

const initialState = {}

const currentUserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CURRENT_USER: {
            return payload
        }
        case ADD_FILE : {
            const { fileID } = payload
            const currentUser = state
            currentUser.files.unshift(fileID)
            return currentUser
        }
        case DELETE: {
            const { fileID } = payload
            const currentUser = state
            const newFiles = currentUser.files.filter(fileId => fileId !== fileID)
            currentUser.files = newFiles
            return currentUser
        }
        case SHARE_WITH_LINK: {
            const { fileID } = payload
            const currentUser = state
            currentUser.shared.unshift(fileID)
            console.log(currentUser)
            return currentUser
        }
        case DELETE_SHARED : {
            const { fileID } = payload
            const currentUser = state
            const newFiles = currentUser.shared.filter(fileId => fileId !== fileID)
            currentUser.shared = newFiles
            return currentUser
        }
        default:
            return state
    }
}

export default currentUserReducer