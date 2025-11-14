import './index.css' 
import React from 'react'
import App from './App.tsx'
import {createRoot} from 'react-dom/client'
import {ThemeSetup} from "./theme/theme.tsx";
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeSetup>
            <BrowserRouter>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </BrowserRouter>
        </ThemeSetup>
    </React.StrictMode>,
)
