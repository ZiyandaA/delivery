import axios from 'axios';

import asyncAction from './asyncAction';

const FETCH_ORDER = 'order/FETCH';
const CREATE_ORDER = 'order/CREATE';
const DELETE_ORDER = 'order/DELETE';

export const createOrderAction = (order) => {
    return asyncAction(
        CREATE_ORDER,
        axios.post("/orders", { order }),
    )
};

export const getOrderAction = (id) => {
    return asyncAction(
        FETCH_ORDER,
        axios.get(`http://localhost:3000/orders/${id}`)
    )
};

export const deleteOrderAction = (id) => {
    return asyncAction(
        DELETE_ORDER,
        axios.delete(`http://localhost:3000/orders/${id}`),
        (res) => {
            // console.log(res);
            alert(res.message);
            // dispatch({ type: 'alerts/SHOW', payload: res.message })
        },
        err => alert(err.message)
    )
};

export function ordersReducer(state= {
    detail: {},
    list: [],
    isLoadingDetail: false,
    loadingDetailError: '',
}, action) {
    switch (action.type) {
        case `${CREATE_ORDER}_PENDING`:
        case `${FETCH_ORDER}_PENDING`:
        case `${DELETE_ORDER}_PENDING`:
            return {...state, isLoadingDetail: true };
        case `${FETCH_ORDER}_REJECTED`:
            console.log(action);
            return {
                ...state,
                isLoadingDetail: false,
                loadingDetailError: action.payload.message
            };
        case `${CREATE_ORDER}_REJECTED`:
            return {...state, isLoadingDetail: false };
        case `${CREATE_ORDER}_FULFILLED`:
        case `${FETCH_ORDER}_FULFILLED`:
            return {
                ...state,
                detail: action.payload.order,
                isLoadingDetail: false
            };
        default: return state;
    }
}


