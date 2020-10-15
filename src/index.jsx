import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from "redux-localstorage-simple";
import WebFont from "webfontloader";
WebFont.load({google: {families: ["Roboto:400,500"]}});
import './index.css';
import { Snackbar, Confirm } from './components/materialUI';
import Theme from "./theme";
import Router from "./router";

const createStoreWithMiddleware = applyMiddleware(
    save({ states: ["categories"], namespace: "myLocations" })
)(createStore);
const store = createStoreWithMiddleware(reducers, load({ states: ["categories"], namespace: "myLocations" }), composeWithDevTools());

const App = () => (
    <Theme>
        <Router />
        <Snackbar />
        <Confirm />
    </Theme>
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));