export const createNewCategory = (newCategory) => {
    return { 
        type: 'NEW_CATEGORY',
        payload: newCategory 
    }
}

export const updateCategory = (category) => {
    return { 
        type: 'UPDATE_CATEGORY',
        payload: category 
    }
}

export const deleteCategories = (categoryId) => {
    return { 
        type: 'DELETE_CATEGORY',
        payload: categoryId 
    }
}