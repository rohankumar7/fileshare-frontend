import { AUTHENTICATE } from '../constants'

const initialState = false

const isAuthenticatedReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case AUTHENTICATE : {
            return payload
        }
        default :
            return state
    }
}

export default isAuthenticatedReducer