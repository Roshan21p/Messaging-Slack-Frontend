import './index.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Toaster } from 'sonner';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App />
      <Toaster position="top-right" richColors />
   </BrowserRouter>
);
