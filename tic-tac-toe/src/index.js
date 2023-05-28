// we're importing react and the styles file we created, as well as App.js
// which is where the component we created lives 
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

// injects App.js 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
