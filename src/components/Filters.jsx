import { Search } from 'lucide-react';
import useStore from '../store/useStore';
import { CATEGORIES } from '../data/mockData';
import Select from './ui/Select';

export default function Filters() {
    const { filters, setFilters } = useStore();

    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col xl:flex-row gap-4 items-center justify-between mb-6 transition-colors">

            <div className="relative w-full xl:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                    type="text"
                    placeholder="Search descriptions..."
                    value={filters.search}
                    onChange={(e) => setFilters({ search: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
            </div>

            <div className="flex flex-wrap w-full xl:w-auto gap-3 items-center">

                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ startDate: e.target.value })}
                        className="border border-gray-200 dark:border-slate-700 rounded-lg py-1.5 px-3 text-sm bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                    />
                    <span className="text-gray-400 text-sm">to</span>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ endDate: e.target.value })}
                        className="border border-gray-200 dark:border-slate-700 rounded-lg py-1.5 px-3 text-sm bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                    />
                </div>

                <div className="w-32">
                    <Select
                        value={filters.type}
                        onChange={(e) => setFilters({ type: e.target.value })}
                        options={[
                            { value: 'All', label: 'All Types' },
                            { value: 'income', label: 'Income' },
                            { value: 'expense', label: 'Expense' }
                        ]}
                    />
                </div>

                <div className="w-36">
                    <Select
                        value={filters.category}
                        onChange={(e) => setFilters({ category: e.target.value })}
                        options={[
                            { value: 'All', label: 'All Categories' },
                            ...CATEGORIES.map(c => ({ value: c, label: c }))
                        ]}
                    />
                </div>

                <div className="w-36">
                    <Select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ sortBy: e.target.value })}
                        options={[
                            { value: 'date_desc', label: 'Newest First' },
                            { value: 'date_asc', label: 'Oldest First' },
                            { value: 'amount_desc', label: 'Highest Amount' },
                            { value: 'amount_asc', label: 'Lowest Amount' }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
