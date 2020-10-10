const categoriesReducer = (state=[], action) => {
    switch (action.type) {
        case 'NEW_CATEGORY': {
            state.push(action.payload);
            return state;
        }
        default: return state;
    }
}

export default categoriesReducer;