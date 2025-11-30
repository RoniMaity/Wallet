import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Layout = ({ children, style }) => {
    const { theme, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            styles.container,
            { backgroundColor: theme.colors.background, paddingTop: insets.top },
            style
        ]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Layout;
