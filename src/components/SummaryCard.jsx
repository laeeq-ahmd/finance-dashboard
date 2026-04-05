import { cn, formatINR } from '../lib/utils';

export default function SummaryCard({ title, amount, type, icon: Icon }) {
    const isPositive = amount >= 0;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
                <div className={cn(
                    "p-2 bg-gray-50 dark:bg-slate-800 rounded-lg",
                    type === 'income' && "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
                    type === 'expense' && "text-rose-600 bg-rose-50 dark:bg-rose-950/30",
                    type === 'balance' && "text-blue-600 bg-blue-50 dark:bg-blue-950/30"
                )}>
                    {Icon && <Icon className="h-5 w-5" />}
                </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                    {formatINR(Math.abs(amount))}
                </span>
            </div>
        </div>
    );
}
