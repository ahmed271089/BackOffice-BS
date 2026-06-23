import clsx from 'clsx';

type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-primary-muted text-primary-light',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning',
  danger: 'bg-danger-muted text-danger',
  info: 'bg-info-muted text-info',
  neutral: 'bg-bgElevated text-textSecondary',
};

export function Badge({
  label,
  variant = 'neutral',
  icon,
  className,
}: {
  label: string;
  variant?: Variant;
  icon?: string;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {icon ? <span className="text-xs">{icon}</span> : null}
      {label}
    </span>
  );
}
