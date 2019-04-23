export const actionTypes = {
    SET_MESSAGE: 'SET_MESSAGE'
};

export const setMessage = (message) => {
    return (dispatch, getState, next) => {
        dispatch({
            type: actionTypes.SET_MESSAGE,
            message: message
        });
    };
};
