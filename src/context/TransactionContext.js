import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { initDatabase, getAllTransactions, insertTransaction, deleteTransaction, updateTransaction } from '../services/database';

const TransactionContext = createContext();

const initialState = {
    transactions: [],
    loading: true,
    error: null,
};

const transactionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return { ...state, transactions: action.payload, loading: false };
        case 'ADD_TRANSACTION':
            return { ...state, transactions: [action.payload, ...state.transactions] };
        case 'DELETE_TRANSACTION':
            return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
        case 'UPDATE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map(t => (t.id === action.payload.id ? action.payload : t)),
            };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionReducer, initialState);

    const loadTransactions = useCallback(async () => {
        try {
            await initDatabase();
            const data = await getAllTransactions();
            dispatch({ type: 'SET_TRANSACTIONS', payload: data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    }, []);

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    const add = async (transaction) => {
        try {
            const id = await insertTransaction(transaction);
            dispatch({ type: 'ADD_TRANSACTION', payload: { ...transaction, id } });
        } catch (error) {
            console.error(error);
        }
    };

    const remove = async (id) => {
        try {
            await deleteTransaction(id);
            dispatch({ type: 'DELETE_TRANSACTION', payload: id });
        } catch (error) {
            console.error(error);
        }
    };

    const update = async (transaction) => {
        try {
            await updateTransaction(transaction);
            dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
        } catch (error) {
            console.error(error);
        }
    }

    const clear = async () => {
        try {
            const { deleteAllTransactions } = require('../services/database');
            await deleteAllTransactions();
            dispatch({ type: 'SET_TRANSACTIONS', payload: [] });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TransactionContext.Provider value={{ state, add, remove, update, clear, reloadTransactions: loadTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionContext);
