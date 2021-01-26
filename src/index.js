import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//! React Alert Message
import { positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


//! Variable
// config alert message
const options = {
  timeout: 3000,
  position: positions.TOP_CENTER
};



ReactDOM.render(
  <React.StrictMode>
    <AlertProvider  template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

