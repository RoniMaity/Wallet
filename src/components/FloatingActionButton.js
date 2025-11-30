import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const FloatingActionButton = ({ onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: theme.colors.primary }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 999,
    },
    icon: {
        fontSize: 32,
        color: '#fff',
        marginTop: -2,
    },
});

export default FloatingActionButton;
