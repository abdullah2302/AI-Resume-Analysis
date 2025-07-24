import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // or App.css if that's where your Tailwind is

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
