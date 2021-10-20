import { LOAD_SHARED_FILES, SHARE_WITH_LINK, DELETE_SHARED } from '../constants'

const initialState = []

const sharedWithMeReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case LOAD_SHARED_FILES : {
            return payload
        }
        case SHARE_WITH_LINK : {
            const { file } = payload
            return [file, ...state]
        }
        case DELETE_SHARED : {
            const { fileID } = payload
            const files = state.filter(file => file._id !== fileID)
            return files
        }
        default : return state
    }
}

export default sharedWithMeReducer