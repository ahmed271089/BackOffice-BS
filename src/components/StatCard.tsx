import { ReactNode } from 'react';
import clsx from 'clsx';

export function StatCard({
  label,
  value,
  icon,
  accentClassName,
  trend,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  accentClassName?: string;
  trend?: { value: string; positive: boolean };
}) {
  return (
    <div className="rounded-xl2 border border-cardBorder bg-card p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-textSecondary">{label}</span>
        {icon ? <div className="text-textMuted">{icon}</div> : null}
      </div>
      <div className={clsx('mt-2 text-2xl font-bold tracking-tight', accentClassName ?? 'text-textPrimary')}>
        {value}
      </div>
      {trend ? (
        <div className={clsx('mt-1 text-xs font-medium', trend.positive ? 'text-success' : 'text-danger')}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      ) : null}
    </div>
  );
}
