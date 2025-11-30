import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { Typography } from '../components/Typography';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';

const EditTransactionScreen = ({ navigation, route }) => {
    const { transaction } = route.params;
    const { theme } = useTheme();
    const { update, remove } = useTransactions();

    const [amount, setAmount] = useState(transaction.amount.toString());
    const [category, setCategory] = useState(transaction.category);
    const [note, setNote] = useState(transaction.note || '');
    const [type, setType] = useState(transaction.type);
    const [paymentMode, setPaymentMode] = useState(transaction.payment_mode || 'Cash');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!amount || !category) {
            Alert.alert('Error', 'Please fill in amount and category');
            return;
        }

        setLoading(true);
        try {
            await update({
                id: transaction.id,
                amount: parseFloat(amount),
                category,
                note,
                type,
                payment_mode: paymentMode,
                date: transaction.date, // Keep original date or update? Usually keep.
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update transaction');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Delete Transaction',
            'Are you sure you want to delete this transaction?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await remove(transaction.id);
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete transaction');
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.content}>
                <Typography variant="h2" style={styles.header}>Edit Transaction</Typography>

                <View style={styles.typeSelector}>
                    <Button
                        title="Expense"
                        onPress={() => setType('expense')}
                        variant={type === 'expense' ? 'primary' : 'outline'}
                        style={{ flex: 1, marginRight: 8 }}
                    />
                    <Button
                        title="Income"
                        onPress={() => setType('income')}
                        variant={type === 'income' ? 'primary' : 'outline'}
                        style={{ flex: 1, marginLeft: 8 }}
                    />
                </View>

                <Input
                    label="Amount"
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                <Input
                    label="Category"
                    placeholder="e.g., Food, Rent, Salary"
                    value={category}
                    onChangeText={setCategory}
                />

                <Input
                    label="Payment Mode"
                    placeholder="e.g., Cash, Card, UPI"
                    value={paymentMode}
                    onChangeText={setPaymentMode}
                />

                <Input
                    label="Note (Optional)"
                    placeholder="Additional details..."
                    value={note}
                    onChangeText={setNote}
                    multiline
                    numberOfLines={3}
                    style={{ height: 100 }}
                />

                <Button
                    title="Update Transaction"
                    onPress={handleUpdate}
                    loading={loading}
                    style={{ marginTop: 24 }}
                />

                <Button
                    title="Delete Transaction"
                    onPress={handleDelete}
                    variant="danger"
                    style={{ marginTop: 12, backgroundColor: theme.colors.error || '#ff4444' }}
                />
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    typeSelector: {
        flexDirection: 'row',
        marginBottom: 24,
    },
});

export default EditTransactionScreen;
