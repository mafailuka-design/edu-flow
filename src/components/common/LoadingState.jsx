import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = "Loading courses...", className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-4 animate-bounce">
        <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
      </div>
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}
