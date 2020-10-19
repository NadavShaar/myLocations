import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import categoriesRoutes from './routes/categoriesRoutes';
import locationsRoutes from './routes/locationsRoutes';
import { BottomNavigation } from './../components/ui';
import { useSelector } from 'react-redux';

const Router = props => {

    const categories = useSelector(state => state.categories) || {};
    const locations = useSelector(state => state.locations.data) || [];

    return (
        <BrowserRouter basename='/myLocations'>
            <Switch>
                { 
                    categoriesRoutes.map((route, idx) => (
                        <Route 
                            key={idx} 
                            exact={route.exact} 
                            path={route.path} 
                            component={props => <route.component categories={categories} { ...props } />} 
                        />
                    )) 
                }
                { 
                    locationsRoutes.map((route, idx) => (
                        <Route 
                            key={idx} 
                            exact={route.exact} 
                            path={route.path} 
                            component={props => <route.component categories={categories} locations={locations} { ...props } />} 
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