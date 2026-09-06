import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  showLabel = false,
  label = null,
  color = 'brand',
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    xs: "h-1.5",
    sm: "h-2",
    md: "h-2.5",
    lg: "h-3.5",
  };

  const colorStyles = {
    brand: "bg-brand-600",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    blue: "bg-blue-600",
    gradient: "bg-gradient-to-r from-brand-600 to-indigo-500",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1.5">
          <span>{label || 'Progress'}</span>
          <span className="font-semibold text-slate-900">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 ${sizeStyles[size] || sizeStyles.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles[color] || colorStyles.brand}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}
