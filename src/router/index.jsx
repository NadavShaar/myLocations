import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import CategoriesRoutes from './routes/CategoriesRoutes';

const Router = () => (
    <BrowserRouter basename='/myLocations'>
        <CategoriesRoutes />
        <Redirect to='/categories' />
    </BrowserRouter>
);

export default Router;