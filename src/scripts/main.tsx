import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';
import { ToastProvider } from '../components/Toast';
import '../styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider position="bottom-right">
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
); 