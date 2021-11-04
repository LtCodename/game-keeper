import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppConnected from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/rootReducer";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<AppConnected />
	</Provider>,
	document.getElementById("root"),
);

serviceWorker.unregister();
