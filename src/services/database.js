import * as SQLite from 'expo-sqlite';

let db;

const getDB = async () => {
    if (!db) {
        try {
            db = await SQLite.openDatabaseAsync('wallet.db');
        } catch (error) {
            console.error("Error opening database:", error);
            throw error;
        }
    }
    return db;
};

export const initDatabase = async () => {
    try {
        const database = await getDB();
        await database.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        note TEXT,
        type TEXT NOT NULL,
        payment_mode TEXT
      );
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export const insertTransaction = async (transaction) => {
    const { amount, category, date, note, type, payment_mode } = transaction;
    try {
        const database = await getDB();
        const result = await database.runAsync(
            'INSERT INTO transactions (amount, category, date, note, type, payment_mode) VALUES (?, ?, ?, ?, ?, ?)',
            [amount, category, date, note, type, payment_mode]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
};

export const getAllTransactions = async () => {
    try {
        const database = await getDB();
        return await database.getAllAsync('SELECT * FROM transactions ORDER BY date DESC');
    } catch (error) {
        console.error('Error getting transactions:', error);
        return [];
    }
};

export const getTransactionsByMonth = async (month, year) => {
    try {
        const database = await getDB();
        const monthStr = (month + 1).toString().padStart(2, '0');
        const pattern = `${year}-${monthStr}%`;
        return await database.getAllAsync('SELECT * FROM transactions WHERE date LIKE ? ORDER BY date DESC', [pattern]);
    } catch (error) {
        console.error('Error getting transactions by month:', error);
        return [];
    }
}

export const deleteTransaction = async (id) => {
    try {
        const database = await getDB();
        await database.runAsync('DELETE FROM transactions WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
};

export const updateTransaction = async (transaction) => {
    const { id, amount, category, date, note, type, payment_mode } = transaction;
    try {
        const database = await getDB();
        await database.runAsync(
            'UPDATE transactions SET amount = ?, category = ?, date = ?, note = ?, type = ?, payment_mode = ? WHERE id = ?',
            [amount, category, date, note, type, payment_mode, id]
        );
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
};

export const deleteAllTransactions = async () => {
    try {
        const database = await getDB();
        await database.runAsync('DELETE FROM transactions');
    } catch (error) {
        console.error('Error deleting all transactions:', error);
        throw error;
    }
};

export const setSetting = async (key, value) => {
    try {
        const database = await getDB();
        await database.runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
    } catch (error) {
        console.error('Error setting setting:', error);
    }
};

export const getSetting = async (key) => {
    try {
        const database = await getDB();
        const result = await database.getFirstAsync('SELECT value FROM settings WHERE key = ?', [key]);
        return result ? result.value : null;
    } catch (error) {
        console.error('Error getting setting:', error);
        return null;
    }
};
