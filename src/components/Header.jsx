import useStore from '../store/useStore';
import { Wallet, ShieldAlert, Users, Moon, Sun, BarChart2, List } from 'lucide-react';
import Select from './ui/Select';

export default function Header() {
    const { role, setRole, theme, setTheme } = useStore();

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-y-4 py-3">

                    {/* Logo (Hard Reload Reset) */}
                    <a href="/" title="Reload Dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                        <div className="p-2 bg-blue-600 rounded-lg text-white shadow-sm">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                            FinanceDash
                        </h1>
                    </a>

                    {/* Navigation - Drops to new row on mobile */}
                    <nav className="order-3 w-full md:order-2 md:w-auto flex items-center justify-center gap-2 sm:gap-4 text-sm font-medium bg-gray-50/50 dark:bg-slate-800/50 px-2 py-1.5 rounded-full border border-gray-100 dark:border-slate-800 overflow-x-auto whitespace-nowrap hide-scrollbar">
                        <button onClick={() => document.getElementById('sec-charts')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300 text-gray-600 dark:text-gray-300 transition-all font-semibold">
                            <BarChart2 className="w-4 h-4" />
                            Insights
                        </button>
                        <button onClick={() => document.getElementById('sec-transactions')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300 text-gray-600 dark:text-gray-300 transition-all font-semibold">
                            <List className="w-4 h-4" />
                            Transactions
                        </button>
                        {role === 'Admin' && (
                            <button onClick={() => document.getElementById('sec-add-transaction')?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all font-semibold shadow-sm ml-2">
                                + Add Transaction
                            </button>
                        )}
                    </nav>

                    {/* Controls */}
                    <div className="order-2 md:order-3 flex items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors"
                            title="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        <div className="w-32">
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                icon={role === 'Admin' ? ShieldAlert : Users}
                                options={[
                                    { value: 'Viewer', label: 'Viewer' },
                                    { value: 'Admin', label: 'Admin' }
                                ]}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}
