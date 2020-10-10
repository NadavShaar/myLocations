export const createNewCategory = (newCategory) => {
    return { 
        type: 'NEW_CATEGORY',
        payload: newCategory 
    }
}