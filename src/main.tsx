import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';

import App from '@/src/App.tsx';
import '@/src/index.css';


const redirect = sessionStorage.getItem( 'ghp_redirect' );

if ( redirect ) {
  sessionStorage.removeItem( 'ghp_redirect' );
  window.history.replaceState( null, '', redirect );
}


createRoot( document.getElementById( 'root' )! ).render(
  <StrictMode>
    <Router basename= { import.meta.env.BASE_URL }>
      <App />
    </Router>
  </StrictMode>
);
