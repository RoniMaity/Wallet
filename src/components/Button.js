import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Button = ({ title, onPress, variant = 'primary', loading = false, style, textStyle }) => {
    const { theme } = useTheme();

    const getBackgroundColor = () => {
        if (variant === 'primary') return theme.colors.primary;
        if (variant === 'danger') return theme.colors.danger;
        return 'transparent';
    };

    const getTextColor = () => {
        if (variant === 'outline') return theme.colors.primary;
        return '#fff';
    };

    const getBorderColor = () => {
        if (variant === 'outline') return theme.colors.primary;
        return 'transparent';
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: variant === 'outline' ? 1 : 0
                },
                style
            ]}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Button;
