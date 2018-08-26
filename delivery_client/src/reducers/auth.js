import * as constants from '../constants/actions';


function authReducer(state={
    loggedIn: false
}, action) {
    switch (action.type) {
        case constants.LOGIN_CHANGE: {
            return {
                ...state,
                loggedIn: !state.loggedIn
            }
        }
        default: return state;
    }
}




let a = 1
let b = 2
let c = 3

function someFunc(value) {
    // if (value === a) {
    //     //do something
    // }
    // else if (value === b) {

    // }
    switch (value) {
        case a: {
            //do smth
        }
        case b: {

        }
        case c: {

        }
    }
}


export default authReducer;