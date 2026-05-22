import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function Input({ icon, className, ...props }: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-4 text-gray-400 focus-within:text-yellow">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 ${icon ? 'pl-11' : ''}
                   text-gray-100 placeholder-gray-400
                   hover:border-gray-500 focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow
                   transition-colors duration-200 ${className || ''}`}
        {...props}
      />
    </div>
  );
}
