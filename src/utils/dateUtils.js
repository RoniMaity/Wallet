export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
};

export const filterTransactionsByMonth = (transactions, month, year) => {
    return transactions.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === month && date.getFullYear() === year;
    });
};

export const getCurrentMonthYear = () => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
};
