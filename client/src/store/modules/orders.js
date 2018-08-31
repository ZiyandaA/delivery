import axios from 'axios';

const CREATE_ORDER_PENDING = 'CREATE_ORDER_PENDING';
const CREATE_ORDER_FULFILLED = 'CREATE_ORDER_FULFILLED';
const CREATE_ORDER_REJECTED = 'CREATE_ORDER_REJECTED';

export const createOrderAction = (order) => {
    return async dispatch => {
        dispatch({ type: CREATE_ORDER_PENDING });

        try {
            const response = await axios.post("/orders", { order });
            dispatch({
                type: CREATE_ORDER_FULFILLED,
                payload: response.data.order
            });
            return Promise.resolve(response.data.order);
        } catch (e) {
            dispatch({ type: CREATE_ORDER_REJECTED });
        }
    }
};

export function ordersReducer(state= {
    detail: {},
    list: [],
    isLoadingDetail: false,
}, action) {
    switch (action.type) {
        case CREATE_ORDER_PENDING:
            return {...state, isLoadingDetail: true };
        case CREATE_ORDER_REJECTED:
            return {...state, isLoadingDetail: false };
        case CREATE_ORDER_FULFILLED: {
            return {
                ...state,
                detail: action.payload,
                isLoadingDetail: false
            }
        }
        default: return state;
    }
}


