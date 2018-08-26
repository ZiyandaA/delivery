import { combineReducers } from 'redux';
import auth from './auth';
import order from './order';
export default combineReducers({
    auth,
    order
})