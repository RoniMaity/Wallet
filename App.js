import React from 'react';
import { AppProvider } from './src/context/AppProvider';
import RootNavigator from './src/navigation/RootNavigator';
import { initNotifications } from './src/services/notifications';

initNotifications();

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
