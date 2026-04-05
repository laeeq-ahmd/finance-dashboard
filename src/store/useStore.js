import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { startOfMonth, endOfMonth, format } from 'date-fns';

const today = new Date();

const useStore = create(
    persist(
        (set) => ({
            transactions: MOCK_TRANSACTIONS,
            theme: 'light', // 'light' or 'dark'
            isLoading: true, // For mock API
            filters: {
                search: '',
                category: 'All',
                type: 'All',
                sortBy: 'date_desc', // date_desc, date_asc, amount_desc, amount_asc
                startDate: '', // We'll leave empty normally, or default to some range
                endDate: '',
            },
            role: 'Viewer', // 'Viewer' or 'Admin'

            setLoading: (isLoading) => set({ isLoading }),
            setTheme: (theme) => set({ theme }),
            setRole: (role) => set({ role }),

            setFilters: (newFilters) => set((state) => ({
                filters: { ...state.filters, ...newFilters }
            })),

            addTransaction: (transaction) => set((state) => ({
                transactions: [
                    {
                        id: (typeof crypto !== 'undefined' && crypto.randomUUID)
                            ? crypto.randomUUID()
                            : Math.random().toString(36).substring(2, 9),
                        ...transaction
                    },
                    ...state.transactions
                ]
            })),

            deleteTransaction: (id) => set((state) => ({
                transactions: state.transactions.filter(t => t.id !== id)
            })),
        }),
        {
            name: 'finance-dash-storage', // key in localStorage
            partialize: (state) => ({
                transactions: state.transactions,
                role: state.role,
                theme: state.theme
            }), // Save these fields only
        }
    )
);

export default useStore;
