import React from "react";
import '@mantine/core/styles.css';
import {MantineProvider, createTheme} from '@mantine/core';

const theme = createTheme({
    primaryColor: 'red',
    colors: {
        red: [
            '#fee2e2',
            '#fecaca',
            '#fca5a5',
            '#f87171',
            '#ef4444',
            '#dc2626',
            '#b91c1c', // Color Principal
            '#991b1b', // Para el Hover
            '#7f1d1d',
            '#450a0a',
        ],
    },
    fontFamily: 'inherit',
    defaultRadius: 'md',
    components: {
        TextInput: {
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
            defaultProps: {
                size: 'lg',
            },
            styles: {
                root: {
                    fontWeight: 700,
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    borderRadius: '8px',
                    transition: 'background-color 300ms',
                    '&[dataVariant="filled"][dataColor="red"]': {
                        backgroundColor: '#b91c1c',
                        '&:hover:not(:disabled)': {
                            backgroundColor: '#991b1b',
                        },
                    },
                    '&:disabled': {
                        backgroundColor: '#f87171',
                        cursor: 'not-allowed',
                        color: '#ffffff',
                    },
                },
            },
        },
        Alert: {
            styles: {
                root: {
                    padding: '12px 16px',
                    '&[dataVariant="light"][dataColor="red"]': {
                        backgroundColor: '#fee2e2',
                        border: '1px solid #f87171',
                    },
                },
                message: {
                    '&[dataVariant="light"][dataColor="red"]': {
                        color: '#b91c1c',
                    },
                },
            },
        },
        Title: {
            styles: {
                root: {
                    '&[dataOrder="2"]': {
                        fontSize: '1.875rem',
                        fontWeight: 700,
                        marginBottom: '2rem',
                        color: '#1f2937',
                        textAlign: 'center',
                    },
                },
            },
        },
    },
});

export function ThemeSetup({children}: { children: React.ReactNode }) {
    return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

export {theme};