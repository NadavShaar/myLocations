export const addLocation = (newLocation) => {
    return { 
        type: 'NEW_LOCATION',
        payload: newLocation 
    }
}

export const updateLocation = (location) => {
    return { 
        type: 'UPDATE_LOCATION',
        payload: location 
    }
}

export const deleteLocations = (locationsIds) => {
    return { 
        type: 'DELETE_LOCATIONS',
        payload: locationsIds 
    }
}