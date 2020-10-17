import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import locationsReducer from './locationsReducer';

const reducers = combineReducers({
    categories: categoriesReducer,
    locations: locationsReducer
});

export default reducers;