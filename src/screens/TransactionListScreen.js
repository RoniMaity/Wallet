import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { Typography } from '../components/Typography';
import Layout from '../components/Layout';
import TransactionItem from '../components/TransactionItem';
import Button from '../components/Button';
import FloatingActionButton from '../components/FloatingActionButton';
import { getCurrentMonthYear } from '../utils/dateUtils';

const TransactionListScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { state } = useTransactions();
    const { transactions } = state;

    const [filterMonth, setFilterMonth] = useState(getCurrentMonthYear().month);
    const [filterYear, setFilterYear] = useState(getCurrentMonthYear().year);
    const [filterPaymentMode, setFilterPaymentMode] = useState('All');

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const date = new Date(t.date);
            const matchesDate = date.getMonth() === filterMonth && date.getFullYear() === filterYear;
            const matchesMode = filterPaymentMode === 'All' || t.payment_mode === filterPaymentMode;
            return matchesDate && matchesMode;
        });
    }, [transactions, filterMonth, filterYear, filterPaymentMode]);

    const handlePressItem = useCallback((item) => {
        navigation.navigate('Edit', { transaction: item });
    }, [navigation]);

    const renderItem = useCallback(({ item }) => (
        <TransactionItem item={item} onPress={() => handlePressItem(item)} />
    ), [handlePressItem]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Typography variant="h2">Transactions</Typography>
                    <Button
                        title="Add"
                        onPress={() => navigation.navigate('Add')}
                        style={{ paddingVertical: 8, paddingHorizontal: 16 }}
                    />
                </View>

                <View style={styles.filterContainer}>
                    <View style={styles.filterRow}>
                        <Typography variant="body" style={{ marginRight: 8 }}>Year:</Typography>
                        <View style={styles.yearSelector}>
                            <Button
                                title="<"
                                onPress={() => setFilterYear(filterYear - 1)}
                                variant="outline"
                                style={styles.yearButton}
                            />
                            <Typography variant="h3" style={{ marginHorizontal: 12 }}>{filterYear}</Typography>
                            <Button
                                title=">"
                                onPress={() => setFilterYear(filterYear + 1)}
                                variant="outline"
                                style={styles.yearButton}
                            />
                        </View>
                    </View>

                    <View style={styles.filterRow}>
                        <Typography variant="body" style={{ marginRight: 8 }}>Month:</Typography>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {months.map((m, index) => (
                                <Button
                                    key={m}
                                    title={m}
                                    variant={filterMonth === index ? 'primary' : 'outline'}
                                    onPress={() => setFilterMonth(index)}
                                    style={{ marginHorizontal: 4, paddingVertical: 4, paddingHorizontal: 8, minWidth: 40 }}
                                    textStyle={{ fontSize: 12 }}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.filterRow}>
                        <Typography variant="body" style={{ marginRight: 8 }}>Mode:</Typography>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {['All', 'Cash', 'Card', 'UPI'].map((mode) => (
                                <Button
                                    key={mode}
                                    title={mode}
                                    variant={filterPaymentMode === mode ? 'primary' : 'outline'}
                                    onPress={() => setFilterPaymentMode(mode)}
                                    style={{ marginHorizontal: 4, paddingVertical: 4, paddingHorizontal: 8 }}
                                    textStyle={{ fontSize: 12 }}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <View style={{ flex: 1, width: '100%' }}>
                    <FlashList
                        data={filteredTransactions}
                        renderItem={renderItem}
                        estimatedItemSize={100}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={() => (
                            <Typography variant="body" style={{ textAlign: 'center', marginTop: 40, color: theme.colors.textSecondary }}>
                                No transactions found for this month.
                            </Typography>
                        )}
                    />
                </View>
            </View>
            <FloatingActionButton onPress={() => navigation.navigate('Add')} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    filterContainer: {
        marginBottom: 16,
    },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    yearSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    yearButton: {
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default TransactionListScreen;
