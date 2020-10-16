import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import categoriesRoutes from './routes/categoriesRoutes';
import locationsRoutes from './routes/locationsRoutes';
import { BottomNavigation } from './../components/ui';
import { useSelector } from 'react-redux';

let routes = [ ...categoriesRoutes, ...locationsRoutes ];

const Router = props => {

    const categories = useSelector(state => state.categories.data) || [];

    return (
        <BrowserRouter basename='/myLocations'>
            <Switch>
                { 
                    routes.map((route, idx) => (
                        <Route 
                            key={idx} 
                            exact={route.exact} 
                            path={route.path} 
                            component={props => <route.component categories={categories} { ...props } />} 
                        />
                    )) 
                }
                <Redirect to='/locations' />
            </Switch>
            <BottomNavigation />
        </BrowserRouter>
    )
};

export default Router;