import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
}

const VARIANT_CLASSES: Record<string, string> = {
  primary: 'bg-primary text-white hover:bg-primary-light',
  secondary: 'bg-card border border-cardBorder text-textPrimary hover:border-primary',
  ghost: 'bg-transparent text-textSecondary hover:text-textPrimary',
  danger: 'bg-danger-muted text-danger hover:bg-danger hover:text-white',
};

const SIZE_CLASSES: Record<string, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
};

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    />
  );
}
