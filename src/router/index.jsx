import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import categoriesRoutes from './routes/categoriesRoutes';
import locationsRoutes from './routes/locationsRoutes';
import { BottomNavigation } from './../components/ui';

let allRoutes = [...categoriesRoutes, ...locationsRoutes]; 

const Router = props => {
    return (
        <BrowserRouter basename='/myLocations'>
            <Switch>
                { 
                    allRoutes.map((route, idx) => (
                        <Route 
                            key={idx} 
                            exact={route.exact} 
                            path={route.path} 
                            component={route.component} 
                        />
                    )) 
                }
                <Redirect to='/' />
            </Switch>
            <BottomNavigation />
        </BrowserRouter>
    )
};

export default Router;