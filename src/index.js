import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TestApp from './TestApp'
import reportWebVitals from './reportWebVitals';
import './css/blog.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js' 
import './css/owl.carousel.css';
import './css/w3.css';
import './css/style.css';
import {Provider} from 'react-redux'
import store from './store/store'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//modal
