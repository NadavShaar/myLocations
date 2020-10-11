import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from "redux-localstorage-simple";
import Categories from './screens/Categories';
import Category from './screens/Category';
import {
    BrowserRouter as Router,
    Switch,
    Route
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
            <Router basename='/myLocations'>
                <Switch>
                    <Route path="/new" component={() => <Category mode="new" />} />
                    <Route path="/edit" component={() => <Category mode="edit" />} />
                    <Route path="/view-details" component={() => <Category mode="viewDetails" />} />
                    <Route path="/" component={Categories} />
                </Switch>
            </Router>
            <Snackbar />
        </React.Fragment>
    )
};

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));