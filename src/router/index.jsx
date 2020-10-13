import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import CategoriesRoutes from './routes/CategoriesRoutes';

const Router = () => (
    <BrowserRouter basename='/myLocations/categories'>
        <CategoriesRoutes />
    </BrowserRouter>
);

export default Router;