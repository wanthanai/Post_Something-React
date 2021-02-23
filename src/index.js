import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//! React Alert Message
import { positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// redux
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import asyncDeleteImgOnWindowReducer from './reducers/deleteImgOne'


//! Variable
// config alert message
const options = {
  timeout: 3000,
  position: positions.TOP_CENTER
};

//! Redux Store
const store = createStore(asyncDeleteImgOnWindowReducer, applyMiddleware(thunk));
export default store;


ReactDOM.render(
  <React.StrictMode>
        <Provider store={store}>
            <AlertProvider  template={AlertTemplate} {...options}>
                    <App />
            </AlertProvider>
        </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

