import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';
import { Provider, useSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from "redux-localstorage-simple";
import Categories from './screens/Categories';
import Category from './screens/Category';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    useRouteMatch
} from "react-router-dom";
import WebFont from "webfontloader";
WebFont.load({google: {families: ["Roboto:300,400,500"]}});
import './index.css';
import Snackbar from './components/Snackbar';

const createStoreWithMiddleware = applyMiddleware(
    save({ states: ["categories"], namespace: "myLocations" })
)(createStore);
const store = createStoreWithMiddleware(reducers, load({ states: ["categories"], namespace: "myLocations" }), composeWithDevTools());

const App = () => {
    
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/myLocations/categories/" component={ () =>
                        {
                            var { url } = useRouteMatch();
                            const categories = useSelector(state => state.categories.data);

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
                                </Switch>
                            )
                        }
                    }/>
                    <Redirect from='*' to='/myLocations/categories/' />
                </Switch>
            </Router>
            <Snackbar />
        </React.Fragment>
    )
};

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));