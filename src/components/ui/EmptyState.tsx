import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  illustration: React.ReactNode;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  illustration,
  title,
  subtitle,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center bg-white rounded-[32px] border border-dashed border-[#E5E7EB] ${className}`}
    >
      <div className="mb-6 opacity-80">
        {illustration}
      </div>
      <h3 className="text-xl font-black text-[#1A1A2E] mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[#6B7280] text-sm max-w-[280px] font-medium leading-relaxed mb-8">
        {subtitle}
      </p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-[#7C5CFC] hover:bg-[#6849E7] text-white px-8 py-2.5 rounded-2xl font-black text-sm transition-all shadow-lg shadow-[#7C5CFC]/20 active:scale-95"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
