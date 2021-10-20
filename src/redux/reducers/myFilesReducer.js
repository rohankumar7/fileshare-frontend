import { ADD_FILE, CHANGE_ACCESS, DELETE, DESCRIPTION, LOAD_MY_FILES, RENAME, STARRED } from '../constants'

const initialState = []

const myFilesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_MY_FILES: {
            return payload
        }
        case RENAME: {
            const { newFile, fileID } = payload
            const files = state.map(file => file._id === fileID ? newFile : file)
            return files
        }
        case ADD_FILE : {
            const { newFile } = payload
            return [newFile, ...state]
        }
        case STARRED: {
            const { fileID } = payload
            const newFile = state.find(file => file._id === fileID)
            newFile.starred = !newFile.starred
            const files = state.map(file => file._id === fileID ? newFile : file)
            return files
        }
        case DESCRIPTION : {
            const { fileID, desc} = payload
            const newFile = state.find(file => file._id === fileID)
            newFile.description = desc
            const files = state.map(file => file._id === fileID ? newFile : file)
            return files
        }
        case CHANGE_ACCESS : {
            const { fileID, access} = payload
            const newFile = state.find(file => file._id === fileID)
            newFile.access = access
            const files = state.map(file => file._id === fileID ? newFile : file)
            return files
        }
        case DELETE: {
            const { fileID } = payload
            const files = state.filter(file => file._id !== fileID)
            return files
        }
        default: return state
    }
}

export default myFilesReducer