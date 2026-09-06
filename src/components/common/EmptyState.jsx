import React from 'react';
import { Search } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Search,
  title = "No results found",
  description = "Try adjusting your search terms or filter criteria to find what you're looking for.",
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`text-center py-12 px-4 sm:px-6 rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 ${className}`}>
      <div className="mx-auto w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-4 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
