// components/ui/progress.jsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils'; // If you're using a className utility (optional)

export function Progress({ value, className }) {
  const clampedValue = Math.max(0, Math.min(100, value || 0)); // Ensure value is between 0–100

  return (
    <div
      className={cn(
        'w-full h-2 bg-gray-200 rounded-full overflow-hidden',
        className
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
