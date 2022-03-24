import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { StyledEngineProvider } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

axios.defaults.baseURL = process.env.REACT_APP_API_URL ?? '';
axios.defaults.withCredentials = true;
