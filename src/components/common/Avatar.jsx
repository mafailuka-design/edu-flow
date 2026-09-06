import React, { useState } from 'react';

export default function Avatar({
  src,
  name = 'User',
  size = 'md',
  status = null,
  className = ''
}) {
  const [imgError, setImgError] = useState(false);

  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeStyles = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const statusSizeStyles = {
    xs: "w-1.5 h-1.5 ring-1",
    sm: "w-2 h-2 ring-1",
    md: "w-2.5 h-2.5 ring-2",
    lg: "w-3.5 h-3.5 ring-2",
    xl: "w-4 h-4 ring-2",
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className={`rounded-full object-cover shadow-sm ring-1 ring-slate-200/60 ${sizeStyles[size] || sizeStyles.md}`}
        />
      ) : (
        <div
          className={`rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-bold flex items-center justify-center shadow-sm ${sizeStyles[size] || sizeStyles.md}`}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full ring-white
            ${status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'}
            ${statusSizeStyles[size] || statusSizeStyles.md}
          `}
        />
      )}
    </div>
  );
}
