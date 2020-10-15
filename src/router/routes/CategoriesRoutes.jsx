import React from "react";
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import Categories from './../../screens/categories/Categories';
import Category from './../../screens/categories/Category';

const CategoriesRoutes = () => {

    const categories = useSelector(state => state.categories.data) || [];

    return (
        <Switch>
            <Route exact path={`/new`} >
                <Category mode="new" categories={categories} />
            </Route>
            <Route path={`/:id/edit`} >
                <Category mode="edit" categories={categories} />
            </Route>
            <Route path={`/:id/details`} >
                <Category mode="details" categories={categories} />
            </Route>
            <Route>
                <Categories categories={categories} />
            </Route>
        </Switch>
    )
};

export default CategoriesRoutes;