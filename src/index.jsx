import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import MainContextProvider from './contexts/MainContextProvider';
import CryptoContextProvider from './contexts/CryptoContextReducer';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <MainContextProvider>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </MainContextProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
