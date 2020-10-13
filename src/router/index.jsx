import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import CategoriesRoutes from './routes/CategoriesRoutes';

const Router = () => (
    <BrowserRouter basename='/categories'>
        <CategoriesRoutes />
        <Redirect from='*' to='/' />
    </BrowserRouter>
);

export default Router;