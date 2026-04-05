import { useMemo } from 'react';
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { formatINR } from '../../lib/utils';

export default function LineChart({ data }) {
    // Aggregate balance over time from transactions
    const chartData = useMemo(() => {
        // Sort transactions by date ascending
        const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

        let currentBalance = 0;
        const dailyBalance = [];

        // Assuming initial balance from some point, but we'll start accumulate from 0
        // OR we just group by date and show balance on that day
        const grouped = sorted.reduce((acc, curr) => {
            if (!acc[curr.date]) acc[curr.date] = 0;
            acc[curr.date] += curr.type === 'income' ? curr.amount : -curr.amount;
            return acc;
        }, {});

        Object.entries(grouped).forEach(([date, netAmount]) => {
            currentBalance += netAmount;
            dailyBalance.push({
                date,
                balance: currentBalance,
                displayDate: format(parseISO(date), 'MMM dd'),
            });
        });

        return dailyBalance;
    }, [data]);

    if (chartData.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center justify-center h-[300px] transition-colors">
                <p className="text-gray-500 dark:text-gray-400">No data available for chart</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Balance Trend</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis
                            dataKey="displayDate"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickFormatter={(value) => formatINR(value)}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value) => [formatINR(value), 'Balance']}
                            labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
