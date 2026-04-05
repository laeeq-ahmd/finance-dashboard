import { useMemo } from 'react';
import useStore from '../store/useStore';
import { Lightbulb, TrendingDown, TrendingUp, HelpCircle } from 'lucide-react';
import { format, subMonths, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { formatINR } from '../lib/utils';

export default function Insights() {
    const { transactions } = useStore();

    const insights = useMemo(() => {
        if (!transactions.length) return null;

        const expenses = transactions.filter(t => t.type === 'expense');

        // 1. Highest spending category
        const categoryTotals = expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});

        let highestCategory = { name: 'None', amount: 0 };
        Object.entries(categoryTotals).forEach(([name, amount]) => {
            if (amount > highestCategory.amount) {
                highestCategory = { name, amount };
            }
        });

        // 2. This month vs last month spending
        const today = new Date();
        const currentMonthStart = startOfMonth(today);
        const currentMonthEnd = endOfMonth(today);
        const lastMonthStart = startOfMonth(subMonths(today, 1));
        const lastMonthEnd = endOfMonth(subMonths(today, 1));

        let thisMonthTotal = 0;
        let lastMonthTotal = 0;

        expenses.forEach(t => {
            const d = parseISO(t.date);
            if (d >= currentMonthStart && d <= currentMonthEnd) {
                thisMonthTotal += t.amount;
            } else if (d >= lastMonthStart && d <= lastMonthEnd) {
                lastMonthTotal += t.amount;
            }
        });

        const isSpendingDown = thisMonthTotal <= lastMonthTotal;
        const diffAmount = Math.abs(thisMonthTotal - lastMonthTotal);
        const diffPercent = lastMonthTotal === 0 ? 0 : Math.round((diffAmount / lastMonthTotal) * 100);

        // 3. Most frequent category overall
        const categoryFreq = transactions.reduce((acc, curr) => {
            if (curr.type === 'expense') {
                acc[curr.category] = (acc[curr.category] || 0) + 1;
            }
            return acc;
        }, {});
        let mostFrequent = { name: 'None', count: 0 };
        Object.entries(categoryFreq).forEach(([name, count]) => {
            if (count > mostFrequent.count) {
                mostFrequent = { name, count };
            }
        });

        return [
            {
                id: 1,
                title: 'Top Category',
                value: highestCategory.name,
                desc: `${formatINR(highestCategory.amount)} spent total`,
                icon: Lightbulb,
                colorClass: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
            },
            {
                id: 2,
                title: 'Monthly Spending',
                value: diffPercent > 0 ? `${diffPercent}% ${isSpendingDown ? 'less' : 'more'}` : 'Same as last month',
                desc: `vs last month (${formatINR(diffAmount)} diff)`,
                icon: isSpendingDown || diffPercent === 0 ? TrendingDown : TrendingUp,
                colorClass: isSpendingDown || diffPercent === 0 ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'text-rose-500 bg-rose-50 dark:bg-rose-950/30'
            },
            {
                id: 3,
                title: 'Most Frequent',
                value: mostFrequent.name,
                desc: `${mostFrequent.count} transactions recorded`,
                icon: HelpCircle,
                colorClass: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30'
            }
        ];
    }, [transactions]);

    if (!insights) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {insights.map(item => {
                const Icon = item.icon;
                return (
                    <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 transition-colors">
                        <div className={`p-3 rounded-xl ${item.colorClass}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.title}</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{item.value}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
