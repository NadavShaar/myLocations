import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import CategoriesRoutes from './routes/CategoriesRoutes';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <CategoriesRoutes />
            {/* <Redirect from='*' to='/myLocations/categories/' /> */}
        </Switch>
    </BrowserRouter>
);

export default Router;