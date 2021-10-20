import { combineReducers } from 'redux'

import currentUserReducer from '../reducers/currentUserReducer'
import loadingReducer from '../reducers/loadingReducer'
import myFilesReducer from '../reducers/myFilesReducer'
import sharedWithMeReducer from '../reducers/sharedWithMeReducer'
import isAuthenticatedReducer from '../reducers/isAuthenticatedReducer'

const appReducer = combineReducers({
    isAuthenticated : isAuthenticatedReducer,
    currentUser : currentUserReducer,
    myFiles : myFilesReducer,
    sharedWithMe : sharedWithMeReducer,
    loading : loadingReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
  }

export default rootReducer