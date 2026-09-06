import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({
  label,
  id,
  options = [],
  error,
  helperText,
  className = '',
  required = false,
  value,
  onChange,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            block w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900
            transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0
            ${error 
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
              : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200 hover:border-slate-300'}
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          `}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}
