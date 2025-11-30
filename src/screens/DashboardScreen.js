import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { Typography } from '../components/Typography';
import Layout from '../components/Layout';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';
import FloatingActionButton from '../components/FloatingActionButton';

const DashboardScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { state, reloadTransactions } = useTransactions();
    const { transactions, loading } = state;

    const monthlyStats = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const thisMonthTransactions = transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });

        const income = thisMonthTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = thisMonthTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            income,
            expense,
            balance: income - expense,
        };
    }, [transactions]);

    const recentTransactions = useMemo(() => {
        return transactions.slice(0, 5);
    }, [transactions]);

    return (
        <Layout>
            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={reloadTransactions} />}
            >
                <Typography variant="h2" style={styles.header}>Dashboard</Typography>

                <SummaryCard
                    income={monthlyStats.income}
                    expense={monthlyStats.expense}
                    balance={monthlyStats.balance}
                />

                <Typography variant="h3" style={styles.sectionTitle}>Recent Transactions</Typography>

                {recentTransactions.map(t => (
                    <TransactionItem
                        key={t.id}
                        item={t}
                        onPress={() => navigation.navigate('Edit', { transaction: t })}
                    />
                ))}

                {recentTransactions.length === 0 && (
                    <Typography variant="body" style={{ textAlign: 'center', marginTop: 20, color: theme.colors.textSecondary }}>
                        No transactions yet. Add one!
                    </Typography>
                )}

            </ScrollView>
            <FloatingActionButton onPress={() => navigation.navigate('Add')} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
    header: {
        marginBottom: 16,
    },
    sectionTitle: {
        marginBottom: 12,
    },
});

export default DashboardScreen;
