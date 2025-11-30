import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { Typography } from '../components/Typography';
import Button from '../components/Button';
import Layout from '../components/Layout';

const SettingsScreen = () => {
    const { theme, isDark, toggleTheme } = useTheme();
    const { clear } = useTransactions();
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            const { getSetting } = require('../services/database');
            const savedNotif = await getSetting('notificationsEnabled');
            setNotificationsEnabled(savedNotif === 'true');
        };
        loadSettings();
    }, []);

    const toggleNotifications = async () => {
        const { scheduleDailyNotification, cancelAllNotifications } = require('../services/notifications');
        const { setSetting } = require('../services/database');

        const newValue = !notificationsEnabled;
        setNotificationsEnabled(newValue);
        await setSetting('notificationsEnabled', newValue.toString());

        if (newValue) {
            const scheduled = await scheduleDailyNotification();
            if (!scheduled) {
                setNotificationsEnabled(false); // Revert if permission denied
                await setSetting('notificationsEnabled', 'false');
                Alert.alert('Permission Denied', 'Please enable notifications in system settings.');
            }
        } else {
            await cancelAllNotifications();
        }
    };

    const handleResetData = () => {
        Alert.alert(
            "Reset Data",
            "Are you sure you want to delete all transactions? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await clear();
                            Alert.alert("Success", "All data has been reset.");
                        } catch (e) {
                            console.error(e);
                            Alert.alert("Error", "Failed to reset data.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <Layout>
            <View style={styles.container}>
                <Typography variant="h2" style={styles.header}>Settings</Typography>

                <View style={[styles.settingRow, { borderBottomColor: theme.colors.border }]}>
                    <Typography variant="body">Dark Mode</Typography>
                    <Switch value={isDark} onValueChange={toggleTheme} />
                </View>

                <View style={[styles.settingRow, { borderBottomColor: theme.colors.border }]}>
                    <Typography variant="body">Daily Reminder (10 PM)</Typography>
                    <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
                </View>

                <View style={styles.section}>
                    <Typography variant="h3" style={{ marginBottom: 16 }}>Data Management</Typography>
                    <Button
                        title="Reset All Data"
                        variant="danger"
                        onPress={handleResetData}
                    />
                </View>

                <View style={styles.footer}>
                    <Typography variant="caption" style={{ textAlign: 'center', color: theme.colors.textSecondary }}>
                        Version 1.0.0
                    </Typography>
                </View>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    section: {
        marginTop: 32,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 16,
    }
});

export default SettingsScreen;
