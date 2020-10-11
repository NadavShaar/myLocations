export const createNewCategory = (newCategory) => {
    return { 
        type: 'NEW_CATEGORY',
        payload: newCategory 
    }
}

export const setCategory = (categoryId) => {
    return { 
        type: 'SET_CATEGORY',
        payload: categoryId 
    }
}

export const updateCategory = (category) => {
    return { 
        type: 'UPDATE_CATEGORY',
        payload: category 
    }
}