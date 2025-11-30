import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const initNotifications = async () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
};

export const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return false;
    }

    return true;
};

export const scheduleDailyNotification = async () => {
    const hasPermission = await registerForPushNotificationsAsync();
    if (!hasPermission) return false;

    // Cancel existing to avoid duplicates
    await cancelAllNotifications();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Daily Reminder 📝",
            body: "Don't forget to log your transactions for today!",
        },
        trigger: {
            hour: 22, // 8 PM
            minute: 0,
            repeats: true,
        },
    });

    return true;
};

export const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};
