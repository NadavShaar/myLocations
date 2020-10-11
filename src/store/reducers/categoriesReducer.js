import Categories from "../../screens/Categories";

const categoriesReducer = (state={data: [], selectedCategoryId: null}, action) => {
    switch (action.type) {
        case 'NEW_CATEGORY': {
            state.data.push(action.payload);
            return state;
        }
        case 'SET_CATEGORY': {
            state.selectedCategoryId = action.payload;
            return state;
        }
        case 'UPDATE_CATEGORY': {
            let updatedCategory = action.payload;
            let updatedCategoryIndex = state.data.findIndex(d => d.id === updatedCategory.id);
            state.data[updatedCategoryIndex] = updatedCategory;

            return state;
        }
        default: return state;
    }
}

export default categoriesReducer;