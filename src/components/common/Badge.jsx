import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  icon: Icon
}) {
  const baseStyles = "inline-flex items-center font-medium rounded-full shrink-0";

  const sizeStyles = {
    xs: "text-[10px] px-2 py-0.5 gap-1",
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-sm px-3 py-1 gap-1.5",
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    brand: "bg-brand-50 text-brand-700 border border-brand-200 font-semibold",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    danger: "bg-rose-50 text-rose-700 border border-rose-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    dark: "bg-slate-900 text-white",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size] || sizeStyles.sm} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
