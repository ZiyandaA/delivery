import * as constants from '../constants/actions';


function orderReducer(state={
    orderInfo: {}

}, action) {
    console.log(action, 'this is action')
    switch (action.type) {
        
        case constants.ORDER_CREATED_SUCCESS: {
            return {
                ...state,
                orderInfo: action.payload
            }
        }
        default: return state;
    }
}


export default orderReducer;
