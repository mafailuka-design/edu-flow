import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  required = false,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <LeftIcon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          required={required}
          className={`
            block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400
            transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0
            ${LeftIcon ? 'pl-10' : ''}
            ${RightIcon ? 'pr-10' : ''}
            ${error 
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
              : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200 hover:border-slate-300'}
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
          `}
          {...props}
        />
        {RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400">
            {RightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}
