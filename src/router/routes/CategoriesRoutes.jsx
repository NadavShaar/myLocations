import React from "react";
import { useSelector } from 'react-redux';
import {
    Switch,
    Redirect,
    Route,
    useRouteMatch
} from "react-router-dom";
import Categories from './../../screens/Categories';
import Category from './../../screens/Category';

const CategoriesRoutes = () => {

    return (
        <Route path="/myLocations/categories/" component={ () =>
            {
                var { url } = useRouteMatch();
                const categories = useSelector(state => state.categories.data) || [];

                return (
                    <Switch>
                        <Route path={`${url}/new`} >
                            <Category mode="new" categories={categories} />
                        </Route>
                        <Route path={`${url}/:id/edit`} >
                            <Category mode="edit" categories={categories} />
                        </Route>
                        <Route path={`${url}/:id/details`} >
                            <Category mode="details" categories={categories} />
                        </Route>
                        <Route exact path={url} >
                            <Categories categories={categories} />
                        </Route>
                        {/* <Redirect from='*' to='/myLocations/categories/' /> */}
                    </Switch>
                )
            }
        }/>
    )
};

export default CategoriesRoutes;