import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Typography } from './Typography';
import Card from './Card';
import { formatCurrency } from '../utils/numberUtils';

const SummaryCard = ({ income, expense, balance }) => {
    const { theme } = useTheme();

    return (
        <Card style={styles.summaryCard}>
            <Typography variant="subtitle" style={{ color: theme.colors.textSecondary }}>Current Balance</Typography>
            <Typography variant="h1">{formatCurrency(balance)}</Typography>

            <View style={styles.statsRow}>
                <View>
                    <Typography variant="caption" style={{ color: theme.colors.success }}>Income</Typography>
                    <Typography variant="h3" style={{ color: theme.colors.success }}>{formatCurrency(income)}</Typography>
                </View>
                <View>
                    <Typography variant="caption" style={{ color: theme.colors.danger }}>Expense</Typography>
                    <Typography variant="h3" style={{ color: theme.colors.danger }}>{formatCurrency(expense)}</Typography>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    summaryCard: {
        marginBottom: 24,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
});

export default SummaryCard;
