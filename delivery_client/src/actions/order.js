import * as constats from '../constants/actions';
import axios from 'axios';

export function changeLoginStatus() {
    return {
        type: constats.LOGIN_CHANGE
    }
}


export function createOrder(orderInfo) {
    return dispatch => {
        return axios.post("/orders", {} )
        .then(data => {
            const orderInformation = data.data;
            dispatch({
                type: constats.ORDER_CREATED_SUCCESS,
                payload: orderInformation
            })
            
            console.log(data)
        })
        .catch(err => {
            //do something with error. Show it or something
        })
    }
}