const categoriesReducer = (state={data: []}, action) => {
    switch (action.type) {
        case 'NEW_CATEGORY': {
            state.data.push(action.payload);
            return { data: [ ...state.data ] };
        }
        case 'UPDATE_CATEGORY': {
            let updatedCategory = action.payload;
            let updatedCategoryIndex = state.data.findIndex(d => d.id === updatedCategory.id);
            state.data[updatedCategoryIndex] = updatedCategory;

            return { data: [ ...state.data ] };
        }
        case 'DELETE_CATEGORY': {

            let categoriesIds = action.payload;
            categoriesIds.forEach(categoryId => {
                let categoryIndex = state.data.findIndex(d => d.id === categoryId);
                state.data.splice(categoryIndex, 1)
            })
            
            return { data: [ ...state.data ] };
        }
        case 'ASSIGN_CATEGORY': {

        }
        default: return state;
    }
}

export default categoriesReducer;