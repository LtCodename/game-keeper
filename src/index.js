import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/reducers';


const store = createStore(
  reducers.reducer,
  applyMiddleware(thunk)
);

const stateToProps = (state = {}) => {
  return {
    lists: state.lists,
    developers: state.developers
  }
};

const AppConnected = connect(stateToProps, null)(App);

ReactDOM.render(
  <Provider store={store}>
    <AppConnected/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
