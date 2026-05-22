import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full bg-yellow text-gray-900 font-bold py-3 px-4 rounded-lg 
                 hover:bg-yellow-light disabled:bg-yellow-dark disabled:cursor-not-allowed
                 transition-colors duration-200 uppercase"
    >
      {children}
    </button>
  );
}
