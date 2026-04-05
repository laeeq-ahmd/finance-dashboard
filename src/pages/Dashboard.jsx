import { useMemo } from 'react';
import useStore from '../store/useStore';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import Filters from '../components/Filters';
import TransactionTable from '../components/TransactionTable';
import AddTransactionForm from '../components/AddTransactionForm';
import Insights from '../components/Insights';
import { Wallet, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export default function Dashboard() {
    const { transactions, isLoading, setLoading } = useStore();

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 800); // simulate 800ms API delay
            return () => clearTimeout(timer);
        }
    }, [isLoading, setLoading]);

    const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
        return transactions.reduce(
            (acc, t) => {
                if (t.type === 'income') {
                    acc.totalIncome += t.amount;
                    acc.totalBalance += t.amount;
                } else {
                    acc.totalExpenses += t.amount;
                    acc.totalBalance -= t.amount;
                }
                return acc;
            },
            { totalBalance: 0, totalIncome: 0, totalExpenses: 0 }
        );
    }, [transactions]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col font-sans">
                <Header />
                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
                    <div className="flex flex-col items-center animate-in fade-in duration-500">
                        <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-500 animate-spin mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Fetching dashboard datastore...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col font-sans">
            <Header />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Insights Section */}
                <div id="sec-insights">
                    <Insights />
                </div>

                {/* Summary Cards */}
                <div id="sec-overview" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <SummaryCard
                        title="Total Balance"
                        amount={totalBalance}
                        type="balance"
                        icon={Wallet}
                    />
                    <SummaryCard
                        title="Total Income"
                        amount={totalIncome}
                        type="income"
                        icon={TrendingUp}
                    />
                    <SummaryCard
                        title="Total Expenses"
                        amount={totalExpenses}
                        type="expense"
                        icon={TrendingDown}
                    />
                </div>

                {/* Charts Section */}
                <div id="sec-charts" className="scroll-mt-36 md:scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <LineChart data={transactions} />
                    <PieChart data={transactions} />
                </div>

                {/* Transactions Section */}
                <div id="sec-transactions" className="scroll-mt-36 md:scroll-mt-24 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Recent Transactions</h2>
                    <Filters />
                    <TransactionTable />
                    <div id="sec-add-transaction" className="scroll-mt-36 md:scroll-mt-24">
                        <AddTransactionForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
