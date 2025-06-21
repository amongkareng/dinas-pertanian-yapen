// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import './firebase.js'

// 1. Import Toaster
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Tambahkan Toaster di sini */}
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);