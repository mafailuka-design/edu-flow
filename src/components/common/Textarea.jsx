import React from 'react';

export default function Textarea({
  label,
  id,
  rows = 4,
  error,
  helperText,
  className = '',
  required = false,
  ...props
}) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        className={`
          block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400
          transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 resize-y
          ${error 
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200' 
            : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200 hover:border-slate-300'}
          disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
        `}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}
