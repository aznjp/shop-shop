  
import { createStore } from 'redux';
import reducer from './reducers'

// made store using the reducers to place components in the global state
const store = createStore(reducer);
export default store;