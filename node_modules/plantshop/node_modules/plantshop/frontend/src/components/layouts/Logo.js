import React from 'react';
import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
      <img 
        src="/images/logo.png" 
        alt="Leaf Icon" 
        className="h-20 w-20" 
      />
      <span className="text-navy-900 text-xl font-semibold">Trees Herbs and More Flowers</span>
      <span className="text-emerald-500 text-sm"></span>
    </div>
  );
}
