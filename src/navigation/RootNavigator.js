import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';

import OnboardingScreen from '../screens/OnboardingScreen';
import MainTabs from './MainTabs';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import EditTransactionScreen from '../screens/EditTransactionScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { theme } = useTheme();
    const [initialRoute, setInitialRoute] = React.useState(null);

    React.useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const { initDatabase, getSetting } = require('../services/database');
                await initDatabase();
                const hasSeen = await getSetting('hasSeenOnboarding');
                setInitialRoute(hasSeen === 'true' ? 'MainTabs' : 'Onboarding');
            } catch (e) {
                console.error(e);
                setInitialRoute('Onboarding');
            }
        };
        checkOnboarding();
    }, []);

    if (!initialRoute) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: theme.colors.card },
                    headerTintColor: theme.colors.text,
                    contentStyle: { backgroundColor: theme.colors.background },
                }}
                initialRouteName={initialRoute}
            >
                <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Add" component={AddTransactionScreen} options={{ presentation: 'modal' }} />
                <Stack.Screen name="Edit" component={EditTransactionScreen} options={{ presentation: 'modal' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
