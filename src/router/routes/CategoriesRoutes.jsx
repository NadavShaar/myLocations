import React from "react";
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import Categories from './../../screens/categories/Categories';
import Category from './../../screens/categories/Category';

const CategoriesRoutes = () => {

    const categories = useSelector(state => state.categories.data) || [];

        return (
            <Switch>
                <Route exact path={`/category/new`} >
                    <Category mode="new" categories={categories} />
                </Route>
                <Route path={`/category/:id/edit`} >
                    <Category mode="edit" categories={categories} />
                </Route>
                <Route path={`/category/:id/details`} >
                    <Category mode="details" categories={categories} />
                </Route>
                <Route exact path={`/categories`}>
                    <Categories categories={categories} />
                </Route>
                <Redirect to='/categories' />
            </Switch>
        )
};

export default CategoriesRoutes;