import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Select({ value, onChange, options, className, icon: Icon }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Find the currently selected option to display it
    const selectedOption = options.find((opt) => opt.value === value) || options[0];

    return (
        <div ref={selectRef} className={cn("relative w-full", className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between appearance-none bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 cursor-pointer py-2 rounded-lg transition-colors focus:outline-none shadow-sm",
                    Icon ? "pl-3" : "pl-3",
                    "pr-3"
                )}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {Icon && <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />}
                    <span className="truncate">{selectedOption?.label}</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform flex-shrink-0 ml-2 duration-200", isOpen && "rotate-180")} />
            </button>

            {/* Custom Dropdown Options Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <ul className="max-h-60 overflow-y-auto py-1 scrollbar-hide">
                        {options.map((opt) => (
                            <li
                                key={opt.value}
                                onClick={() => {
                                    // Mock standard event target value for seamless parent handler compatibility
                                    onChange({ target: { value: opt.value } });
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "px-3 py-2.5 text-sm cursor-pointer transition-colors flex items-center",
                                    value === opt.value
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
