import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Input = ({ label, error, style, ...props }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    {
                        color: theme.colors.text,
                        borderColor: error ? theme.colors.danger : theme.colors.border,
                        backgroundColor: theme.colors.card
                    }
                ]}
                placeholderTextColor={theme.colors.textSecondary}
                {...props}
            />
            {error && <Text style={[styles.error, { color: theme.colors.danger }]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    error: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default Input;
