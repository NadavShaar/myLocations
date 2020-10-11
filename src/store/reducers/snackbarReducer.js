const snackbarReducer = (state={ open: false }, action) => {
    switch (action.type) {
        case 'SET_SNACKBAR_PROPS': return action.payload;
        default: return state;
    }
}

export default snackbarReducer;