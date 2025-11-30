import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme/theme';
import { getSetting, setSetting, initDatabase } from '../services/database';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [isDark, setIsDark] = useState(systemScheme === 'dark');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                // Ensure DB is ready (might be redundant if AppProvider does it, but safe)
                await initDatabase();
                const savedTheme = await getSetting('theme');
                if (savedTheme) {
                    setIsDark(savedTheme === 'dark');
                }
            } catch (e) {
                console.log('Error loading theme preference', e);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newMode = !isDark;
        setIsDark(newMode);
        try {
            await setSetting('theme', newMode ? 'dark' : 'light');
        } catch (e) {
            console.log('Error saving theme preference', e);
        }
    };

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
