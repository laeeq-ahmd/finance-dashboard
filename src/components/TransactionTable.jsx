import { format, parseISO } from 'date-fns';
import { Trash2, Download } from 'lucide-react';
import useStore from '../store/useStore';
import { cn, formatINR } from '../lib/utils';
import { useMemo } from 'react';

export default function TransactionTable() {
    const { transactions, filters, role, deleteTransaction } = useStore();

    const filteredData = useMemo(() => {
        let result = [...transactions];

        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(t =>
                t.description.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q)
            );
        }

        if (filters.category && filters.category !== 'All') {
            result = result.filter(t => t.category === filters.category);
        }

        if (filters.type && filters.type !== 'All') {
            result = result.filter(t => t.type === filters.type);
        }

        if (filters.startDate) {
            result = result.filter(t => new Date(t.date) >= new Date(filters.startDate));
        }

        if (filters.endDate) {
            result = result.filter(t => new Date(t.date) <= new Date(filters.endDate));
        }

        result.sort((a, b) => {
            switch (filters.sortBy) {
                case 'date_desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date_asc':
                    return new Date(a.date) - new Date(b.date);
                case 'amount_desc':
                    return b.amount - a.amount;
                case 'amount_asc':
                    return a.amount - b.amount;
                default:
                    return 0;
            }
        });

        return result;
    }, [transactions, filters]);

    const handleExportCSV = () => {
        if (filteredData.length === 0) return;
        const headers = ["Transaction ID", "Date", "Description", "Amount", "Category", "Type"];
        const csvRows = [];
        csvRows.push(headers.join(","));

        filteredData.forEach(t => {
            const row = [
                t.id,
                `"${format(parseISO(t.date), 'MMM dd, yyyy')}"`,
                `"${t.description.replace(/"/g, '""')}"`,
                t.amount,
                `"${t.category}"`,
                `"${t.type}"`
            ];
            csvRows.push(row.join(","));
        });

        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">

            <div className="flex justify-end p-2 border-b border-gray-100 dark:border-slate-800">
                <button
                    onClick={handleExportCSV}
                    disabled={filteredData.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium text-right">Amount</th>
                            {role === 'Admin' && <th className="px-6 py-4 font-medium text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                    <p className="mb-2">No transactions found</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your filters or date range</p>
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                        {format(parseISO(t.date), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                        {t.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-700">
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className={cn(
                                        "px-6 py-4 text-right font-medium whitespace-nowrap",
                                        t.type === 'income' ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-900 dark:text-gray-100'
                                    )}>
                                        {t.type === 'income' ? '+' : '-'}{formatINR(t.amount)}
                                    </td>
                                    {role === 'Admin' && (
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteTransaction(t.id)}
                                                className="text-gray-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors p-1"
                                                title="Delete transaction"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
