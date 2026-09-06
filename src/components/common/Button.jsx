import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 shadow-sm",
    md: "text-sm px-4 py-2.5 gap-2 shadow-sm",
    lg: "text-base px-6 py-3.5 gap-2.5 shadow-soft",
  };

  const variantStyles = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500 shadow-brand-500/20",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-900",
    outline: "border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 focus:ring-brand-500",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-rose-500/20",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 focus:ring-slate-400 shadow-none",
    brandOutline: "border-2 border-brand-600 text-brand-600 hover:bg-brand-50 focus:ring-brand-500 font-semibold",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
