"use client";

import * as React from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full p-6 relative border-2 border-tabali-primary max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-tabali-primary hover:text-yellow-500 transition-all text-2xl font-bold"
        >
          ×
        </button>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
