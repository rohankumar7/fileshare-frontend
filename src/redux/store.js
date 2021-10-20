import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('fileshareState', serializedState)
    } catch (error) {
        console.log(error)
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('fileshareState')
        if (serializedState === null)
            return undefined
        return JSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store