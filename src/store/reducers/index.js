import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import snackbarReducer from './snackbarReducer';

const reducers = combineReducers({
    categories: categoriesReducer,
    snackbar: snackbarReducer
});

export default reducers;