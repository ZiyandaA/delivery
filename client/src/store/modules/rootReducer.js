import { combineReducers } from 'redux';

import { ordersReducer } from './orders';
import { authReducer } from './auth';

const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
});

export default rootReducer;
