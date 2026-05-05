// components/ui/Badge.js
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    indigo:  'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25',
    green:   'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25',
    amber:   'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25',
    red:     'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/25',
    purple:  'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}