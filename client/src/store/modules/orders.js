import axios from 'axios';

import asyncAction from './asyncAction';

const FETCH_ORDER = 'order/FETCH';
const CREATE_ORDER = 'order/CREATE';
const DELETE_ORDER = 'order/DELETE';
const CONFIRM_ORDER = 'order/CONFIRM';
const UPDATE_ORDER = 'order/UPDATE';
const FETCH_ORDERS = 'orders/FETCH';

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

export const getOrdersAction = () => {
    return asyncAction(
        FETCH_ORDERS,
        axios.get(`http://localhost:3000/orders`)
    )
};

export const updateOrderAction = (id, order) => asyncAction(
    UPDATE_ORDER,
    axios.put(`http://localhost:3000/orders/${id}`, { order })
);

export const deleteOrderAction = (id) => {
    return asyncAction(
        DELETE_ORDER,
        axios.delete(`http://localhost:3000/orders/${id}`),
        (res) => {
            alert(res.message);
        },
        err => alert(err.message)
    )
};

export const confirmOrderAction = (email, id) => asyncAction(
    CONFIRM_ORDER,
    axios.put(`http://localhost:3000/orders/${id}/confirm`, {
        email
    }),
    (res) => {
        alert(res.message);
    },
    err => alert(err.message)
);

export function ordersReducer(state= {
    detail: {},
    list: [],
    isLoadingList: false,
    isLoadingDetail: false,
    loadingDetailError: '',
}, action) {
    switch (action.type) {
        case `${CONFIRM_ORDER}_PENDING`:
        case `${CREATE_ORDER}_PENDING`:
        case `${FETCH_ORDER}_PENDING`:
        case `${DELETE_ORDER}_PENDING`:
        case `${UPDATE_ORDER}_PENDING`:
            return {...state, isLoadingDetail: true };
        case `${FETCH_ORDERS}_PENDING`:
            return {...state, isLoadingList: true };
        case `${FETCH_ORDERS}_FULFILLED`:
            return {
                ...state,
                isLoadingList: false,
                list: action.payload.orders,
            };
        case `${FETCH_ORDERS}_REJECTED`:
            return { ...state, isLoadingList: false };
        case `${FETCH_ORDER}_REJECTED`:
            return {
                ...state,
                isLoadingDetail: false,
                loadingDetailError: action.payload.message
            };
        case `${UPDATE_ORDER}_REJECTED`:
        case `${CONFIRM_ORDER}_REJECTED`:
        case `${CREATE_ORDER}_REJECTED`:
            return {...state, isLoadingDetail: false };
        case `${DELETE_ORDER}_FULFILLED`:
            return {
                ...state,
                detail: {},
                isLoadingDetail: false
            };
        case `${CONFIRM_ORDER}_FULFILLED`:
        case `${UPDATE_ORDER}_FULFILLED`:
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


