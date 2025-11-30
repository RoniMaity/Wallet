import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { TransactionProvider } from './TransactionContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as SQLite from 'expo-sqlite';

export const AppProvider = ({ children }) => {
    React.useEffect(() => {
        const setupDB = async () => {
            try {
                const { initDatabase } = require('../services/database');
                await initDatabase();
            } catch (e) {
                console.error("Setup DB failed:", e);
            }
        }
        setupDB();
    }, []);

    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <TransactionProvider>
                    {children}
                </TransactionProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};
