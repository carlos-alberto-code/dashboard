import {MantineProvider, createTheme} from '@mantine/core';
import '@mantine/core/styles.css';

// Theme personalizado para mantener los estilos actuales
const theme = createTheme({
    primaryColor: 'red',
    colors: {
        red: [
            '#fee2e2', // red-100
            '#fecaca', // red-200
            '#fca5a5', // red-300
            '#f87171', // red-400
            '#ef4444', // red-500
            '#dc2626', // red-600
            '#b91c1c', // red-700 - tu color principal
            '#991b1b', // red-800 - tu hover
            '#7f1d1d', // red-900
            '#450a0a', // red-950
        ],
    },
    fontFamily: 'inherit', // Usa la fuente del proyecto
    defaultRadius: 'md', // rounded-lg equivalente
    components: {
        TextInput: {
            defaultProps: {
                size: 'lg',
            },
            styles: {
                input: {
                    padding: '16px',
                    backgroundColor: '#f3f4f6', // bg-gray-100
                    border: '1px solid #e5e7eb', // border-gray-200
                    '&:focus': {
                        borderColor: '#dc2626', // red-600
                        boxShadow: '0 0 0 2px rgba(220, 38, 38, 0.2)', // ring-2 ring-red-600
                    },
                },
                label: {
                    color: '#4b5563', // text-gray-600
                    marginBottom: '8px',
                    display: 'block',
                },
            },
        },
        PasswordInput: {
            defaultProps: {
                size: 'lg',
            },
            styles: {
                input: {
                    padding: '16px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    '&:focus': {
                        borderColor: '#dc2626',
                        boxShadow: '0 0 0 2px rgba(220, 38, 38, 0.2)',
                    },
                },
                label: {
                    color: '#4b5563',
                    marginBottom: '8px',
                    display: 'block',
                },
            },
        },
        Button: {
            styles: {
                root: {
                    fontWeight: 700,
                    padding: '16px',
                    '&:disabled': {
                        backgroundColor: '#f87171', // disabled:bg-red-400
                        cursor: 'not-allowed',
                    },
                },
            },
        },
        Alert: {
            styles: {
                root: {
                    padding: '12px 16px',
                },
            },
        },
    },
});

// Componente wrapper para usar en tu App o main.tsx
export function MantineSetup({children}: { children: React.ReactNode }) {
    return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

// También puedes exportar solo el theme si prefieres configurarlo directamente
export {theme};