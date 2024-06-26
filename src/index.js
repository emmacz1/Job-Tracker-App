import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css'; // Ensure this path matches your structure
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
