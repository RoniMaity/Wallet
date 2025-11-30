import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { Typography } from '../components/Typography';
import Layout from '../components/Layout';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import Card from '../components/Card';
import { formatCurrency } from '../utils/numberUtils';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const YEARS = ['2024', '2025', '2026', '2027', '2028'];

const AnalysisScreen = () => {
    const { theme } = useTheme();
    const { state } = useTransactions();
    const { transactions } = state;

    const [mode, setMode] = useState('monthly'); // 'monthly' or 'range'
    const [selectedMonth, setSelectedMonth] = useState(MONTHS[new Date().getMonth()]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredTransactions = useMemo(() => {
        if (mode === 'monthly') {
            const monthIndex = MONTHS.indexOf(selectedMonth);
            return transactions.filter(t => {
                const date = new Date(t.date);
                return date.getMonth() === monthIndex && date.getFullYear().toString() === selectedYear;
            });
        } else {
            if (!startDate || !endDate) return [];
            const start = new Date(startDate);
            const end = new Date(endDate);
            // Set end date to end of day
            end.setHours(23, 59, 59, 999);

            return transactions.filter(t => {
                const date = new Date(t.date);
                return date >= start && date <= end;
            });
        }
    }, [transactions, mode, selectedMonth, selectedYear, startDate, endDate]);

    const stats = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            income,
            expense,
            balance: income - expense,
        };
    }, [filteredTransactions]);

    const categoryBreakdown = useMemo(() => {
        const expenses = filteredTransactions.filter(t => t.type === 'expense');
        const breakdown = {};

        expenses.forEach(t => {
            if (!breakdown[t.category]) {
                breakdown[t.category] = 0;
            }
            breakdown[t.category] += t.amount;
        });

        return Object.entries(breakdown)
            .map(([category, amount]) => ({ category, amount }))
            .sort((a, b) => b.amount - a.amount);
    }, [filteredTransactions]);

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.content}>
                <Typography variant="h2" style={styles.header}>Analysis</Typography>

                {/* Mode Toggle */}
                <View style={[styles.toggleContainer, { backgroundColor: theme.colors.card }]}>
                    <TouchableOpacity
                        style={[styles.toggleButton, mode === 'monthly' && { backgroundColor: theme.colors.primary }]}
                        onPress={() => setMode('monthly')}
                    >
                        <Typography variant="body" style={{ color: mode === 'monthly' ? '#fff' : theme.colors.text }}>Monthly</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, mode === 'range' && { backgroundColor: theme.colors.primary }]}
                        onPress={() => setMode('range')}
                    >
                        <Typography variant="body" style={{ color: mode === 'range' ? '#fff' : theme.colors.text }}>Date Range</Typography>
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                {mode === 'monthly' ? (
                    <View style={styles.filterRow}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Dropdown
                                label="Month"
                                value={selectedMonth}
                                options={MONTHS}
                                onSelect={setSelectedMonth}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Dropdown
                                label="Year"
                                value={selectedYear}
                                options={YEARS}
                                onSelect={setSelectedYear}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.filterRow}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Input
                                label="Start (YYYY-MM-DD)"
                                placeholder="2024-01-01"
                                value={startDate}
                                onChangeText={setStartDate}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Input
                                label="End (YYYY-MM-DD)"
                                placeholder="2024-01-31"
                                value={endDate}
                                onChangeText={setEndDate}
                            />
                        </View>
                    </View>
                )}

                {/* Summary Cards */}
                <View style={styles.statsContainer}>
                    <Card style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
                        <Typography variant="caption" style={{ color: theme.colors.success }}>Income</Typography>
                        <Typography variant="h3" style={{ color: theme.colors.success }}>{formatCurrency(stats.income)}</Typography>
                    </Card>
                    <Card style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
                        <Typography variant="caption" style={{ color: theme.colors.danger }}>Expense</Typography>
                        <Typography variant="h3" style={{ color: theme.colors.danger }}>{formatCurrency(stats.expense)}</Typography>
                    </Card>
                </View>

                <Card style={[styles.balanceCard, { backgroundColor: theme.colors.card }]}>
                    <Typography variant="subtitle" style={{ color: theme.colors.textSecondary }}>Net Balance</Typography>
                    <Typography variant="h2">{formatCurrency(stats.balance)}</Typography>
                </Card>

                {/* Category Breakdown */}
                <Typography variant="h3" style={styles.sectionTitle}>Expense Breakdown</Typography>

                {categoryBreakdown.length > 0 ? (
                    categoryBreakdown.map((item, index) => (
                        <View key={index} style={[styles.categoryItem, { borderBottomColor: theme.colors.border }]}>
                            <Typography variant="body">{item.category}</Typography>
                            <Typography variant="body" style={{ fontWeight: 'bold' }}>{formatCurrency(item.amount)}</Typography>
                        </View>
                    ))
                ) : (
                    <Typography variant="body" style={{ textAlign: 'center', color: theme.colors.textSecondary, marginTop: 20 }}>
                        No expenses found for this period.
                    </Typography>
                )}

            </ScrollView>
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
    toggleContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        padding: 4,
        marginBottom: 24,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
    filterRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statCard: {
        flex: 0.48,
        alignItems: 'center',
        padding: 16,
    },
    balanceCard: {
        alignItems: 'center',
        padding: 24,
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 16,
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
});

export default AnalysisScreen;
