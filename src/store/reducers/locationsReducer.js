const categoriesReducer = (state={data: []}, action) => {
    switch (action.type) {
        case 'NEW_LOCATION': {
            state.data.push(action.payload);
            return { data: [ ...state.data ] };
        }
        case 'UPDATE_LOCATION': {
            let updatedLocation = action.payload;
            let updatedLocationIndex = state.data.findIndex(d => d.id === updatedLocation.id);
            state.data[updatedLocationIndex] = updatedLocation;

            return { data: [ ...state.data ] };
        }
        case 'DELETE_LOCATIONS': {

            let locationsIds = action.payload;
            locationsIds.forEach(locationId => {
                let locationIndex = state.data.findIndex(d => d.id === locationId);
                state.data.splice(locationIndex, 1)
            })
            
            return { data: [ ...state.data ] };
        }
        default: return state;
    }
}

export default categoriesReducer;