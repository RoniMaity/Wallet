# Wallet - Personal Finance Tracker

A comprehensive mobile application for tracking personal finances, built with React Native and Expo.

## Features
- **Dashboard**: View total income, expenses, and balance.
- **Transactions**: Add, edit, and delete transactions with categories and notes.
- **Smart Inputs**: 
    - **Category Autocomplete**: Suggests categories as you type based on your history.
    - **Payment Mode Dropdown**: Easy selection of payment modes (Cash, Card, UPI, etc.).
- **Filtering**: Filter transactions by Month, Year, and Payment Mode.
- **Dark Mode**: Fully supported dark theme.
- **Notifications**: Daily reminders to log your expenses.
- **Persistence**: All data is stored locally using SQLite, ensuring privacy and offline access.

## Prerequisites
To run this project, ensure you have the following installed:
1.  **Node.js**: [Download here](https://nodejs.org/)
2.  **Expo Go App**: Install on your physical device (iOS/Android) if you want to test on a phone.
3.  **Xcode** (Mac only): Required if you want to run on the iOS Simulator.

## Setup Instructions

1.  **Navigate to the project directory**:
    ```bash
    cd path/to/Wallet
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

## How to Run

### Option 1: Run on Physical Device (Recommended for quick testing)
1.  Start the development server:
    ```bash
    npx expo start
    ```
2.  Scan the QR code shown in the terminal:
    -   **Android**: Use the Expo Go app.
    -   **iOS**: Use the default Camera app.

### Option 2: Run on iOS Simulator (Mac only)
1.  Open **Simulator** (via Xcode > Open Developer Tool > Simulator).
2.  Run the command:
    ```bash
    npx expo run:ios
    ```

## ⚠️ Important Note: Notifications & Expo Go

**Android Push notifications (remote notifications) functionality provided by `expo-notifications` was removed from Expo Go with the release of SDK 53.**

If you see a warning like:
> `expo-notifications` functionality is not fully supported in Expo Go: We recommend you instead use a development build to avoid limitations.

**Solution:**
To test notifications fully, you should use a **Development Build** instead of Expo Go.
-   Read more about Development Builds: [https://docs.expo.dev/develop/development-builds/introduction/](https://docs.expo.dev/develop/development-builds/introduction/)
-   Learn more about the limitation: [https://expo.fyi/dev-client](https://expo.fyi/dev-client)

## Troubleshooting

-   **"Cannot find native module" error**:
    If you encounter errors related to native modules, run:
    ```bash
    npx expo prebuild --clean
    npx expo run:ios
    ```

-   **Database Errors**:
    If the database fails to open, the app attempts to auto-correct. Restarting the app usually resolves this.
