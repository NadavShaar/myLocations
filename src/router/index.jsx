import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import CategoriesRoutes from './routes/CategoriesRoutes';

const Router = () => (
    <BrowserRouter basename='/myLocations/categories'>
        <CategoriesRoutes />
        <Redirect from='*' to='/' />
    </BrowserRouter>
);

export default Router;