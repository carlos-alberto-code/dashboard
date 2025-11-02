import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext.tsx';
import React from 'react'
import {ThemeSetup} from "./theme/theme.tsx";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeSetup>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </ThemeSetup>
    </React.StrictMode>,
)