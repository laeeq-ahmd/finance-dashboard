import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import useStore from '../store/useStore';
import { CATEGORIES } from '../data/mockData';
import { format } from 'date-fns';
import Select from './ui/Select';

export default function AddTransactionForm() {
    const { role, addTransaction } = useStore();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: CATEGORIES[0],
        type: 'expense',
        date: format(new Date(), 'yyyy-MM-dd')
    });

    const [error, setError] = useState('');

    if (role !== 'Admin') return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.description || !formData.amount || !formData.date) {
            setError('Please fill in all required fields.');
            return;
        }

        const amountNum = parseFloat(formData.amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }

        addTransaction({
            ...formData,
            amount: amountNum,
        });

        setFormData((prev) => ({
            ...prev,
            description: '',
            amount: ''
        }));
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 mt-6 transition-colors">
            <div className="flex items-center gap-2 mb-4">
                <PlusCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add New Transaction</h3>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-lg text-sm border border-rose-100 dark:border-rose-900/50">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-end">
                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Description *</label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border border-gray-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g. Weekly Groceries"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Amount *</label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full border border-gray-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Category</label>
                    <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        options={CATEGORIES.map(c => ({ value: c, label: c }))}
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Type</label>
                    <Select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        options={[
                            { value: 'expense', label: 'Expense' },
                            { value: 'income', label: 'Income' }
                        ]}
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors h-[38px]"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
