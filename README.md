# Wallet - Personal Finance Tracker

A comprehensive mobile application for tracking personal finances, built with React Native and Expo.

## Features
- **Dashboard**: View monthly income, expenses, and balance at a glance.
- **Transactions**: Add, edit, and delete transactions with categories and notes.
- **Filtering**: Filter transactions by Month, Year, and Payment Mode (Cash, Card, UPI).
- **Dark Mode**: Fully supported dark theme.
- **Notifications**: Daily reminders at 10 PM to log your expenses.
- **Persistence**: All data is stored locally using SQLite, ensuring privacy and offline access.

## Prerequisites (Mac)
To run this project on a Mac, ensure you have the following installed:
1.  **Node.js**: [Download here](https://nodejs.org/)
2.  **Xcode**: Install from the Mac App Store (required for iOS Simulator).
3.  **CocoaPods**: Required for installing iOS dependencies.
    ```bash
    sudo gem install cocoapods
    ```

## Setup Instructions

1.  **Navigate to the project directory**:
    Open Terminal and run:
    ```bash
    cd path/to/Wallet
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

## How to Run

1.  **Start the iOS Simulator**:
    - Open **Xcode**.
    - Go to **Xcode** > **Open Developer Tool** > **Simulator**.

2.  **Run the App**:
    In your terminal (inside the project folder), run:
    ```bash
    npx expo run:ios
    ```
    
    *Note: The first build might take a few minutes as it compiles the native code.*

## Troubleshooting

- **"Cannot find native module" error**:
    If you encounter errors related to native modules (like notifications or SQLite), run the following commands to clean and rebuild:
    ```bash
    npx expo prebuild --clean
    npx expo run:ios
    ```

- **Database Errors**:
    If the database fails to open, the app attempts to auto-correct. Restarting the app usually resolves this.
