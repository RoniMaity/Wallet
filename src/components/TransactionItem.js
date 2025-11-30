import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Typography } from './Typography';
import Card from './Card';
import { formatDate } from '../utils/dateUtils';
import { formatCurrency } from '../utils/numberUtils';

const TransactionItem = memo(({ item, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity onPress={onPress}>
            <Card style={styles.card}>
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Typography variant="subtitle">{item.category}</Typography>
                        <Typography variant="caption" style={{ color: theme.colors.textSecondary }}>
                            {formatDate(item.date)} • {item.payment_mode || 'Cash'} {item.note ? `• ${item.note}` : ''}
                        </Typography>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Typography
                            variant="h3"
                            style={{ color: item.type === 'income' ? theme.colors.success : theme.colors.danger }}
                        >
                            {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                        </Typography>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default TransactionItem;
