import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import RedirectHandler from './components/RedirectHandler';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/r/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
