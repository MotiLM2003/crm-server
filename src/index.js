import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store/storeConfiguration';
import AppRouter from './routers/AppRouter';
import history from './history';

import './sass/main.scss';
const jsx = (
  <Provider store={store}>
    <Router history={history}>
      <AppRouter />
    </Router>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
