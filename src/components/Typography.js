import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const Typography = ({ variant = 'body', style, children, color, ...props }) => {
    const { theme } = useTheme();

    const getStyle = () => {
        switch (variant) {
            case 'h1': return styles.h1;
            case 'h2': return styles.h2;
            case 'h3': return styles.h3;
            case 'subtitle': return styles.subtitle;
            case 'caption': return styles.caption;
            default: return styles.body;
        }
    };

    return (
        <Text
            style={[
                getStyle(),
                { color: color || theme.colors.text },
                style
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    h1: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
    h2: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
    h3: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
    subtitle: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
    body: { fontSize: 16, marginBottom: 4 },
    caption: { fontSize: 12, marginBottom: 2 },
});
