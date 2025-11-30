import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Typography } from '../components/Typography';
import Button from '../components/Button';
import Layout from '../components/Layout';
import { setSetting } from '../services/database';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
    const { theme } = useTheme();

    const handleGetStarted = async () => {
        try {
            const { setSetting } = require('../services/database');
            await setSetting('hasSeenOnboarding', 'true');
            navigation.replace('MainTabs');
        } catch (error) {
            console.error('Error saving onboarding status:', error);
            navigation.replace('MainTabs');
        }
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.content}>
                <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.card }]}>
                    <Typography variant="h1" style={{ fontSize: 80 }}>💰</Typography>
                </View>
                <Typography variant="h1" style={styles.title}>Smart Wallet</Typography>
                <Typography variant="body" style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    Track your expenses, manage your budget, and achieve your financial goals.
                </Typography>
            </View>
            <View style={styles.footer}>
                <Button title="Get Started" onPress={handleGetStarted} />
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    imagePlaceholder: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        padding: 24,
    },
});

export default OnboardingScreen;
