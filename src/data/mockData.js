import { format, subDays, subMonths } from 'date-fns';

const today = new Date();

export const MOCK_TRANSACTIONS = [
    {
        id: 't1',
        date: format(today, 'yyyy-MM-dd'),
        amount: 3200,
        category: 'Salary',
        type: 'income',
        description: 'Tech Corp Inc.',
    },
    {
        id: 't2',
        date: format(today, 'yyyy-MM-dd'),
        amount: 45.5,
        category: 'Food',
        type: 'expense',
        description: 'Groceries',
    },
    {
        id: 't3',
        date: format(subDays(today, 2), 'yyyy-MM-dd'),
        amount: 1200,
        category: 'Rent',
        type: 'expense',
        description: 'Monthly Rent',
    },
    {
        id: 't4',
        date: format(subDays(today, 5), 'yyyy-MM-dd'),
        amount: 150,
        category: 'Utilities',
        type: 'expense',
        description: 'Electricity Bill',
    },
    {
        id: 't5',
        date: format(subDays(today, 8), 'yyyy-MM-dd'),
        amount: 85,
        category: 'Shopping',
        type: 'expense',
        description: 'Amazon Purchase',
    },
    {
        id: 't6',
        date: format(subDays(today, 12), 'yyyy-MM-dd'),
        amount: 60,
        category: 'Travel',
        type: 'expense',
        description: 'Uber Rides',
    },
    {
        id: 't7',
        date: format(subDays(today, 15), 'yyyy-MM-dd'),
        amount: 500,
        category: 'Freelance',
        type: 'income',
        description: 'Client Project',
    },
    {
        id: 't8',
        date: format(subDays(today, 20), 'yyyy-MM-dd'),
        amount: 120,
        category: 'Food',
        type: 'expense',
        description: 'Dinner Date',
    },
    {
        id: 't9',
        date: format(subMonths(today, 1), 'yyyy-MM-dd'),
        amount: 3200,
        category: 'Salary',
        type: 'income',
        description: 'Tech Corp Inc.',
    },
    {
        id: 't10',
        date: format(subDays(subMonths(today, 1), 2), 'yyyy-MM-dd'),
        amount: 1200,
        category: 'Rent',
        type: 'expense',
        description: 'Monthly Rent',
    },
    {
        id: 't11',
        date: format(subDays(subMonths(today, 1), 10), 'yyyy-MM-dd'),
        amount: 250,
        category: 'Shopping',
        type: 'expense',
        description: 'New Shoes',
    },
    {
        id: 't12',
        date: format(subDays(subMonths(today, 1), 18), 'yyyy-MM-dd'),
        amount: 90,
        category: 'Utilities',
        type: 'expense',
        description: 'Water Bill',
    },
];

export const CATEGORIES = [
    'Salary',
    'Food',
    'Rent',
    'Utilities',
    'Shopping',
    'Travel',
    'Freelance',
    'Entertainment',
    'Other'
];
