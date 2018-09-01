const AsyncAction = (
    type,
    promise,
    successCallback = () => {},
    failureCallBack = () => {}
) => dispatch =>{
    dispatch({ type: `${type}_PENDING`});
    return promise
        .then((response) => {
            dispatch({ type: `${type}_FULFILLED`, payload: response.data});
            successCallback(response.data, dispatch);
            return response.data;
        })
        .catch((err) => {
            console.log(err.response.data);
            dispatch({
                type: `${type}_REJECTED`,
                error: true,
                payload: err.response.data,
            });
            failureCallBack(err.response.data, dispatch);
            return err;
        })
};

export default AsyncAction;
