export const LOGIN_CHANGE  = 'LOGIN_CHANGE';

export function loginAction() {
    return {
        type: LOGIN_CHANGE
    }
}

export function authReducer(state={
    loggedIn: false
}, action) {
    switch (action.type) {
        case LOGIN_CHANGE: {
            return {
                ...state,
                loggedIn: !state.loggedIn
            }
        }
        default: return state;
    }
}
