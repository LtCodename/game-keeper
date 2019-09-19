import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppConnected from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './redux/reducers';
import thunk from 'redux-thunk'

const store = createStore(
  reducers.reducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
