import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Typography } from './Typography';

const Dropdown = ({ label, value, options, onSelect, placeholder = 'Select an option' }) => {
    const { theme } = useTheme();
    const [visible, setVisible] = useState(false);

    const handleSelect = (item) => {
        onSelect(item);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            {label && <Typography variant="body" style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Typography>}

            <TouchableOpacity
                style={[
                    styles.selector,
                    {
                        backgroundColor: theme.colors.card,
                        borderColor: theme.colors.border,
                    }
                ]}
                onPress={() => setVisible(true)}
            >
                <Text style={{ color: value ? theme.colors.text : theme.colors.textSecondary, fontSize: 16 }}>
                    {value || placeholder}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.option, { borderBottomColor: theme.colors.border }]}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text style={{ color: theme.colors.text, fontSize: 16 }}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    selector: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 24,
    },
    modalContent: {
        borderRadius: 12,
        maxHeight: 300,
        paddingVertical: 8,
    },
    option: {
        padding: 16,
        borderBottomWidth: 1,
    }
});

export default Dropdown;
