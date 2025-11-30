import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { Typography } from '../components/Typography';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';

const AddTransactionScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { add } = useTransactions();

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [type, setType] = useState('expense');
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!amount || !category) {
            Alert.alert('Error', 'Please fill in amount and category');
            return;
        }

        setLoading(true);
        try {
            await add({
                amount: parseFloat(amount),
                category,
                note,
                type,
                payment_mode: paymentMode,
                date: new Date().toISOString(),
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to add transaction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.content}>
                <Typography variant="h2" style={styles.header}>Add Transaction</Typography>

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
                    title="Save Transaction"
                    onPress={handleSubmit}
                    loading={loading}
                    style={{ marginTop: 24 }}
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

export default AddTransactionScreen;
