import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';

const reducers = combineReducers({
    categories: categoriesReducer
});

export default reducers;