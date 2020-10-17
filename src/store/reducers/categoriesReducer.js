const categoriesReducer = (state={}, action) => {
    switch (action.type) {
        case 'NEW_CATEGORY': {
            state[Date.now()] = action.payload;

            return { ...state };
        }
        case 'UPDATE_CATEGORY': {
            let updatedCategory = action.payload.item;
            state[action.payload.id] = updatedCategory;

            return { ...state };
        }
        case 'DELETE_CATEGORIES': {

            let categoriesIds = action.payload;
            categoriesIds.forEach(categoryId => delete state[categoryId])
            
            return { ...state };
        }
        default: return { ...state };
    }
}

export default categoriesReducer;