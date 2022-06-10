import { createStore } from 'redux'
import { userReducer } from './tokens/useReducer'

const store = createStore(userReducer);

export default store;