import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
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
