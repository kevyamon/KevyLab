import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

/**
 * ============================================================================
 * KEVYLAB — POINT D'ENTRÉE DU CLIENT REACT
 * ============================================================================
 * Monte l'application React enveloppée dans BrowserRouter et applique
 * les styles globaux du design system sans couleur en dur.
 * ============================================================================
 */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
