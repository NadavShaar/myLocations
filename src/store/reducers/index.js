import categoriesReducer from './categoriesReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    categories: categoriesReducer
});

export default reducers;