import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext.tsx';
import React from 'react'
import {MantineSetup} from "./UVMTheme.tsx";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineSetup>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </MantineSetup>
    </React.StrictMode>,
)