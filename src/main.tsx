import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext.tsx';
import { MantineProvider } from '@mantine/core'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
)
